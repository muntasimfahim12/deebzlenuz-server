export type TTestimonialStatus = "draft" | "published";

export type TTestimonial = {
  name: string;
  role?: string;
  company?: string;

  message: string;

  rating?: number; // 1-5 stars
  avatar?: string;

  status: TTestimonialStatus;
  isDeleted?: boolean;
};