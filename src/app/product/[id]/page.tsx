import { AddToCart } from '@/app/components/AddCart'
import { ProductImage } from '@/app/components/ProductImage'
import { formatPrice } from '@/lib/utils'
import Stripe from 'stripe'

interface ProductPageProps {
  params: {
    id: string
  }
}

async function getProduct(id: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
  })

  const product = await stripe.products.retrieve(id)

  const price = await stripe.prices.list({
    product: id,
  })

  return {
    id: product.id,
    price: price.data[0].unit_amount,
    name: product.name,
    image: product.images[0],
    description: product.description,
    currency: price.data[0].currency,
  }
}
export default async function ProductPage({ params }: ProductPageProps) {
  const id = params.id

  const product = await getProduct(id)
  const price = product.price ? product.price / 100 : 0
  return (
    <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto gap-8 p-10">
      <div className="rounded-xl overflow-hidden">
        <ProductImage product={product} />
      </div>
      <div className="flex flex-col text-gray-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold ">{product.name}</h1>
          <h2 className="text-xl text-teal-500 font-semibold">
            {formatPrice(price)}
          </h2>
        </div>
        <div>
          <p className="text-sm">{product.description}</p>
        </div>
        <AddToCart product={product} />
      </div>
    </div>
  )
}
