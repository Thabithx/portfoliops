import express from 'express';
import { createOrder, getOrderById, listOrders, deleteOrder } from '../store.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      orderId,
      format,
      concept,
      referenceLink,
      email,
      phone,
      features,
      assets,
      imageUrls,
      invoiceUSD,
      currency,
      invoiceDisplay,
      timelineWeeks,
    } = req.body;

    if (!format || !phone || invoiceUSD == null) {
      return res.status(400).json({ error: 'Missing required order fields.' });
    }

    const id = orderId || `CL-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = await createOrder({
      orderId: id,
      format,
      concept: concept || 'N/A',
      referenceLink: referenceLink || 'N/A',
      email: email ? String(email).trim().toLowerCase() : 'N/A',
      phone: String(phone).trim(),
      features: Array.isArray(features) ? features : [],
      assets: Number(assets) || 0,
      imageUrls: Array.isArray(imageUrls) ? imageUrls : [],
      invoiceUSD: Number(invoiceUSD),
      currency: currency || 'USD',
      invoiceDisplay: invoiceDisplay || `$${invoiceUSD}`,
      timelineWeeks: Number(timelineWeeks) || 0,
      status: 'Lead',
      statusCode: 'lead',
    });

    res.status(201).json(order);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Order ID already exists.' });
    }
    console.error('[orders] create error:', err);
    res.status(500).json({ error: 'Failed to save order.' });
  }
});

router.get('/', requireAdmin, async (_req, res) => {
  try {
    const orders = await listOrders();
    res.json(orders);
  } catch (err) {
    console.error('[orders] list error:', err);
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
});

router.get('/:orderId', requireAdmin, async (req, res) => {
  try {
    const order = await getOrderById(req.params.orderId);
    if (!order) return res.status(404).json({ error: 'Order not found.' });
    res.json(order);
  } catch (err) {
    console.error('[orders] get error:', err);
    res.status(500).json({ error: 'Failed to fetch order.' });
  }
});

router.delete('/:orderId', requireAdmin, async (req, res) => {
  try {
    const success = await deleteOrder(req.params.orderId);
    if (!success) return res.status(404).json({ error: 'Order not found.' });
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (err) {
    console.error('[orders] delete error:', err);
    res.status(500).json({ error: 'Failed to delete order.' });
  }
});

export default router;
