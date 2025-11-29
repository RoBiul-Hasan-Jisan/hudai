export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  subcategory?: string;
  brand?: string;
  stock: number;
  sku: string;
  tags?: string[];
  features?: string[];
  specifications?: Record<string, string>;
  rating: number;
  reviewCount: number;
  salesCount: number;
  isFeatured: boolean;
  isActive: boolean;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  tags?: string[];
  inStock?: boolean;
  isFeatured?: boolean;
  rating?: number;
  sortBy?: 'name' | 'price' | 'rating' | 'createdAt' | 'salesCount';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ProductReview {
  _id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title?: string;
  comment: string;
  isVerified: boolean;
  helpful: number;
  notHelpful: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  parentCategory?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductInventory {
  productId: string;
  sku: string;
  quantity: number;
  reserved: number;
  available: number;
  lowStockThreshold: number;
  restockDate?: string;
  lastRestocked: string;
}

export interface ProductVariant {
  _id: string;
  productId: string;
  name: string;
  options: ProductVariantOption[];
  combinations: ProductVariantCombination[];
}

export interface ProductVariantOption {
  name: string;
  values: string[];
}

export interface ProductVariantCombination {
  _id: string;
  sku: string;
  attributes: Record<string, string>;
  price: number;
  stock: number;
  image?: string;
  isActive: boolean;
}

export interface ProductCreateData {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  subcategory?: string;
  brand?: string;
  stock: number;
  sku: string;
  tags?: string[];
  features?: string[];
  specifications?: Record<string, string>;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  isFeatured?: boolean;
}

export interface ProductUpdateData {
  name?: string;
  description?: string;
  price?: number;
  originalPrice?: number;
  image?: string;
  images?: string[];
  category?: string;
  subcategory?: string;
  brand?: string;
  stock?: number;
  sku?: string;
  tags?: string[];
  features?: string[];
  specifications?: Record<string, string>;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  isFeatured?: boolean;
  isActive?: boolean;
}

export interface ProductStats {
  totalProducts: number;
  activeProducts: number;
  outOfStockProducts: number;
  lowStockProducts: number;
  totalCategories: number;
  averageRating: number;
  totalReviews: number;
}

export interface ProductSearchResult {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}