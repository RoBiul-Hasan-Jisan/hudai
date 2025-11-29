import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { orderService } from '../services/orderService'
import AddressForm from '../components/checkout/AddressForm'
import PaymentForm from '../components/checkout/PaymentForm'
import OrderSummary from '../components/checkout/OrderSummary'
import { ShippingAddress } from '../types/order'
import toast from 'react-hot-toast'

const Checkout: React.FC = () => {
  const { items, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: user?.displayName || '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  })

  const [paymentMethod, setPaymentMethod] = useState('card')

  if (!user) {
    navigate('/login', { state: { from: '/checkout' } })
    return null
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    
    try {
      await orderService.createOrder(items, shippingAddress, paymentMethod)
      toast.success('Order placed successfully!')
      clearCart()
      navigate('/orders')
    } catch (error: any) {
      toast.error(error.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { number: 1, title: 'Shipping Address' },
    { number: 2, title: 'Payment Method' },
    { number: 3, title: 'Place Order' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((stepItem, index) => (
            <React.Fragment key={stepItem.number}>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepItem.number ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {stepItem.number}
                </div>
                <span className={`ml-2 ${
                  step >= stepItem.number ? 'text-blue-600 font-medium' : 'text-gray-600'
                }`}>
                  {stepItem.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-grow h-1 mx-4 ${
                  step > stepItem.number ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            {step === 1 && (
              <AddressForm
                address={shippingAddress}
                onChange={setShippingAddress}
              />
            )}

            {step === 2 && (
              <PaymentForm
                paymentMethod={paymentMethod}
                onChange={setPaymentMethod}
              />
            )}

            {step === 3 && (
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Review Your Order</h3>
                <p className="text-gray-600 mb-6">
                  Please review your order details before placing the order.
                </p>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="btn btn-outline"
                >
                  Back
                </button>
              )}
              
              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="btn btn-primary ml-auto"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="btn btn-success ml-auto disabled:opacity-50"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}

export default Checkout