import { api } from './api';
import { Product, ProductFilters } from '../types/product';

export const productService = {
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.search) params.append('search', filters.search);

    const response = await api.get(`/products?${params}`);
    return response.data;
  },

  async getProduct(id: string): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async getCategories(): Promise<string[]> {
    const response = await api.get('/products/categories');
    return response.data;
  }
};

// Add default export
export default productService;