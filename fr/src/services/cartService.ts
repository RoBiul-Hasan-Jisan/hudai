import { CartItem } from '../types/cart'
import { api } from './api'

export const cartService = {
  async saveCartToServer(items: CartItem[]): Promise<void> {
    try {
      // Convert cart items to backend format
      const cartData = items.map(item => ({
        productId: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      }))
      
      await api.post('/cart', { items: cartData })
    } catch (error) {
      console.error('Failed to save cart to server:', error)
      throw new Error('Failed to sync cart with server')
    }
  },

  async loadCartFromServer(): Promise<CartItem[]> {
    try {
      const response = await api.get('/cart')
      // You would need to convert the backend response to CartItem format
      // This is a placeholder implementation
      return response.data.items || []
    } catch (error) {
      console.error('Failed to load cart from server:', error)
      return []
    }
  },

  async clearServerCart(): Promise<void> {
    try {
      await api.delete('/cart')
    } catch (error) {
      console.error('Failed to clear server cart:', error)
      throw new Error('Failed to clear cart on server')
    }
  }
}

export default cartService