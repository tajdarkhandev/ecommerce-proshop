import ErrorHandler from "../middlewares/error.js";
import { catchAssyncError } from "../middlewares/catchAssyncError.js";
import { Product } from "../models/productModel.js";

export const getAllProducts = catchAssyncError(async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      return next(new ErrorHandler("No products found", 404));
    }
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getSingleProduct = catchAssyncError(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
