import express from "express";
import { createProduct, deleteProductCard, updateProductCard, getProduct, getProductDetails, getAllProducts, addReview } from "../controllers/products.controller.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createProduct);
router.get("/get/:id", verifyToken, getProduct);
router.get("/:id", verifyToken, getProductDetails);
router.get("/products", verifyToken, getAllProducts);
router.delete("/delete/:id", verifyToken, deleteProductCard);
router.post("/update/:id", verifyToken, updateProductCard);
router.post("/:id/review", verifyToken, addReview); 

export default router;