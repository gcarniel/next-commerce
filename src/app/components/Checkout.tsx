'use client'

import { useCartStore } from '@/store'
import { useEffect, useState } from 'react'

import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import { CheckoutForm } from './CheckoutForm'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
)

export function Checkout() {
  const { cart, paymentIntent, setPaymentIntent } = useCartStore()
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cart,
        payment_intent_id: paymentIntent,
      }),
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setPaymentIntent(data.paymentIntent.id)
        setClientSecret(data.paymentIntent?.client_secret)
      })
  }, [paymentIntent, cart, setPaymentIntent])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'night',
      labels: 'floating',
    },
  }
  return (
    <div className="">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      ) : (
        <div></div>
      )}
      <h1>Checkout</h1>
    </div>
  )
}
