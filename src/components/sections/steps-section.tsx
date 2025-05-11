import { cn } from '@/lib/utils'
import React from 'react'
import { StepCard } from '../step-card'
import { Award, CheckCircle, Upload, Wallet } from 'lucide-react'

interface Props {
  className?: string
}

export const StepsSection: React.FC<Props> = ({ className }) => {
  return (
    <section id="steps" className={cn('py-16 md:py-24', className)}>
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter text-[#0F2B5B] sm:text-4xl">
          Как пройти верификацию
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <StepCard
            number={1}
            title="Подключите свой кошелек"
            description="Используйте свой Web3 кошелек для безопасного подключения к системе"
            icon={<Wallet className="h-10 w-10 text-[#21A038]" />}
          />
          <StepCard
            number={2}
            title="Загрузите требуемые документы"
            description="Предоставьте необходимые документы для верификации вашей личности"
            icon={<Upload className="h-10 w-10 text-[#21A038]" />}
          />
          <StepCard
            number={3}
            title="Выпустите NFT с zkKYC"
            description="Получите уникальный NFT-сертификат, подтверждающий вашу верификацию"
            icon={<Award className="h-10 w-10 text-[#21A038]" />}
          />
          <StepCard
            number={4}
            title="Получите сообщение о верификации данных"
            description="Дождитесь подтверждения успешной проверки ваших документов"
            icon={<CheckCircle className="h-10 w-10 text-[#21A038]" />}
          />
        </div>
      </div>
    </section>
  )
}
