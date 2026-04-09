import express from "express";
import { ContactController } from "./contact.controller";

const router = express.Router();

// USER
router.post("/", ContactController.createContact);

// ADMIN
router.get("/", ContactController.getAllContacts);
router.delete("/:id", ContactController.deleteContact);
router.delete("/", ContactController.deleteAllContacts);

export const ContactRoutes = router;