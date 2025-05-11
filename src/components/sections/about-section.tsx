import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
  className?: string
}

export const AboutSection: React.FC<Props> = ({ className }) => {
  return (
    <section id="about" className={cn('bg-slate-50 py-16 md:py-24', className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-[#0F2B5B] sm:text-4xl">
            Что такое zkKYC?
          </h2>
          <p className="text-muted-foreground text-lg">
            Это децентрализованное решение для проверки личности в индустрии
            Web3. Оно разработано для соответствия требованиям Группы разработки
            финансовых мер борьбы с отмыванием денег (FATF) с использованием
            технологии доказательства с нулевым разглашением (ZKP).
          </p>
          <p className="text-muted-foreground text-lg">
            Система zkKYC позволяет пользователям предоставлять поставщикам
            услуг определённые сведения о себе без необходимости разглашать
            персональные идентификационные данные, такие как имена или
            документы, удостоверяющие личность.
          </p>
        </div>
      </div>
    </section>
  )
}
