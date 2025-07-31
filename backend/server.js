import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import productRouter from './routes/products.route.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config();
}

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});


mongoose.connect(process.env.MONGO)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => {
    console.log('MongoDB connection error:', err);
    process.exit(1);
});


app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT }`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});