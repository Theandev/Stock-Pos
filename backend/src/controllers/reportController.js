import { QueryTypes } from 'sequelize';
import db from '../config/db.js';

export const getOrderReports = async (req, res) => {
  try {
    const reports = await db.query(
      `SELECT
         p.id,
         p.name,
         p.image_url AS "imageUrl",
         COALESCE(SUM(oi.quantity), 0) AS "totalQuantity",
         COALESCE(SUM(oi.quantity * oi.price), 0)::numeric(10,2) AS "totalRevenue",
         COUNT(DISTINCT o.id) AS "orderCount"
       FROM public.order_items oi
       JOIN public.products p ON oi.product_id = p.id
       JOIN public.orders o ON oi.order_id = o.id
       GROUP BY p.id, p.name, p.image_url
       ORDER BY "totalQuantity" DESC;`,
      { type: QueryTypes.SELECT }
    );

    res.status(200).json(reports);
  } catch (error) {
    console.error('Report query failed:', error);
    res.status(500).json({ error: 'Unable to generate order report.' });
  }
};
