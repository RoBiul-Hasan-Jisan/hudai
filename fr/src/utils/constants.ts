export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Beauty',
  'Toys',
  'Automotive'
]

export const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card' },
  { id: 'paypal', name: 'PayPal' },
  { id: 'cod', name: 'Cash on Delivery' }
]