const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');


Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(OrderItem, { foreignKey: 'product_id' });

module.exports = { Product, Order, OrderItem };