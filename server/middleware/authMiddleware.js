const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

const protectRoute = async (req, res, next) => {
  // Check if the JWT token exists in the cookie
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Invalid token"});
  }
};

module.exports = protectRoute;