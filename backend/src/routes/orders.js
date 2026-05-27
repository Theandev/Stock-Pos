import express from 'express';

import { createOrder } from '../controllers/orderController.js';
import { getOrderReports } from '../controllers/reportController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/report', getOrderReports);

export default router;
