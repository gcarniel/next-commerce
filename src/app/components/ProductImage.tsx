'use client'

import { ProductType } from '@/types/ProductType'
import Image from 'next/image'
import { useState } from 'react'

interface ProductImageProps {
  product: ProductType
  fill?: boolean
}
export function ProductImage({ product, fill }: ProductImageProps) {
  const [loading, setLoading] = useState(true)
  return fill ? (
    <Image
      src={product.image}
      alt={product.title}
      fill
      className={`object-contain ${
        loading
          ? 'scale-110 blur-3xl grayscale'
          : 'scale-100 blur-0 grayscale-0'
      }`}
      onLoadingComplete={() => setLoading(false)}
    />
  ) : (
    <Image
      src={product.image}
      alt={product.title}
      width={400}
      height={700}
      className={`object-contain ${
        loading
          ? 'scale-110 blur-3xl grayscale'
          : 'scale-100 blur-0 grayscale-0'
      }`}
      onLoadingComplete={() => setLoading(false)}
    />
  )
}
