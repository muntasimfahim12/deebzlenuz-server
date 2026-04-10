import express from "express";
import { AlbumController } from "./album.controller";
import { upload } from "../../utils/upload";

const router = express.Router();

// ADMIN
router.post(
    "/",
    upload.single("cover_image"),
    AlbumController.createAlbum
); router.get("/", AlbumController.getAllAlbums);
router.patch(
    "/:id",
    upload.single("cover_image"),
    AlbumController.updateAlbum
); router.delete("/:id", AlbumController.deleteAlbum);
router.patch("/:id/status", AlbumController.updateStatus);

// USER
router.get("/published/all", AlbumController.getPublishedAlbums);
router.get("/:id", AlbumController.getSingleAlbum);

export const AlbumRoutes = router;