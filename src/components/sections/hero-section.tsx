import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  className?: string
}

export const HeroSection: React.FC<Props> = ({ className }) => {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-white py-16 md:py-24',
        className,
      )}
    >
      <div className="container grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tighter text-[#0F2B5B] sm:text-4xl md:text-5xl lg:text-6xl">
            Защитите свои персональные данные при использовании сервисов WEB3
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Безопасная верификация личности с использованием технологии
            доказательства с нулевым разглашением
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#21A038] text-lg hover:bg-[#21A038]/90"
          >
            <Link href="/kyc">Получить</Link>
          </Button>
        </div>
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
          <Image
            src="/hero.png"
            alt="zkKYC Technology"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  )
}
