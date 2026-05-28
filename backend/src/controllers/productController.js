import { QueryTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Product from '../models/Product.js';

// ✅ SELECT: get all products (optionally filtered)
export const getAllProducts = async (req, res) => {
  const { search, category } = req.query;

  try {
    let query = `
      SELECT 
        id, name, description, price, stock, category, image_url AS "imageUrl"
      FROM public.products
      WHERE 1=1
    `;

    const replacements = {};

    if (search) {
      query += `
        AND (
          LOWER(name) LIKE LOWER(:search)
          OR LOWER(description) LIKE LOWER(:search)
          OR LOWER(category) LIKE LOWER(:search)
        )
      `;
      replacements.search = `%${search}%`;
    }

    if (category) {
      query += ` AND LOWER(category) = LOWER(:category) `;
      replacements.category = category;
    }

    query += ` ORDER BY id ASC;`;

    const products = await sequelize.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });

    return res.status(200).json(products);
  } catch (err) {
    console.error('Database Error (getAllProducts):', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// ✅ SELECT: get product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) return res.status(404).json({ error: 'Product not found' });

    return res.status(200).json(product);
  } catch (err) {
    console.error('Database Error (getProductById):', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// ✅ INSERT: create product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body;

    if (!name || price === undefined || !category) {
      return res
        .status(400)
        .json({ error: 'Missing required fields: name, price, category' });
    }

    const created = await Product.create({
      name,
      description: description ?? null,
      price,
      stock: stock ?? 0,
      category,
      imageUrl: imageUrl ?? null,
    });

    return res.status(201).json(created);
  } catch (err) {
    console.error('Database Error (createProduct):', err);
    return res.status(500).json({ error: 'Server error' });
  }
};



// ✅ UPDATE: edit product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, imageUrl } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (category !== undefined) product.category = category;
    if (imageUrl !== undefined) product.imageUrl = imageUrl;

    await product.save();

    return res.status(200).json(product);
  } catch (err) {
    console.error('Database Error (updateProduct):', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// ✅ DELETE: delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCount = await Product.destroy({ where: { id } });
    if (!deletedCount) return res.status(404).json({ error: 'Product not found' });

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Database Error (deleteProduct):', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

