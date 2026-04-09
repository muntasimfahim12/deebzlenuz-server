import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { OrderService } from "./order.service";
import Stripe from "stripe";
import { Order } from "./order.model";
import catchAsync from "../../utils/CatchAsync";
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

//  CREATE ORDER + PAYMENT
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;

  // 1. Save order first
  const order = await OrderService.createOrder({
    ...orderData,
    status: "pending",
    paymentStatus: "pending",
  });

  // 2. Create Stripe checkout
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    line_items: orderData.items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),

    success_url: `http://localhost:3000/success?orderId=${order._id}`,
    cancel_url: `http://localhost:3000/cancel`,
  });

  // 3. Save session ID
  order.paymentSessionId = session.id;
  await order.save();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order created successfully",
    data: {
      checkoutUrl: session.url,
      orderId: order._id,
    },
  });
});

// 🔁 WEBHOOK (PAYMENT SUCCESS)
const webhook = catchAsync(async (req: Request, res: Response) => {
  const event = req.body;

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const order = await Order.findOne({
      paymentSessionId: session.id,
    });

    if (order) {
      order.paymentStatus = "paid";
      await order.save();
    }
  }

  res.sendStatus(200);
});

// GET ALL
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Orders fetched",
    data: result,
  });
});

// GET SINGLE
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getSingleOrder(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order fetched",
    data: result,
  });
});

// DELETE
const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.deleteOrder(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order deleted",
    data: result,
  });
});

// UPDATE STATUS (ADMIN)
const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.body;

  const result = await OrderService.updateOrderStatus(
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

export const OrderController = {
  createOrder,
  webhook,
  getAllOrders,
  getSingleOrder,
  deleteOrder,
  updateStatus,
};