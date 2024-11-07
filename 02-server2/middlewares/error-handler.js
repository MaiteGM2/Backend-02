export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode;

    res.status(statusCode).json({
        status: statusCode,
        message: err.message
    });
};