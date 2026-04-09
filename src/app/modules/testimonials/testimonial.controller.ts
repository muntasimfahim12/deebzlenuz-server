import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { TestimonialService } from "./testimonial.service";
import catchAsync from "../../utils/CatchAsync";

// CREATE
const createTestimonial = catchAsync(async (req: Request, res: Response) => {
  const result = await TestimonialService.createTestimonial(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Testimonial created",
    data: result,
  });
});

// GET ALL (ADMIN)
const getAllTestimonials = catchAsync(async (req: Request, res: Response) => {
  const result = await TestimonialService.getAllTestimonials();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Testimonials fetched",
    data: result,
  });
});

// GET PUBLISHED (USER)
const getPublishedTestimonials = catchAsync(async (req: Request, res: Response) => {
  const result = await TestimonialService.getPublishedTestimonials();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Published testimonials",
    data: result,
  });
});

// GET SINGLE
const getSingleTestimonial = catchAsync(async (req: Request, res: Response) => {
  const result = await TestimonialService.getSingleTestimonial(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Testimonial fetched",
    data: result,
  });
});

// UPDATE
const updateTestimonial = catchAsync(async (req: Request, res: Response) => {
  const result = await TestimonialService.updateTestimonial(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Testimonial updated",
    data: result,
  });
});

// DELETE
const deleteTestimonial = catchAsync(async (req: Request, res: Response) => {
  const result = await TestimonialService.deleteTestimonial(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Testimonial deleted",
    data: result,
  });
});

// UPDATE STATUS
const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.body;

  const result = await TestimonialService.updateStatus(
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

export const TestimonialController = {
  createTestimonial,
  getAllTestimonials,
  getPublishedTestimonials,
  getSingleTestimonial,
  updateTestimonial,
  deleteTestimonial,
  updateStatus,
};