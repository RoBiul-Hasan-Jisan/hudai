import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  mergeCart: (remoteCart: CartItem[]) => void;
  totalItems: number;
  totalPrice: number;
  outOfStockItems: CartItem[];
  lowStockItems: CartItem[];
  validateCart: () => { isValid: boolean; errors: string[] };
}