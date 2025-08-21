import Order from "../model/orders.model.js";
import errorHandler from "../utils/errorHandler.js";

const placeOrderDetails = async (req, res, next) => {
  try {
    const {
      userId,
      name,
      email,
      phoneNumber,
      country,
      city,
      address1,
      address2,
      zipCode,
      cart,
      paymentInfo,
    } = req.body;

    if (!name || !email || !phoneNumber || !country || !address1 || !cart || cart.length === 0) {
      return next(errorHandler(400, "Please enter all required fields!"));
    }

    const addressInfo = {
      country,
      city,
      address1,
      address2,
      zipCode,
    };

    const newOrder = new Order({
      userId,
      name,
      email,
      phoneNumber,
      addressInfo,
      cart,
      status: "Processing",
      paymentInfo: {
        id: paymentInfo?.id || null,
        status: paymentInfo?.type === "Card" ? "Pending" : "Unpaid",
      },
      paidAt: paymentInfo?.type === "Card" ? new Date() : null,
    });

    const savedOrder = await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: savedOrder,
    });
  } catch (error) {
    return next(errorHandler(500, "Internal server error. Failed to place order!"));
  }
};

export default placeOrderDetails;

