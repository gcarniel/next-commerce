import { ProductType } from '@/types/ProductType'
import { Product } from './components/Product'
import Stripe from 'stripe'

async function fetchProducts(): Promise<ProductType[]> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
  })

  const products = await stripe.products.list()

  const productsStripe = products.data.map(async (product) => {
    const price = await stripe.prices.list({
      product: product.id,
    })

    return {
      id: product.id,
      price: price.data[0].unit_amount,
      name: product.name,
      image: product.images[0],
      description: product.description,
      currency: price.data[0].currency,
    }
  })

  const formatedProducts = await Promise.all(productsStripe)

  return formatedProducts
}

export default async function Home() {
  const products = await fetchProducts()
  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
        {products.map((product: ProductType) => {
          return <Product key={product.id} product={product} />
        })}
      </div>
    </div>
  )
}
