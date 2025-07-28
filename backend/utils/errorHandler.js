const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    Error.message = message;
    return error;
};

export default errorHandler;