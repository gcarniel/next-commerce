import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full items-center py-2 px-8 justify-between z-50 bg-slate-900 text-gray-300">
      <Link href="/" className="uppercase font-bold text-lg flex items-center">
        Next Store
      </Link>
    </nav>
  )
}
