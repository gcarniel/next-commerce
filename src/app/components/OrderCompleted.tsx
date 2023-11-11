import { useCartStore } from '@/store'
import { CheckSquare } from 'lucide-react'
import { useEffect } from 'react'

export function OrderCompleted() {
  const { clearCart, setPaymentIntent } = useCartStore()

  useEffect(() => {
    setPaymentIntent('')
    clearCart()
  }, [])
  return (
    <div>
      <h1>Pedido finalizado com sucesso!</h1>
      <CheckSquare className="w-6 h-6 text-teal-500" />
    </div>
  )
}
