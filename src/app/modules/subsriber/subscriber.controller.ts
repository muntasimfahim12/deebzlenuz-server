import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { SubscriberService } from "./subscriber.service";
import catchAsync from "../../utils/CatchAsync";

// SUBSCRIBE
const subscribe = catchAsync(async (req: Request, res: Response) => {
  const { email, source } = req.body;

  const result = await SubscriberService.createSubscriber(email, source);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Subscribed successfully",
    data: result,
  });
});

// GET ALL (ADMIN)
const getAllSubscribers = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscriberService.getAllSubscribers();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Subscribers fetched",
    data: result,
  });
});

// DELETE
const deleteSubscriber = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscriberService.deleteSubscriber(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Subscriber deleted",
    data: result,
  });
});

// UNSUBSCRIBE
const unsubscribe = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  const result = await SubscriberService.unsubscribe(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Unsubscribed successfully",
    data: result,
  });
});

export const SubscriberController = {
  subscribe,
  getAllSubscribers,
  deleteSubscriber,
  unsubscribe,
};