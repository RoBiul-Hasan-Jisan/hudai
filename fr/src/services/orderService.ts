import { api } from './api';
import { Order, ShippingAddress } from '../types/order';
import { CartItem } from '../types/cart';

export const orderService = {
  async createOrder(items: CartItem[], shippingAddress: ShippingAddress, paymentMethod: string): Promise<Order> {
    const orderData = {
      items: items.map(item => ({
        productId: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image
      })),
      shippingAddress,
      paymentMethod,
      totalAmount: items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
    };

    const response = await api.post('/orders', orderData);
    return response.data;
  },

  async getOrders(): Promise<Order[]> {
    const response = await api.get('/orders');
    return response.data;
  },

  async getOrder(id: string): Promise<Order> {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  }
};

// Add default export
export default orderService;