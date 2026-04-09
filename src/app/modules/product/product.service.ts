import { Product } from "./product.model";
import { TProduct } from "./product.interface";

// CREATE
const createProduct = async (payload: TProduct) => {
  return await Product.create(payload);
};

// GET ALL
const getAllProducts = async () => {
  return await Product.find({ isDeleted: false }).sort({ createdAt: -1 });
};

// GET SINGLE
const getSingleProduct = async (slug: string) => {
  return await Product.findOne({ slug, isDeleted: false });
};

// UPDATE
const updateProduct = async (id: string, payload: Partial<TProduct>) => {
  return await Product.findByIdAndUpdate(id, payload, { new: true });
};

// DELETE (SOFT DELETE)
const deleteProduct = async (id: string) => {
  return await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

//  FAST HOMEPAGE DATA (IMPORTANT)
const getHomepageProducts = async () => {
  return await Product.find({ isDeleted: false })
    .select("name slug price mainImage hoverImage tag social_proof")
    .limit(8)
    .lean();
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getHomepageProducts,
};