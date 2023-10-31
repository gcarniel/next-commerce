'use client'

import { useCartStore } from '@/store'
import { ProductType } from '@/types/ProductType'

interface AddToCartProps {
  product: ProductType
}
export function AddToCart({ product }: AddToCartProps) {
  const { addProduct } = useCartStore()
  return (
    <button
      onClick={() => addProduct(product)}
      className="rounded-md bg-teal-600 text-white px-3 py-2 text-sm text-center"
    >
      Adicionar ao carrinho
    </button>
  )
}
