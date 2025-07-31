import express from 'express';
import { createProduct, deleteProductCard, updateProductCard  } from '../controllers/products.controller.js';
import verifyToken from '../utils/verifyToken.js';

const router = express.Router();

router.post('/create', verifyToken, createProduct);
router.delete('/delete/:id', verifyToken, deleteProductCard);
router.post('/update/:id', verifyToken, updateProductCard)


export default router;