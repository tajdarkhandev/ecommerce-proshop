import ErrorHandler from "../middlewares/error.js";
import { catchAssyncError } from "../middlewares/catchAssyncError.js";
import { User } from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

export const loginUser = catchAssyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("All fields are required", 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("Unauthorized access", 401));
    }
    const checkPassword = await user.matchPassword(password);
    if (!checkPassword) {
      return next(new ErrorHandler("Incorrect password", 402));
    }
    generateToken(res, user._id);

    return res.status(200).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    return next(new ErrorHandler(error?.message, 404));
  }
});

// register new user
export const registerUser = catchAssyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User already exist", 401));
  }
  const newUser = await User.create({ name, email, password });

  generateToken(res, newUser._id);

  return res.status(200).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
  });
});

export const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const getUserProfile = catchAssyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  return res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

export const updateUserProfile = catchAssyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }
  const updatedUser = await user.save();
  return res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

export const getAllUsers = catchAssyncError(async (req, res, next) => {
  res.send("get all users");
});

export const getUser = catchAssyncError(async (req, res, next) => {
  res.send("get user");
});

export const updateUser = catchAssyncError(async (req, res, next) => {
  res.send("update user");
});

export const deleteUser = catchAssyncError(async (req, res, next) => {
  y;
  res.send("delete user");
});
