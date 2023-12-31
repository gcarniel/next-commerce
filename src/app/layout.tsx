import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Navbar } from './components/Navbar'
import clsx from 'clsx'
import { ClerkProvider } from '@clerk/nextjs'
// import { ClerkProvider } from '@clerk/nextjs/app-beta'

import { ptBR } from '@clerk/localizations'
import { Hydrate } from './components/Hydrate'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Commerce',
  description: 'Next Commerce',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="en">
        <body className={clsx(inter.className, 'bg-slate-700')}>
          <Hydrate>
            <Navbar />
            <main className="h-screen p-16">{children}</main>
          </Hydrate>
        </body>
      </html>
    </ClerkProvider>
  )
}
