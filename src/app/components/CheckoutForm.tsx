'use client'

import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { FormEvent, useEffect, useState } from 'react'

interface CheckoutFormProps {
  clientSecret: string
}
export function CheckoutForm({ clientSecret }: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const { cart, setCheckout } = useCartStore()

  const totalPrice = cart.reduce((acc: any, item: any) => {
    return acc + item.price * item.quantity
  }, 0)

  const formatedPrice = totalPrice > 0 ? formatPrice(totalPrice / 100) : 0

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!stripe) return
    if (!elements) return

    setIsLoading(true)
    e.preventDefault()

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    })

    setIsLoading(false)

    if (!error) {
      setCheckout('sucess')
    }
  }

  useEffect(() => {
    if (!stripe) return
    if (!clientSecret) return
  }, [stripe, clientSecret])

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      <h1>Total: {formatedPrice}</h1>

      <button
        type="submit"
        className="rounded-md bg-teal-600 text-white px-3 py-2 text-sm text-center hover:bg-teal-500 duration-200"
        disabled={isLoading || !stripe}
      >
        {isLoading ? 'Loading...' : 'Finalizar compra'}
      </button>
    </form>
  )
}
