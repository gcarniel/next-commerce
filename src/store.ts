import { create } from 'zustand'
import { ProductType } from './types/ProductType'
import { persist } from 'zustand/middleware'

type CartState = {
  cart: ProductType[]
  addProduct: (product: ProductType) => void
  removeProduct: (product: ProductType) => void
  decreaseProduct: (product: ProductType) => void
  isOpen: boolean
  toggleCart: () => void
  clearCart: () => void
}
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addProduct: (product) =>
        set((state) => {
          const existingProduct = state.cart.find((p) => p.id === product.id)

          if (existingProduct) {
            return {
              cart: state.cart.map((p) => {
                if (p.id === product.id) {
                  return { ...p, quantity: p.quantity ? p.quantity + 1 : 1 }
                }

                return p
              }),
            }
          }

          return { cart: [...state.cart, { ...product, quantity: 1 }] }
        }),
      decreaseProduct: (product) =>
        set((state) => {
          const existingProduct = state.cart.find((p) => p.id === product.id)

          if (existingProduct) {
            return {
              cart: state.cart
                .map((p) => {
                  if (p.id === product.id) {
                    return { ...p, quantity: p.quantity ? p.quantity - 1 : 1 }
                  }

                  return p
                })
                .filter((p) => p.quantity !== 0),
            }
          }

          return { cart: [...state.cart] }
        }),

      removeProduct: (product) =>
        set((state) => {
          const existingProduct = state.cart.find((p) => p.id === product.id)

          if (existingProduct) {
            return {
              cart: state.cart.filter((p) => p.id !== product.id),
            }
          }

          return { cart: [...state.cart] }
        }),
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'cart-storage' },
  ),
)
