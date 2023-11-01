import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store'
import { Minus, Plus, Trash } from 'lucide-react'
import Image from 'next/image'

export function CartDrawer() {
  const {
    toggleCart,
    cart,
    clearCart,
    addProduct,
    removeProduct,
    decreaseProduct,
  } = useCartStore()

  return (
    <div
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

        <div className="flex-1 pt-2">
          {cart.map((product) => {
            const price = product.price ? product.price / 100 : 0

            return (
              <div key={product.id} className="flex gap-4 py-4">
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
                      className="text-green-500"
                    >
                      <Plus strokeWidth={8} />
                    </button>
                    <button
                      onClick={() => decreaseProduct(product)}
                      className="text-orange-500"
                    >
                      <Minus strokeWidth={8} />
                    </button>
                    <button
                      onClick={() => removeProduct(product)}
                      className="text-red-500"
                    >
                      <Trash strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <button onClick={() => clearCart()}>Limpar Carrinho</button>
      </div>
    </div>
  )
}
