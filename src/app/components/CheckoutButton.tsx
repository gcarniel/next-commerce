import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store'

export function CheckoutButton() {
  const { cart, setCheckout } = useCartStore()

  const totalPrice = cart.reduce(
    (acc, curr) =>
      curr.price && curr.quantity ? acc + curr.price * curr.quantity : 0,
    0,
  )

  const formatedPrice = totalPrice > 0 ? formatPrice(totalPrice / 100) : 0

  const totalItems = cart.reduce(
    (acc, curr) => (curr.quantity ? acc + curr.quantity : acc),
    0,
  )

  return (
    <div className="py-10 w-full">
      <p className="font-bold text-emerald-500">Total: {formatedPrice}</p>
      <p className="font-bold text-emerald-700">Quantidade: {totalItems}</p>
      <button
        onClick={() => setCheckout('checkout')}
        className="bg-teal-600 text-white px-3 py-2 text-lg text-center w-full rounded-lg font-bold hover:opacity-75 ease-in-out duration-300"
      >
        Finalizar compra
      </button>
    </div>
  )
}
