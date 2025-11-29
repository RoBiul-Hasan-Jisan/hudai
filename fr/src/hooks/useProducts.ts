import { useState, useEffect } from 'react'
import { Product, ProductFilters } from '../types/product'
import { productService } from '../services/productService'

export const useProducts = (filters?: ProductFilters) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const productsData = await productService.getProducts(filters)
        setProducts(productsData)
      } catch (err) {
        setError('Failed to load products')
        console.error('Error loading products:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [filters])

  return { products, loading, error }
}

// Add default export
export default useProducts;