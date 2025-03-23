const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal server error',
        errors: err.errors || null
    });
}

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const logError = (err) => {
    console.error(err)
};

const logErrorMiddleWare = (err, req, res, next) => {
    logError(err);
    next(err)
};

const returnError = (err, req, res, next) => {
    res.status(err.statusCode || 500).send(err.message);
};

const isOperationalError = (error) => {
    if (error instanceof BassError) {
        return error.isOperational
    }
    return false;
}

module.exports = {
    errorHandler, 
    asyncHandler,
    logError,
    logErrorMiddleWare,
    returnError,
    isOperationalError
};