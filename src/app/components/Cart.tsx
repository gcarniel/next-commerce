'use client'

import { useCartStore } from '@/store'
import { ShoppingCart } from 'lucide-react'
import { Product } from './Product'

export function Cart() {
  const { toggleCart, cart, isOpen } = useCartStore()
  console.log(cart)
  return (
    <>
      <div
        onClick={() => toggleCart()}
        className="flex items-center cursor-pointer relative"
      >
        <ShoppingCart size={26} />
        <span className="bg-teal-500 text-sm font-bold rounded-full h-5 w-5 text-center text-gray-700 absolute -top-1 -right-2 animate-bounce">
          2
        </span>
      </div>

      {isOpen && (
        <div
          onClick={() => toggleCart()}
          className={`fixed inset-0 w-full h-screen bg-slate-950/50 z-50`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bg-slate-950 right-0 top-0 w-1/3 h-screen p-12 overflow-y-scroll"
          >
            <header className="flex justify-between">
              <h1>Meu Carrinho</h1>
              <button onClick={() => toggleCart()}>Fechar</button>
            </header>

            <main>
              {cart.map((product) => {
                return <Product key={product.id} product={product} />
              })}
            </main>
          </div>
        </div>
      )}
    </>
  )
}
