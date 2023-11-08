'use client'

import { ProductType } from '@/types/ProductType'
import { useCallback, useEffect, useState } from 'react'
import { Product } from './Product'
import { useInView } from 'react-intersection-observer'
import { fetchProducts } from '../actions'
import SkeletonCard from './SkeletonCard'

interface InfiniteScrollProps {
  initialProducts: ProductType[]
}
export default function InfiniteScroll({
  initialProducts,
}: InfiniteScrollProps) {
  const [products, setProducts] = useState<ProductType[]>(initialProducts)
  const [hasMore, setHasmore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  })

  const lastProductId = products[products.length - 1].id

  const loadMoreProducts = useCallback(async () => {
    setIsLoading(true)

    const { formatedProducts, has_more: hasMore } = await fetchProducts({
      lastProductId,
    })

    setProducts((prevProducts) => [...prevProducts, ...formatedProducts])
    setHasmore(hasMore)

    setIsLoading(false)
  }, [lastProductId])

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMoreProducts()
    }
  }, [inView, hasMore, isLoading, loadMoreProducts])

  if (products.length === 0) {
    return <div> buscando produtos</div>
  }

  return (
    <>
      {products.map((product: ProductType) => {
        return <Product key={product.id} product={product} />
      })}

      {hasMore && <div ref={ref}>Buscando produtos</div>}
    </>
  )
}
