import { ProductType } from '@/types/ProductType'
import { Product } from './components/Product'

async function fetchProducts() {
  const resp = await fetch('https://fakestoreapi.com/products')

  if (!resp.ok) {
    throw new Error('Failed to fetch products')
  }

  const data = await resp.json()
  return data
}

export default async function Home() {
  const products = await fetchProducts()
  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6 ">
        {products.map((product: ProductType) => {
          return <Product key={product.id} product={product} />
        })}
      </div>
    </div>
  )
}
