import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

exports.verify = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) return res.status(403).json({ error: "Token not found" })
    try {
        const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
        req.user = decoded.data;
    } catch (exception) {
        res.status(500).json({ error: 'failed to authenticate token' })
    }
    next();
}