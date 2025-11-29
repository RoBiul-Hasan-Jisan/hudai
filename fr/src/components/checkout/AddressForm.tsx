import React from 'react'
import { ShippingAddress } from '../../types/order'

interface AddressFormProps {
  address: ShippingAddress
  onChange: (address: ShippingAddress) => void
}

const AddressForm: React.FC<AddressFormProps> = ({ address, onChange }) => {
  const handleChange = (field: keyof ShippingAddress, value: string) => {
    onChange({
      ...address,
      [field]: value
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Shipping Address</h3>
      
      <div>
        <label htmlFor="fullName" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          value={address.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          className="form-input"
          required
        />
      </div>

      <div>
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={address.address}
          onChange={(e) => handleChange('address', e.target.value)}
          className="form-input"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            id="city"
            value={address.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div>
          <label htmlFor="postalCode" className="form-label">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            value={address.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            className="form-input"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="country" className="form-label">
          Country
        </label>
        <input
          type="text"
          id="country"
          value={address.country}
          onChange={(e) => handleChange('country', e.target.value)}
          className="form-input"
          required
        />
      </div>
    </div>
  )
}

export default AddressForm