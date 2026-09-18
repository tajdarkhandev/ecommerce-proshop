import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
} from "../controllers/orderController.js";
import { isAuthenticated, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", isAuthenticated, addOrderItems);
router.get("/myorder", isAuthenticated, getMyOrders);
router.get("/getall", isAuthenticated, admin, getAllOrders);
router.get("/:id", isAuthenticated, admin, getOrderById);
router.put("/:id/pay", isAuthenticated, updateOrderToPaid);
router.put("/:id/deliver", isAuthenticated, admin, updateOrderToDelivered);

export default router;
