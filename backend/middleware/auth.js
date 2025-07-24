import { errorHandler } from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import User from '../model/user.model.js';
import Shop from '../model/shop.model.js';
import jwt from 'jsonwebtoken';

export const isAuthenticated = catchAsyncError(async (req,res,next) => {
    const {access_token} = req.cookies;

    if(!token){
        return next(new errorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(access_token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
});


export const isSeller = catchAsyncError(async (req,res,next) => {
    const {seller_token} = req.cookies;
    if(!seller_token){
        return next(new errorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

    req.seller = await Shop.findById(decoded.id);

    next();
});


export const isAdmin = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new errorHandler(`${req.user.role} can not access this resources!`))
        };
        next();
    }
}