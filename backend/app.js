import express from 'express';
import { errorHandler } from './utils/errorHandler.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config();
}

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));


import user from './controllers/user.controller.js';
import shop from './controllers/shop.controller.js'
import product from './controllers/products.controller.js';
import event from './controllers/events.controller.js';
import coupon from './controllers/coupounCode.controller.js';
import payment from './controllers/payments.controller.js';
import order from './controllers/orders.controller.js';
import conversation from './controllers/conversation.controller.js';
import message from './controllers/messages.controller.js';
import withdraw from './controllers/withdraw.controller.js';

app.use("/api/v1/user", user);
app.use("/api/v1/conversation", conversation);
app.use("/api/v1/message", message);
app.use("/api/v1/order", order);
app.use("/api/v1/shop", shop);
app.use("/api/v1/product", product);
app.use("/api/v1/event", event);
app.use("/api/v1/coupon", coupon);
app.use("/api/v1/payment", payment);
app.use("/api/v1/withdraw", withdraw);


app.use(errorHandler);

export default app;