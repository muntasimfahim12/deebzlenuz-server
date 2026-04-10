import express, { NextFunction, Request, Response } from "express";
import { TestimonialController } from "./testimonial.controller";
import { upload } from "../../utils/upload";

const router = express.Router();

// ADMIN - Create with Image
router.post(
    "/",
    upload.single("avatar"),
    (req: Request, res: Response, next: NextFunction) => {
        if (req.file) {
            req.body.avatar = req.file.path;
        }
        next();
    },
    TestimonialController.createTestimonial
);

// ADMIN - Update with Image (Optional)
router.patch(
    "/:id",
    upload.single("avatar"),
    (req: Request, res: Response, next: NextFunction) => {
        if (req.file) {
            req.body.avatar = req.file.path;
        }
        next();
    },
    TestimonialController.updateTestimonial
);

// Other Routes
router.get("/", TestimonialController.getAllTestimonials);
router.delete("/:id", TestimonialController.deleteTestimonial);
router.patch("/:id/status", TestimonialController.updateStatus);

// USER
router.get("/published/all", TestimonialController.getPublishedTestimonials);
router.get("/:id", TestimonialController.getSingleTestimonial);

export const TestimonialRoutes = router;