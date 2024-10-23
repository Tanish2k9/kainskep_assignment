const jwt = require("jsonwebtoken");
const CustomError = require("../utils/CustomError");

const requireAuth = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return next(new CustomError("No token provided", 401));
    // return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, "your_jwt_secret", (err, decoded) => {
    if (err) {
      return next(new CustomError("Invalid token", 401));
      // return res.status(401).json({ error: "Invalid token" });
    }
    req.userId = decoded.id; // Store user ID in request for further use
    next();
  });
};
module.exports = requireAuth;
