import { Testimonial } from "./testimonial.model";

// CREATE
const createTestimonial = async (payload: any) => {
  return await Testimonial.create(payload);
};

// GET ALL (ADMIN)
const getAllTestimonials = async () => {
  return await Testimonial.find({ isDeleted: false }).sort({ createdAt: -1 });
};

// GET PUBLISHED (FRONTEND)
const getPublishedTestimonials = async () => {
  return await Testimonial.find({
    status: "published",
    isDeleted: false,
  });
};

// GET SINGLE
const getSingleTestimonial = async (id: string) => {
  return await Testimonial.findById(id);
};

// UPDATE
const updateTestimonial = async (id: string, payload: any) => {
  return await Testimonial.findByIdAndUpdate(id, payload, { new: true });
};

// DELETE
const deleteTestimonial = async (id: string) => {
  return await Testimonial.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

// UPDATE STATUS
const updateStatus = async (
  id: string,
  status: "draft" | "published"
) => {
  return await Testimonial.findByIdAndUpdate(id, { status }, { new: true });
};

export const TestimonialService = {
  createTestimonial,
  getAllTestimonials,
  getPublishedTestimonials,
  getSingleTestimonial,
  updateTestimonial,
  deleteTestimonial,
  updateStatus,
};