import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, CartContextType } from '../types/cart';
import { Product } from '../types/product';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'MERGE_CART'; payload: CartItem[] };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload;
      
      // Check if product is already in cart
      const existingItemIndex = state.findIndex(item => item.product._id === product._id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if product exists
        const updatedItems = [...state];
        const existingItem = updatedItems[existingItemIndex];
        
        // Check stock availability
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          toast.error(`Only ${product.stock} items available in stock`);
          return state;
        }
        
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity
        };
        
        return updatedItems;
      } else {
        // Add new item to cart
        if (quantity > product.stock) {
          toast.error(`Only ${product.stock} items available in stock`);
          return state;
        }
        
        return [...state, { product, quantity }];
      }
    }
    
    case 'REMOVE_ITEM':
      return state.filter(item => item.product._id !== action.payload);
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return state.filter(item => item.product._id !== productId);
      }
      
      // Find the product to check stock
      const item = state.find(item => item.product._id === productId);
      if (item && quantity > item.product.stock) {
        toast.error(`Only ${item.product.stock} items available in stock`);
        return state;
      }
      
      return state.map(item =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      );
    }
    
    case 'CLEAR_CART':
      return [];
    
    case 'LOAD_CART':
      return action.payload;
    
    case 'MERGE_CART': {
      const remoteCart = action.payload;
      const mergedCart = [...state];
      
      remoteCart.forEach(remoteItem => {
        const existingIndex = mergedCart.findIndex(
          localItem => localItem.product._id === remoteItem.product._id
        );
        
        if (existingIndex >= 0) {
          // Merge quantities, respecting stock limits
          const existingItem = mergedCart[existingIndex];
          const newQuantity = Math.min(
            existingItem.quantity + remoteItem.quantity,
            existingItem.product.stock
          );
          mergedCart[existingIndex] = {
            ...existingItem,
            quantity: newQuantity
          };
        } else {
          // Add new item
          mergedCart.push(remoteItem);
        }
      });
      
      return mergedCart;
    }
    
    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, []);
  const { user } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCartFromStorage = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const cartItems = JSON.parse(savedCart);
          dispatch({ type: 'LOAD_CART', payload: cartItems });
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    };

    loadCartFromStorage();
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Sync cart with user account (optional - for future backend integration)
  useEffect(() => {
    const syncCartWithUser = async () => {
      if (user) {
        // Here you can load the user's cart from your backend
        // For now, we'll just use localStorage
        console.log('User logged in, cart can be synced with backend');
      } else {
        // User logged out - keep cart in localStorage
        console.log('User logged out, cart remains in localStorage');
      }
    };

    syncCartWithUser();
  }, [user]);

  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const mergeCart = (remoteCart: CartItem[]) => {
    dispatch({ type: 'MERGE_CART', payload: remoteCart });
  };

  // Calculate totals
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  // Check if cart has items that are out of stock
  const outOfStockItems = items.filter(item => item.product.stock === 0);
  const lowStockItems = items.filter(item => item.quantity > item.product.stock);

  // Validate cart (check stock availability)
  const validateCart = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    items.forEach(item => {
      if (item.product.stock === 0) {
        errors.push(`${item.product.name} is out of stock`);
      } else if (item.quantity > item.product.stock) {
        errors.push(`Only ${item.product.stock} items available for ${item.product.name}`);
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    mergeCart,
    totalItems,
    totalPrice,
    outOfStockItems,
    lowStockItems,
    validateCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
