import errorHanlder from "../utils/errorHandler.js";

export const middleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    if (err.name === 'CastError') {
        const message = `Resources not found with this Id. Invalid ${err.path}!`;
        err = new errorHanlder(message, 400);
    }

    if (err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} entered!`;
        err = errorHanlder(message, 400);
    }

    if (err.name === 'JsonWebTokenError') {
        const message = `Your URL is invalid. Please try again later!`;
        err = new errorHanlder(message, 400);
    }

    if (err.name === 'TokenExpiredError') {
        const message = `Your URL is expired. Please try again later`;
        err = new errorHanlder(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}

