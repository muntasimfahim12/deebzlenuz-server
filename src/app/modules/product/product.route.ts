import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

router.post("/", ProductController.createProduct);

router.get("/", ProductController.getAllProducts);

//  FAST endpoint (homepage)
router.get("/home", ProductController.getHomepageProducts);

router.get("/:slug", ProductController.getSingleProduct);

router.patch("/:id", ProductController.updateProduct);

router.delete("/:id", ProductController.deleteProduct);

export const ProductRoutes = router;