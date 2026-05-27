const { Order, OrderItem, Product } = require('../models');
const sequelize = require('../config/db');

exports.createOrder = async (req, res) => {
  const { customerName, email, address, items } = req.body; // items: [{productId, quantity}]

  const transaction = await sequelize.transaction();
  try {
    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await Product.findByPk(item.productId, { transaction });
      if (!product) throw new Error(`Product ${item.productId} not found`);
      if (product.stock < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);

      const itemTotal = product.price * item.quantity;
      totalAmount += parseFloat(itemTotal);
      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      });
    }

    const order = await Order.create({
      customerName,
      email,
      address,
      totalAmount
    }, { transaction });

    for (const data of orderItemsData) {
      await OrderItem.create({
        order_id: order.id,
        product_id: data.productId,
        quantity: data.quantity,
        price: data.price
      }, { transaction });

      await Product.decrement('stock', { by: data.quantity, where: { id: data.productId }, transaction });
    }

    await transaction.commit();
    res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
  } catch (err) {
    await transaction.rollback();
    res.status(400).json({ error: err.message });
  }
};