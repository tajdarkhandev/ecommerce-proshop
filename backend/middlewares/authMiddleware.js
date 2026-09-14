import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { catchAssyncError } from "./catchAssyncError.js";
import ErrorHandler from "./error.js";

export const isAuthenticated = catchAssyncError(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      return next(error?.message);
    }
  } else {
    return next(new ErrorHandler("Not authorization, no tokken", 401));
  }
});

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return next(new ErrorHandler("Not authorization as admin", 401));
  }
};
