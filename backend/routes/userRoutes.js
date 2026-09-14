import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { admin, isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/user/get-users", isAuthenticated, admin, getAllUsers);
router.get("/user/get-user/:id", isAuthenticated, admin, getUser);
router.post("/user/login", loginUser);
router.post("/user/register", registerUser);
router.post("/user/logout", logoutUser);
router.get("/user/profile", isAuthenticated, getUserProfile);
router.put("/user/update-profile", isAuthenticated, updateUserProfile);
router.put("/user/update/:id", isAuthenticated, admin, updateUser);
router.delete("/user/delete/:id", isAuthenticated, admin, deleteUser);
// router.get("/user/:id", getSingleProduct);

export default router;
