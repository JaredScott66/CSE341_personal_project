

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.status || 500;
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


const isOperationalError = (error) => {
    return error && error.isOperational === true;
}

const idCheck = (id) => {

}

module.exports = {
    errorHandler, 
    asyncHandler,
    logError,
    logErrorMiddleWare,
    isOperationalError
};