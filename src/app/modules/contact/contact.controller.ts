import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { ContactService } from "./contact.service";
import catchAsync from "../../utils/CatchAsync";

// CREATE (FROM USER)
const createContact = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.createContact(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Message sent successfully",
    data: result,
  });
});

// GET ALL (ADMIN)
const getAllContacts = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.getAllContacts();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All messages fetched",
    data: result,
  });
});

// DELETE SINGLE
const deleteContact = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.deleteContact(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Message deleted",
    data: result,
  });
});

// DELETE ALL
const deleteAllContacts = catchAsync(async (req: Request, res: Response) => {
  await ContactService.deleteAllContacts();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All messages deleted",
    data: null,
  });
});

export const ContactController = {
  createContact,
  getAllContacts,
  deleteContact,
  deleteAllContacts,
};