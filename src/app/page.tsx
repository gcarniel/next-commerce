import { ProductType } from '@/types/ProductType'

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
  console.log(products)
  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6 ">
        {products.map((product: ProductType) => {
          return (
            <div key={product.id} className="bg-slate-800  p-4">
              {product.title}
            </div>
          )
        })}
      </div>
    </div>
  )
}
