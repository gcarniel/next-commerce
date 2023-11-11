import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store'
import { Minus, Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import { CheckoutButton } from './CheckoutButton'
import { Checkout } from './Checkout'
import { OrderCompleted } from './OrderCompleted'

import { motion } from 'framer-motion'

export function CartDrawer() {
  const {
    toggleCart,
    cart,
    clearCart,
    addProduct,
    removeProduct,
    decreaseProduct,
    status,
  } = useCartStore()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => toggleCart()}
      className={`fixed inset-0 w-full h-screen bg-slate-950/50 z-50`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute flex flex-col items-start bg-slate-950 right-0 top-0 w-1/3 h-screen p-8 overflow-y-scroll"
      >
        <button
          onClick={() => toggleCart()}
          className="text-teal-500 font-bold text-2xl"
        >
          Voltar para a loja
        </button>

        <div className="border-b border-slate-400 py-2 w-full"></div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex-1 pt-2"
        >
          {status === 'cart' && (
            <>
              {cart.map((product) => {
                const price = product.price ? product.price / 100 : 0

                return (
                  <motion.div
                    variants={item}
                    key={product.id}
                    className="flex gap-4 py-4"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="object-cover rounded-md w-20"
                    />
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg w-40 truncate">{product.name}</h2>
                      <h2 className="text-lg w-40 truncate">
                        Quantidade: {product.quantity}
                      </h2>
                      <span className="text-lg text-teal-500 font-semibold">
                        {formatPrice(price)}
                      </span>
                      <div className="flex gap-4">
                        <button
                          onClick={() => addProduct(product)}
                          className="text-green-500 hover:animate-wiggle"
                        >
                          <Plus strokeWidth={8} />
                        </button>
                        <button
                          onClick={() => decreaseProduct(product)}
                          className="text-orange-500 hover:animate-updown"
                        >
                          <Minus strokeWidth={8} />
                        </button>
                        <button
                          onClick={() => removeProduct(product)}
                          className="text-red-500 hover:animate-scale10"
                        >
                          <Trash strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </>
          )}
        </motion.div>

        <div className="flex-1">
          {cart.length > 0 && status === 'cart' && <CheckoutButton />}
          {status === 'checkout' && <Checkout />}
          {status === 'success' && <OrderCompleted />}
        </div>

        {cart.length > 0 && status === 'cart' && (
          <button onClick={() => clearCart()}>Limpar Carrinho</button>
        )}
      </div>
    </motion.div>
  )
}
