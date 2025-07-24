import Conversation from '../model/conversation.model.js'
import { errorHandler } from '../utils/errorHandler.js';
import catchAsyncError from '../middleware/catchAsyncError.js';
import { isAuthenticated, isSeller } from '../middleware/auth.js';
import express from 'express';

const router = express.Router();


router.post( "/create-new-conversation", catchAsyncError(async (req, res, next) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;

      const isConversationExist = await Conversation.findOne({ groupTitle });

      if (isConversationExist) {
        const conversation = isConversationExist;
        res.status(201).json({
          success: true,
          conversation,
        });
      } else {
        const conversation = await Conversation.create({
          members: [userId, sellerId],
          groupTitle: groupTitle,
        });

        res.status(201).json({
          success: true,
          conversation,
        });
      }
    } catch (error) {
      return next(new errorHandler(error.response.message), 500);
    }
  })
);


router.get( "/get-all-conversation-seller/:id", isSeller, catchAsyncError(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new errorHandler(error), 500);
    }
  })
);



router.get( "/get-all-conversation-user/:id", isAuthenticated, catchAsyncError(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new errorHandler(error), 500);
    }
  })
);


router.put( "/update-last-message/:id", catchAsyncError(async (req, res, next) => {
    try {
      const { lastMessage, lastMessageId } = req.body;

      const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
        lastMessage,
        lastMessageId,
      });

      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return next(new errorHandler(error), 500);
    }
  })
);


export default router;