import express from "express";
import { AlbumController } from "./album.controller";

const router = express.Router();

// ADMIN
router.post("/", AlbumController.createAlbum);
router.get("/", AlbumController.getAllAlbums);
router.patch("/:id", AlbumController.updateAlbum);
router.delete("/:id", AlbumController.deleteAlbum);
router.patch("/:id/status", AlbumController.updateStatus);

// USER
router.get("/published/all", AlbumController.getPublishedAlbums);
router.get("/:id", AlbumController.getSingleAlbum);

export const AlbumRoutes = router;