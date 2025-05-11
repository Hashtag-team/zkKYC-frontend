'use client'
import { useUserRoles } from '@/lib/web3/roles'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import React from 'react'
import { useAccount } from 'wagmi'
import { Badge } from '../ui/badge'

export const Header: React.FC = () => {
  const { address } = useAccount()

  const { isAdmin, isRegulator, isBusiness, isVerifier } = useUserRoles(address)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#0F2B5B]">zkKYC</span>
          <span className="text-[#21A038]">Блокчейн хакатон</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          <Link
            href="/#about"
            className="text-muted-foreground text-sm font-medium hover:text-[#21A038]"
          >
            О сервисе
          </Link>
          <Link
            href="/#steps"
            className="text-muted-foreground text-sm font-medium hover:text-[#21A038]"
          >
            Как это работает
          </Link>
          <Link
            href="/#contact"
            className="text-muted-foreground text-sm font-medium hover:text-[#21A038]"
          >
            Контакты
          </Link>
        </nav>
        <div className="flex gap-2">
          <ConnectButton label="Подключить кошелек" />

          <div className="flex gap-2">
            {isAdmin && <Badge variant="outline">Admin</Badge>}
            {isRegulator && <Badge variant="secondary">Regulator</Badge>}
            {isBusiness && <Badge variant="destructive">Business</Badge>}
            {isVerifier && <Badge variant="default">Verifier</Badge>}
          </div>
        </div>
      </div>
    </header>
  )
}
