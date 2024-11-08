const logger = require('./logger.js');

const errorHandler = ((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    logger.error(`Error en el servidor: ${err.message}`);
    res.status(statusCode).json({
        status: statusCode,
        message: err.message
    });
});

module.exports = errorHandler;