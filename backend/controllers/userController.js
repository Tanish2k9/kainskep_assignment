const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { ApiResponse } = require("../utils/ApiResponse");
const CustomError = require("../utils/CustomError");

const signupUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return next(new CustomError("Email Already exist", 400));
    }
    const newUser = new User({ username, email, password });

    await newUser.save();

    res
      .status(201)
      .json(new ApiResponse(201, null, "User created successfully"));
  } catch (error) {
    return next(new CustomError(error.message, 400));
    // res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new CustomError("Invalid Credentials", 401));
      // return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new CustomError("Invalid credentials", 401));
      // return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "3d",
    }); // Use a strong secret key
    // new ApiResponse(201, { token }, "User created successfully");
    res
      .status(200)
      .json(new ApiResponse(200, { token }, "User created successfully"));
  } catch (error) {
    return next(new CustomError(error.message, 500));
    // res.status(500).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
