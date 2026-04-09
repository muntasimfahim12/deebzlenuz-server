import express from "express";
import { SubscriberController } from "./subscriber.controller";

const router = express.Router();

// USER
router.post("/", SubscriberController.subscribe);
router.post("/unsubscribe", SubscriberController.unsubscribe);

// ADMIN
router.get("/", SubscriberController.getAllSubscribers);
router.delete("/:id", SubscriberController.deleteSubscriber);

export const SubscriberRoutes = router;