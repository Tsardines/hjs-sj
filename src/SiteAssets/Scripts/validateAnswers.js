module.exports = {
    validateAnswers(req, res, next) {
        if (req.url.includes("admin")) {
            console.log("valid");
        }
    },
    next();
};
