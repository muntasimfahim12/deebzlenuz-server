import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { AlbumService } from "./album.service";
import catchAsync from "../../utils/CatchAsync";

// CREATE
const createAlbum = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;

  let albumData = typeof req.body.data === "string" ? JSON.parse(req.body.data) : req.body;

  if (file) {
    albumData.cover_image = file.path; 
  }

  const result = await AlbumService.createAlbum(albumData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Album created successfully",
    data: result,
  });
});

// GET ALL (ADMIN)
const getAllAlbums = catchAsync(async (req: Request, res: Response) => {
  const result = await AlbumService.getAllAlbums();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Albums fetched",
    data: result,
  });
});

// GET PUBLISHED (USER)
const getPublishedAlbums = catchAsync(async (req: Request, res: Response) => {
  const result = await AlbumService.getPublishedAlbums();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Published albums",
    data: result,
  });
});

// GET SINGLE
const getSingleAlbum = catchAsync(async (req: Request, res: Response) => {
  const result = await AlbumService.getSingleAlbum(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Album fetched",
    data: result,
  });
});

// UPDATE
const updateAlbum = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  let updateData = typeof req.body.data === "string" ? JSON.parse(req.body.data) : req.body;

  if (file) {
    updateData.cover_image = file.path;
  }

  const result = await AlbumService.updateAlbum(req.params.id, updateData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Album updated successfully",
    data: result,
  });
});

// DELETE
const deleteAlbum = catchAsync(async (req: Request, res: Response) => {
  const result = await AlbumService.deleteAlbum(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Album deleted",
    data: result,
  });
});

// UPDATE STATUS
const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.body;

  const result = await AlbumService.updateStatus(
    req.params.id,
    status
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Status updated",
    data: result,
  });
});

export const AlbumController = {
  createAlbum,
  getAllAlbums,
  getPublishedAlbums,
  getSingleAlbum,
  updateAlbum,
  deleteAlbum,
  updateStatus,
};