import express from 'express';
import verifyToken from '../utils/verifyToken.js';
import placeOrderDetails from '../controllers/order.controller.js';

const router = express.Router();

router.post('/place-order-details', verifyToken, placeOrderDetails);

export default router;