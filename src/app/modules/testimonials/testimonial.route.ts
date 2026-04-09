import express from "express";
import { TestimonialController } from "./testimonial.controller";

const router = express.Router();

// ADMIN
router.post("/", TestimonialController.createTestimonial);
router.get("/", TestimonialController.getAllTestimonials);
router.patch("/:id", TestimonialController.updateTestimonial);
router.delete("/:id", TestimonialController.deleteTestimonial);
router.patch("/:id/status", TestimonialController.updateStatus);

// USER
router.get("/published/all", TestimonialController.getPublishedTestimonials);
router.get("/:id", TestimonialController.getSingleTestimonial);

export const TestimonialRoutes = router;