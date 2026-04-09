export type TOrderStatus = "pending" | "confirmed" | "delivered";

export type TOrder = {
  customer: {
    name: string;
    email: string;
  };

  shipping: {
    address: string;
    city: string;
    country: string;
    method: string;
    cost: number;
  };

  pricing: {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  };

  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
  }[];

  status: TOrderStatus;
  paymentStatus: "pending" | "paid" | "failed";
  paymentSessionId?: string;

  isDeleted?: boolean;
};