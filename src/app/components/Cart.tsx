'use client'

import { useCartStore } from '@/store'
import { ShoppingCart } from 'lucide-react'
import { Product } from './Product'
import { CartDrawer } from './CartDrawer'

export function Cart() {
  const { toggleCart, cart, isOpen } = useCartStore()

  const totalItems = cart.reduce(
    (acc, curr) => (curr.quantity ? acc + curr.quantity : acc),
    0,
  )
  return (
    <>
      <div
        onClick={() => toggleCart()}
        className="flex items-center cursor-pointer relative"
      >
        <ShoppingCart size={26} />
        {totalItems > 0 && (
          <span className="bg-teal-500 text-sm font-bold rounded-full h-5 w-5 text-center text-gray-700 absolute -top-1 -right-2 animate-bounce">
            {totalItems}
          </span>
        )}
      </div>

      {isOpen && <CartDrawer />}
    </>
  )
}
