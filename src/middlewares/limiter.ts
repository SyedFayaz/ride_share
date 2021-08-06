const rateLimit = require("express-rate-limit");
exports.rateLimit = rateLimit({
    windowMs: 10 * 60 * 1000, //10 minutes
    max: 100 //max 100 requests
});