import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { ProductService } from "./product.service";
import catchAsync from "../../utils/CatchAsync";

// === CREATE PRODUCT ===
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const productData = { ...req.body };
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  // Handle Images
  if (files) {
    if (files.mainImage && files.mainImage[0]) {
      productData.mainImage = `/uploads/${files.mainImage[0].filename}`;
    }
    if (files.hoverImage && files.hoverImage[0]) {
      productData.hoverImage = `/uploads/${files.hoverImage[0].filename}`;
    }
    if (files.gallery) {
      productData.gallery = files.gallery.map(file => `/uploads/${file.filename}`);
    }
  }

  // Handle Price Object
  const amount = productData.price ? Number(productData.price) : 0;
  const sale_price = productData.salePrice ? Number(productData.salePrice) : 0;

  productData.price = {
    amount: amount,
    currency: "$", 
    sale_price: sale_price
  };

  // Parse JSON Strings for Array/Object fields
  const fieldsToParse = ['inventory', 'highlights', 'colors', 'sizes', 'social_proof'];
  
  fieldsToParse.forEach(field => {
    if (productData[field]) {
      if (typeof productData[field] === 'string') {
        try {
          productData[field] = JSON.parse(productData[field]);
        } catch (error) {
          console.error(`Error parsing ${field}:`, error);
          if (field === 'colors' || field === 'sizes') {
            productData[field] = productData[field].split(',').map((item: string) => item.trim());
          }
        }
      }
    } else {
      if (field === 'colors' || field === 'sizes') {
        productData[field] = [];
      }
    }

    // CRITICAL FIX: Convert string colors to objects to match Mongoose schema
    if (field === 'colors' && Array.isArray(productData[field])) {
      productData[field] = productData[field].map((c: any) => {
        if (typeof c === 'string') {
          return { name: c, hex: c }; // Formats to expected embedded object
        }
        return c;
      });
    }
  });

  // Handle Inventory
  if (productData.inventory) {
    if (typeof productData.inventory !== 'object') {
      productData.inventory = {};
    }
    if (productData.lowStockWarning) {
      productData.inventory.low_stock_threshold = Number(productData.lowStockWarning);
    }
  }

  const result = await ProductService.createProduct(productData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

// === GET ALL PRODUCTS ===
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAllProducts();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products fetched successfully",
    data: result,
  });
});

// === GET SINGLE PRODUCT ===
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

// === UPDATE PRODUCT ===
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const productData = { ...req.body };
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  // Handle Image Updates
  if (files) {
    if (files.mainImage && files.mainImage[0]) {
      productData.mainImage = `/uploads/${files.mainImage[0].filename}`;
    }
    if (files.hoverImage && files.hoverImage[0]) {
      productData.hoverImage = `/uploads/${files.hoverImage[0].filename}`;
    }
    if (files.gallery) {
      productData.gallery = files.gallery.map(file => `/uploads/${file.filename}`);
    }
  }

  // Handle Price Updates
  if (productData.price || productData.salePrice) {
    const rawPrice = typeof productData.price === 'object' ? productData.price.amount : productData.price;
    const amount = rawPrice ? Number(rawPrice) : 0;
    const sale_price = productData.salePrice ? Number(productData.salePrice) : 0;

    productData.price = {
      amount: amount,
      currency: "$",
      sale_price: sale_price
    };
  }

  // Parse JSON Strings and Fix Colors
  const fieldsToParse = ['inventory', 'highlights', 'colors', 'sizes', 'social_proof'];
  fieldsToParse.forEach(field => {
    if (productData[field] && typeof productData[field] === 'string') {
      try {
        productData[field] = JSON.parse(productData[field]);
      } catch (error) {
        console.error(`Error parsing ${field}:`, error);
        if (field === 'colors' || field === 'sizes') {
          productData[field] = productData[field].split(',').map((item: string) => item.trim());
        }
      }
    }

    // Update case color object fix
    if (field === 'colors' && Array.isArray(productData[field])) {
      productData[field] = productData[field].map((c: any) => (typeof c === 'string' ? { name: c, hex: c } : c));
    }
  });

  const result = await ProductService.updateProduct(id, productData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

// === DELETE PRODUCT ===
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

// === HOMEPAGE PRODUCTS ===
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