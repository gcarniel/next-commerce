'use client'

import { useEffect, useState } from 'react'

interface HydrateProps {
  children: React.ReactNode
}
export function Hydrate({ children }: HydrateProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted ? <>{children}</> : <>Loading...</>
}
