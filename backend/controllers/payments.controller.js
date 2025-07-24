import express from 'express';
import catchAsyncError from '../middleware/catchAsyncError.js';
import Stripe from 'stripe';

const router = express.Router();

router.post( "/process", catchAsyncError(async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
   const myPayment = await stripe.paymentIntents.create({
     amount: req.body.amount,
     currency: "pkr",
     metadata: {
       company: "Vendify",
     },
   });

   res.status(200).json({
     success: true,
     client_secret: myPayment.client_secret,
   });
 })
);


router.get("/stripeapikey", catchAsyncError(async (req, res, next) => {
   res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
 })
);

export default router;