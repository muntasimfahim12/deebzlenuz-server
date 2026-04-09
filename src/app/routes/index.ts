// src/app/routes/index.ts
import { Router } from "express";
import { ProductRoutes } from "../modules/product/product.route";
import { OrderRoutes } from "../modules/order/order.route";
import { ContactRoutes } from "../modules/contact/contact.route";
import path from "path";
import { AlbumRoutes } from "../modules/album/album.route";
import { TestimonialRoutes } from "../modules/testimonials/testimonial.route";
import { SubscriberRoutes } from "../modules/subsriber/subscriber.route";
const router = Router();
const moduleRoutes = [
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
  {
    path: "/contacts",
    route: ContactRoutes,
  },
  {
    path: "/album",
    route: AlbumRoutes,
  },
  {
    path: "/testimonials",
    route: TestimonialRoutes,
  },
  {
    path: "/subscribers",
    route: SubscriberRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
