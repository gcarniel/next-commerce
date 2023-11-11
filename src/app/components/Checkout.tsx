'use client'

import { useCartStore } from '@/store'
import { useEffect } from 'react'

export function Checkout() {
  const { cart, paymentIntent } = useCartStore()

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
        console.log(res.json())
        return res.json()
      })
      .then((data) => {
        console.log(data)
      })
  }, [paymentIntent, cart])
  return <div>Checkout</div>
}
