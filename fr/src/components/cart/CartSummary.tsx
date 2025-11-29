import React from 'react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

interface CartSummaryProps {
  onCheckout?: () => void
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { totalPrice, totalItems, items } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const shippingCost = totalPrice > 50 ? 0 : 10
  const tax = totalPrice * 0.1 // 10% tax
  const finalTotal = totalPrice + shippingCost + tax

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } })
      return
    }
    onCheckout?.()
    navigate('/checkout')
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal ({totalItems} items)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full mt-6 btn btn-primary"
      >
        Proceed to Checkout
      </button>

      {totalPrice < 50 && (
        <p className="text-sm text-center text-gray-600 mt-4">
          Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
        </p>
      )}
    </div>
  )
}

export default CartSummary