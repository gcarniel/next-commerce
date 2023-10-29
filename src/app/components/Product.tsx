import { ProductType } from '@/types/ProductType'
import { ProductImage } from './ProductImage'

interface ProductProps {
  product: ProductType
}
export function Product({ product }: ProductProps) {
  return (
    <div className="flex flex-col shadow-lg h-96 bg-slate-800 p-5 text-slate-300 rounded-md">
      <div className="relative max-h-72 flex-1">
        <ProductImage product={product} fill />
      </div>
      <div className="flex justify-between font-bold my-3">
        <p className="w-40 truncate">{product.title}</p>
        <p className="text-md text-teal-400">R$ {product.price}</p>
      </div>
      <button className="rounded-md bg-teal-600 text-white px-3 py-2 text-sm text-center">
        Adicionar ao carrinho
      </button>
    </div>
  )
}
