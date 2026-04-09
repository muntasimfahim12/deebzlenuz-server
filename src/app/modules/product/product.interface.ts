export type TPrice = {
  amount: number;
  currency: string;
  sale_price?: number | null;
};

export type TColor = {
  name: string;
  hex: string;
};

export type TInventory = {
  S: number;
  M: number;
  L: number;
  XL: number;
  XXL: number;
  low_stock_threshold: number;
};

export type TProduct = {
  name: string;
  slug: string;
  subtext: string;
  price: TPrice;
  category: string;
  tag?: string;

  mainImage: string;
  hoverImage?: string;
  gallery: string[];

  description: string;

  colors: TColor[];
  sizes: string[];

  inventory: TInventory;

  highlights: {
    title: string;
    desc: string;
    icon: string;
  }[];

  social_proof: {
    rating: number;
    review_count: number;
    status: string;
  };

  isDeleted?: boolean;
};