const User = require("../models/User");
const jwt = require('jsonwebtoken');

exports.isAuthenticated = async function (req, res, next) {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.json({ message: "Please Login First" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
