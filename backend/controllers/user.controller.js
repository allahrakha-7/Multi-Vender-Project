// import User from '../model/user.model.js';
// import { errorHandler } from '../utils/errorHandler.js';
// import { v2 as cloudinary } from 'cloudinary';
// import catchAsyncError from '../routes/catchAsyncError.js';
// import jwt from 'jsonwebtoken';
// import sendMail from '../utils/sendMail.js';
// import sendToken from '../utils/jwtToken.js'
// import { isAuthenticated, isAdmin } from '../routes/auth.js';
// import bcrypt from 'bcryptjs';

export const test = (req, res) => {
  res.json({
    message: "Api route is working!",
  })
}

