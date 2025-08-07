import express from "express";
import { createProduct, deleteProductCard, getProduct, getProductDetails, getAllProducts,} from "../controllers/products.controller.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createProduct);
router.get("/get/:id", verifyToken, getProduct);
router.get("/:id", verifyToken, getProductDetails);
router.get("/", verifyToken, getAllProducts);
router.delete("/delete/:id", verifyToken, deleteProductCard);

export default router;