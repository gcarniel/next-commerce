import { ProductType } from '@/types/ProductType'
import { ProductImage } from './ProductImage'
import { formatPrice } from '@/lib/utils'
import { AddToCart } from './AddCart'
import Link from 'next/link'

interface ProductProps {
  product: ProductType
}
export function Product({ product }: ProductProps) {
  const price = product.price ? product.price / 100 : 0
  return (
    <Link
      href={`/product/${product.id}`}
      className="flex flex-col shadow-lg h-96 bg-slate-800 p-5 text-slate-300 rounded-md"
    >
      <div className="relative max-h-72 flex-1">
        <ProductImage product={product} fill />
      </div>
      <div className="flex justify-between font-bold my-3">
        <p className="w-40 truncate">{product.name}</p>
        <p className="text-md text-teal-400">{formatPrice(price)}</p>
      </div>
      <AddToCart product={product} />
    </Link>
  )
}
