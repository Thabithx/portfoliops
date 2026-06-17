import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ordersRouter from './routes/orders.js';
import authRouter from './routes/auth.js';
import uploadRouter from './routes/upload.js';
import { connectStore, getStorageMode } from './store.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_orders';

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (_req, res) => {
  res.json({ 
    message: 'Portfolio Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      orders: '/api/orders',
      upload: '/api/upload'
    }
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, storage: getStorageMode() });
});

app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/upload', uploadRouter);

async function start() {
  await connectStore(MONGO_URI);

  app.listen(PORT, () => {
    console.log(`[server] orders API on http://localhost:${PORT} (${getStorageMode()} store)`);
  });
}

start();
