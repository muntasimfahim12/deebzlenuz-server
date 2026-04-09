import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { ProductService } from "./product.service";
import catchAsync from "../../utils/CatchAsync";

// CREATE
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.createProduct(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

// GET ALL
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAllProducts();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products fetched successfully",
    data: result,
  });
});

// GET SINGLE
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;

  const result = await ProductService.getSingleProduct(slug);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
});

// UPDATE
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ProductService.updateProduct(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

// DELETE
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ProductService.deleteProduct(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

//  HOMEPAGE FAST LOAD
const getHomepageProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getHomepageProducts();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Homepage products fetched",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getHomepageProducts,
};