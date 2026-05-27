import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { QueryTypes } from 'sequelize';
import db from './src/config/db.js';         

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(express.json());


app.get('/api/products', async (req, res) => {
  try {
    const products = await db.query(
      `SELECT id, name, description, price, stock, category, image_url AS "imageUrl"
       FROM public.products 
       ORDER BY id ASC;`,
      { type: QueryTypes.SELECT }
    );
    res.status(200).json(products);
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ error: "Server error" });
  }
});

async function startServer() {
  try {
    await db.authenticate();
    console.log('👍 Database connected successfully.');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}

startServer();
