const errorHandler = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    Error.captureStackTrace(error, createErrorHandler);
    return error;
};

export { errorHandler };