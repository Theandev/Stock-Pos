import { QueryTypes } from 'sequelize';
import db from '../config/db.js';

export const getAllProducts = async (req, res) => {
  const { search } = req.query;
  try {
    let query = `SELECT id, name, description, price, stock, category, image_url AS "imageUrl"
       FROM public.products`;
    const replacements = {};

    if (search) {
      query += ` WHERE LOWER(name) LIKE LOWER(:search)
        OR LOWER(description) LIKE LOWER(:search)
        OR LOWER(category) LIKE LOWER(:search)`;
      replacements.search = `%${search}%`;
    }

    query += ` ORDER BY id ASC;`;

    const products = await db.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });

    res.status(200).json(products);
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ error: 'Server error' });
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
