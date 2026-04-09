import express from "express";
import { ProductController } from "./product.controller";
import { upload } from "../../utils/upload";

const router = express.Router();

router.post(
  "/", 
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'hoverImage', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
  ]), 
  ProductController.createProduct
);

router.get("/", ProductController.getAllProducts);

//  FAST endpoint (homepage)
router.get("/home", ProductController.getHomepageProducts);

router.get("/:slug", ProductController.getSingleProduct);

router.patch(
  "/:id", 
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'hoverImage', maxCount: 1 },
    { name: 'gallery', maxCount: 10 }
  ]), 
  ProductController.updateProduct
);

router.delete("/:id", ProductController.deleteProduct);

export const ProductRoutes = router;