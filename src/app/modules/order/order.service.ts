import { Order } from "./order.model";

// CREATE
const createOrder = async (payload: any) => {
  return await Order.create(payload);
};

// GET ALL (ADMIN)
const getAllOrders = async () => {
  return await Order.find({ isDeleted: false }).sort({ createdAt: -1 });
};

// GET SINGLE
const getSingleOrder = async (id: string) => {
  return await Order.findById(id);
};

// DELETE (SOFT)
const deleteOrder = async (id: string) => {
  return await Order.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

// UPDATE STATUS
const updateOrderStatus = async (
  id: string,
  status: "pending" | "confirmed" | "delivered"
) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};

// UPDATE PAYMENT
const updatePaymentStatus = async (
  id: string,
  paymentStatus: "paid" | "failed"
) => {
  return await Order.findByIdAndUpdate(id, { paymentStatus }, { new: true });
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  deleteOrder,
  updateOrderStatus,
  updatePaymentStatus,
};