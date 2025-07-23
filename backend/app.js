import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import errorHanlder from './utils/errorHandler.js';


export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: ".env" });
}

app.use(errorHanlder);

