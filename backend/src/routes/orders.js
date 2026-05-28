import express from 'express';

import { createOrder } from '../controllers/orderController.js';
import { getOrderReports } from '../controllers/reportController.js';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/report', verifyToken, requireAdmin, getOrderReports);

export default router;
