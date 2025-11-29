import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, Minus, Trash2 } from 'lucide-react'
import { CartItem as CartItemType } from '../../types/cart'
import { useCart } from '../../context/CartContext'

interface CartItemProps {
  item: CartItemType
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(item.product._id)
    } else {
      updateQuantity(item.product._id, newQuantity)
    }
  }

  const totalPrice = item.product.price * item.quantity

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      <Link to={`/products/${item.product._id}`} className="flex-shrink-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </Link>

      <div className="flex-grow">
        <Link to={`/products/${item.product._id}`} className="block">
          <h3 className="font-medium text-gray-900 hover:text-blue-600">
            {item.product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mt-1">${item.product.price}</p>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Minus size={16} />
            </button>
            
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= item.product.stock}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-900">
              ${totalPrice.toFixed(2)}
            </span>
            
            <button
              onClick={() => removeFromCart(item.product._id)}
              className="p-1 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem