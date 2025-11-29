import { useState, useEffect } from 'react'
import { Order } from '../types/order'
import { orderService } from '../services/orderService'
import { useAuth } from './useAuth'

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const auth = useAuth() // Get the full auth context
  const user = auth.user // Extract user from auth

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) {
        setOrders([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const ordersData = await orderService.getOrders()
        setOrders(ordersData)
      } catch (err) {
        setError('Failed to load orders')
        console.error('Error loading orders:', err)
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [user])

  return { orders, loading, error }
}

export default useOrders