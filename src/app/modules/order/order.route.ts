import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

// create + payment
router.post("/", OrderController.createOrder);

// webhook
router.post("/webhook", OrderController.webhook);

// admin
router.get("/", OrderController.getAllOrders);
router.get("/:id", OrderController.getSingleOrder);
router.delete("/:id", OrderController.deleteOrder);
router.patch("/:id/status", OrderController.updateStatus);

export const OrderRoutes = router;