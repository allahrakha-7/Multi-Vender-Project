import express from 'express';
import catchAsyncError from '../middleware/catchAsyncError.js';
import Shop from '../model/shop.model.js';
import Event from '../model/events.model.js'
import { errorHandler } from '../utils/errorHandler.js';
import { isAuthenticated, isSeller, isAdmin } from '../middleware/auth.js';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();


router.post( "/create-event", catchAsyncError(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new errorHandler("Shop Id is invalid!", 400));
      } else {
        let images = [];

        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i], {
            folder: "products",
          });

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        const productData = req.body;
        productData.images = imagesLinks;
        productData.shop = shop;

        const event = await Event.create(productData);

        res.status(201).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      return next(new errorHandler(error, 400));
    }
  })
);


router.get("/get-all-events", catchAsyncError(async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new errorHandler(error, 400));
  }
}));


router.get( "/get-all-events/:id", catchAsyncError(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new errorHandler(error, 400));
    }
  })
);


router.delete( "/delete-shop-event/:id", catchAsyncError(async (req, res, next) => {
    try {
      const event = await Event.findById(req.params.id);

      if (!product) {
        return next(new errorHandler("Product is not found with this id", 404));
      }    

      for (let i = 0; 1 < product.images.length; i++) {
        const result = await cloudinary.uploader.destroy(
          event.images[i].public_id
        );
      }
    
      await event.remove();

      res.status(201).json({
        success: true,
        message: "Event Deleted successfully!",
      });
    } catch (error) {
      return next(new errorHandler(error, 400));
    }
  })
);


router.get( "/admin-all-events", isAuthenticated, isAdmin("Admin"), catchAsyncError(async (req, res, next) => {
    try {
      const events = await Event.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  })
);


export default router;