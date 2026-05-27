import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  customerName: { type: DataTypes.STRING, field: 'customer_name', allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.TEXT, allowNull: false },
  totalAmount: { type: DataTypes.DECIMAL(10, 2), field: 'total_amount', allowNull: false },
}, {
  tableName: 'orders',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

export default Order;