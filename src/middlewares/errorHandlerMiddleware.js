function errorHandler(error, req, res, next) {
    if (err) {
        res.redirect(404)
    }
}

exports.errorHandler = errorHandler;