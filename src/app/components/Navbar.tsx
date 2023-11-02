import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import Link from 'next/link'
import { Cart } from './Cart'

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-slate-900 text-gray-300">
      <Link
        href="/"
        className="uppercase font-bold text-lg h-12 flex items-center"
      >
        Next Store
      </Link>

      <div className="flex items-center gap-8">
        <Cart />
        <div>
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
