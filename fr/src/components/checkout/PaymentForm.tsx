import React, { useState } from 'react'
import { CreditCard, Lock } from 'lucide-react'

interface PaymentFormProps {
  paymentMethod: string
  onChange: (method: string) => void
}

const PaymentForm: React.FC<PaymentFormProps> = ({ paymentMethod, onChange }) => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'paypal', name: 'PayPal' },
    { id: 'cod', name: 'Cash on Delivery' }
  ]

  const handleCardChange = (field: string, value: string) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Payment Method</h3>

      {/* Payment Method Selection */}
      <div className="space-y-2">
        {paymentMethods.map((method) => (
          <label key={method.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={paymentMethod === method.id}
              onChange={(e) => onChange(e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            {method.icon && <method.icon size={20} className="text-gray-400" />}
            <span className="flex-grow">{method.name}</span>
          </label>
        ))}
      </div>

      {/* Card Details */}
      {paymentMethod === 'card' && (
        <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div>
            <label htmlFor="cardNumber" className="form-label">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardDetails.number}
              onChange={(e) => handleCardChange('number', e.target.value)}
              className="form-input"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry" className="form-label">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiry"
                value={cardDetails.expiry}
                onChange={(e) => handleCardChange('expiry', e.target.value)}
                className="form-input"
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>

            <div>
              <label htmlFor="cvv" className="form-label">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                value={cardDetails.cvv}
                onChange={(e) => handleCardChange('cvv', e.target.value)}
                className="form-input"
                placeholder="123"
                maxLength={3}
              />
            </div>
          </div>

          <div>
            <label htmlFor="cardName" className="form-label">
              Name on Card
            </label>
            <input
              type="text"
              id="cardName"
              value={cardDetails.name}
              onChange={(e) => handleCardChange('name', e.target.value)}
              className="form-input"
              placeholder="John Doe"
            />
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Lock size={16} className="mr-2" />
            Your payment details are secure and encrypted
          </div>
        </div>
      )}

      {paymentMethod === 'paypal' && (
        <div className="p-4 border border-gray-200 rounded-lg bg-yellow-50">
          <p className="text-sm text-gray-600">
            You will be redirected to PayPal to complete your payment.
          </p>
        </div>
      )}

      {paymentMethod === 'cod' && (
        <div className="p-4 border border-gray-200 rounded-lg bg-green-50">
          <p className="text-sm text-gray-600">
            Pay with cash when your order is delivered.
          </p>
        </div>
      )}
    </div>
  )
}

export default PaymentForm