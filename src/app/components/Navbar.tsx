import { useCartStore } from '@/store'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export function Navbar() {
  // const cart = useCartStore((state) =>  state.cart)
  return (
    <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-slate-900 text-gray-300">
      <Link
        href="/"
        className="uppercase font-bold text-lg h-12 flex items-center"
      >
        Next Store
      </Link>

      <div className="flex items-center gap-8">
        <div className="flex items-center cursor-pointer relative">
          <ShoppingCart size={26} />
          <span className="bg-teal-500 text-sm font-bold rounded-full h-5 w-5 text-center text-gray-700 absolute -top-1 -right-2 animate-bounce">
            2
          </span>
        </div>
        <div className="border-2 border-gray-400 rounded-full">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-md border border-gray-400 px-3 py-2">
                Fazer login
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  )
}
