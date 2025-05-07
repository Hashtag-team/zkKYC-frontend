import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import React from 'react'

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#0F2B5B]">zkKYC</span>
          <span className="text-[#21A038]">Сбер</span>
        </div>
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
        <ConnectButton label="Подключить кошелек" />
      </div>
    </header>
  )
}
