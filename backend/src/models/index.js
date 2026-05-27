import Product from './Product.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(OrderItem, { foreignKey: 'product_id' });

export { Product, Order, OrderItem };