import { Order, OrderItem, Product } from "../models/index.js";
import sequelize from "../config/db.js";


export const createOrder = async (req, res) => {
  const { customerName, email, address, items } = req.body;

  if (
    !customerName ||
    !email ||
    !address ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return res
      .status(400)
      .json({ error: "Missing order information or cart items." });
  }

  const transaction = await sequelize.transaction();

  try {
    let totalAmount = 0;
    const orderItemsData = [];

    // Validate + compute totals first (inside transaction to keep stock consistent)
    for (const item of items) {
      const productId = item.productId;
      if (productId == null) throw new Error('Invalid productId');

      const product = await Product.findByPk(productId, { transaction, lock: transaction.LOCK.UPDATE });
      if (!product) throw new Error(`Product ${productId} not found`);

      const quantity = Number(item.quantity);
      if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error(`Invalid quantity for product ${product.name}`);
      }

      if (product.stock < quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      const price = Number(product.price);
      totalAmount += price * quantity;
      orderItemsData.push({
        productId,
        quantity,
        price,
      });
    }

    const order = await Order.create(
      {
        customerName,
        email,
        address,
        totalAmount,
      },
      { transaction }
    );

    for (const data of orderItemsData) {
      await OrderItem.create(
        {
          order_id: order.id,
          product_id: data.productId,
          quantity: data.quantity,
          price: data.price,
        },
        { transaction }
      );

      await Product.decrement('stock', {
        by: data.quantity,
        where: { id: data.productId },
        transaction,
      });
    }

    await transaction.commit();

    return res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
  } catch (error) {
    await transaction.rollback();
    console.error('Order creation failed:', error);
    return res.status(400).json({ error: error.message || 'Unable to place order' });
  }
};

