import { QueryTypes } from 'sequelize';
import db from '../config/db.js';

export const getAllProducts = async (req, res) => {
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
};

export const getProductById = async (req, res) => {
  try {
    const products = await db.query(
      `SELECT id, name, description, price, stock, category, image_url AS "imageUrl"
       FROM public.products 
       WHERE id = :id;`,
      { 
        replacements: { id: req.params.id },
        type: QueryTypes.SELECT 
      }
    );

    if (products.length > 0) {
      res.status(200).json(products[0]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ error: "Server error" });
  }
};
