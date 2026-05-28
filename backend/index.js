import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './src/config/db.js';
import productsRouter from './src/routes/products.js';
import ordersRouter from './src/routes/orders.js';
import authRouter from './src/routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/auth', authRouter);

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

async function startServer() {
  try {
    if (!process.env.GOOGLE_CLIENT_ID) {
      throw new Error('Missing env GOOGLE_CLIENT_ID');
    }
    if (!process.env.JWT_SECRET) {
      console.warn('Warning: JWT_SECRET is not set. Using a weak default is insecure.');
    }
    if (!process.env.ADMIN_EMAILS) {
      console.warn('Warning: ADMIN_EMAILS is not set. No user will get admin role.');
    }

    await db.authenticate();
    console.log('Database connected successfully.');
    // ensure models/tables exist in development
    await db.sync();
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
  } catch (error) {
    console.error(' Unable to connect to the database:', error);
  }
}

startServer();
