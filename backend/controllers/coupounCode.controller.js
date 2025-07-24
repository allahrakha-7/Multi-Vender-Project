import express from 'express';
import catchAsyncError from '../middleware/catchAsyncError.js';
import { errorHandler } from '../utils/errorHandler.js';
import { isSeller } from '../middleware/auth.js';
import CoupounCode from '../model/coupounCode.model.js';

const router = express.Router();


router.post( "/create-coupon-code", isSeller, catchAsyncError(async (req, res, next) => {
    try {
      const isCoupounCodeExists = await CoupounCode.find({
        name: req.body.name,
      });

      if (isCoupounCodeExists.length !== 0) {
        return next(new errorHandler("Coupoun code already exists!", 400));
      }

      const coupounCode = await CoupounCode.create(req.body);

      res.status(201).json({
        success: true,
        coupounCode,
      });
    } catch (error) {
      return next(new errorHandler(error, 400));
    }
  })
);


router.get( "/get-coupon/:id", isSeller, catchAsyncError(async (req, res, next) => {
    try {
      const couponCodes = await CoupounCode.find({ shopId: req.seller.id });
      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new errorHandler(error, 400));
    }
  })
);


router.delete( "/delete-coupon/:id", isSeller, catchAsyncError(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new errorHandler("Coupon code dosen't exists!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Coupon code deleted successfully!",
      });
    } catch (error) {
      return next(new errorHandler(error, 400));
    }
  })
);


router.get( "/get-coupon-value/:name", catchAsyncError(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findOne({ name: req.params.name });

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new errorHandler(error, 400));
    }
  })
);


export default router;