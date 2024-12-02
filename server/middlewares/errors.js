const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';
    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message
    });
}

export default globalErrorHandler;

