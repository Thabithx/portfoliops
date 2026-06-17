import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Order from './models/Order.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, 'data', 'orders.json');

let storageMode = 'mongo';

async function ensureJsonFile() {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, '[]', 'utf8');
  }
}

async function readJsonOrders() {
  await ensureJsonFile();
  const raw = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(raw || '[]');
}

async function writeJsonOrders(orders) {
  await fs.writeFile(DATA_FILE, JSON.stringify(orders, null, 2), 'utf8');
}

export async function connectStore(mongoUri) {
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 4000 });
    storageMode = 'mongo';
    console.log('[db] MongoDB connected');
    return 'mongo';
  } catch (err) {
    storageMode = 'json';
    await ensureJsonFile();
    console.warn('[db] MongoDB unavailable — using JSON file store:', err.message);
    return 'json';
  }
}

export function getStorageMode() {
  return storageMode;
}

export async function createOrder(payload) {
  if (storageMode === 'mongo') {
    return Order.create(payload);
  }

  const orders = await readJsonOrders();
  const order = {
    ...payload,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orders.unshift(order);
  await writeJsonOrders(orders);
  return order;
}

export async function listOrders() {
  if (storageMode === 'mongo') {
    return Order.find().sort({ createdAt: -1 }).lean();
  }
  const orders = await readJsonOrders();
  return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function getOrderById(orderId) {
  if (storageMode === 'mongo') {
    return Order.findOne({ orderId }).lean();
  }
  const orders = await readJsonOrders();
  return orders.find(o => o.orderId === orderId) || null;
}

export async function deleteOrder(orderId) {
  if (storageMode === 'mongo') {
    const result = await Order.deleteOne({ orderId });
    return result.deletedCount > 0;
  }
  const orders = await readJsonOrders();
  const filtered = orders.filter(o => o.orderId !== orderId);
  if (filtered.length === orders.length) return false;
  await writeJsonOrders(filtered);
  return true;
}
