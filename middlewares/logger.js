function logger(req, res, next) {
    console.log(`someone requested ${req.url}, method ${req.method} on ${new Date()}`);
    next()
}

module.exports = logger;