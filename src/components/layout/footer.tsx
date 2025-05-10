import Link from 'next/link'
import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-white py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#0F2B5B]">zkKYC</span>
          <span className="text-[#21A038]">Блокчейн хакатон</span>
        </div>
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} zkKYC. Все права защищены.
        </p>
        <div className="flex gap-4">
          <Link
            href="/#"
            className="text-muted-foreground text-sm hover:text-[#21A038]"
          >
            Условия использования
          </Link>
          <Link
            href="/#"
            className="text-muted-foreground text-sm hover:text-[#21A038]"
          >
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  )
}
