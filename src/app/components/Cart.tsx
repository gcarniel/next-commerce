'use client'

import { useCartStore } from '@/store'
import { ShoppingCart } from 'lucide-react'
import { Product } from './Product'
import { CartDrawer } from './CartDrawer'

export function Cart() {
  const { toggleCart, cart, isOpen, clearCart } = useCartStore()
  return (
    <>
      <div
        onClick={() => toggleCart()}
        className="flex items-center cursor-pointer relative"
      >
        <ShoppingCart size={26} />
        <span className="bg-teal-500 text-sm font-bold rounded-full h-5 w-5 text-center text-gray-700 absolute -top-1 -right-2 animate-bounce">
          {cart.length}
        </span>
      </div>

      {isOpen && <CartDrawer />}
    </>
  )
}
