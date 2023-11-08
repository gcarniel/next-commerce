import { stripe } from '@/lib/stripe'
import { ProductType } from '@/types/ProductType'
import { auth } from '@clerk/nextjs'
import prisma from '@/lib/prisma'

const calculateOrderAmount = (items: ProductType[]) => {
  const totalPrice = items.reduce((acc: any, item: any) => {
    return acc + item.price * item.quantity
  }, 0)

  return totalPrice
}

export async function POST(request: Request) {
  const { userId } = auth()

  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { items, payment_intent_id } = await request.json()

  const customerIdTemp = 'cus_Oxw7xmFzvRXPdN'

  const total = calculateOrderAmount(items)

  const order = {
    user: {
      connect: {
        id: userId,
      },
    },
    amount: total,
    currency: 'brl',
    paymentIntentId: payment_intent_id,
    status: 'pending',
    products: {
      create: items.map((item: ProductType) => ({
        name: item.name,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
    },
  }

  if (payment_intent_id) {
    const currentIntent = await stripe.paymentIntents.retrieve(
      payment_intent_id,
    )

    if (currentIntent) {
      const updatedIntent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: total,
        },
      )

      const [existingOrder, updatedOrder] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
          include: { products: true },
        }),
        prisma.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: total,
            products: {
              deleteMany: {},
              create: items.map((item: ProductType) => ({
                name: item.name,
                description: item.description,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
              })),
            },
          },
        }),
      ])

      if (existingOrder) {
        return new Response('Order not found', { status: 404 })
      }

      return Response.json({ paymentIntent: updatedIntent })
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'brl',
      automatic_payment_methods: {
        enabled: true,
      },
    })

    order.paymentIntentId = paymentIntent.id

    const newOrder = await prisma.order.create({
      data: order,
    })

    return Response.json({ paymentIntent })
  }

  console.log(items, payment_intent_id)

  stripe
}
