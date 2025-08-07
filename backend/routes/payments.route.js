import express from "express";
import dotenv from "dotenv";
import { createCheckOutSession } from "../controllers/payments.controller.js";

dotenv.config();

const router = express.Router();

router.post("/create-checkout-session", createCheckOutSession);

export default router;