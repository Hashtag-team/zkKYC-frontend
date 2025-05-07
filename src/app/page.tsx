import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Wallet, Upload, CheckCircle, Award } from 'lucide-react'
import { StepCard } from '@/components/step-card'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
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

      {/* Description Section */}
      <section id="about" className="bg-slate-50 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-[#0F2B5B] sm:text-4xl">
              Что такое zkKYC?
            </h2>
            <p className="text-muted-foreground text-lg">
              Это децентрализованное решение для проверки личности в индустрии
              Web3. Оно разработано для соответствия требованиям Группы
              разработки финансовых мер борьбы с отмыванием денег (FATF) с
              использованием технологии доказательства с нулевым разглашением
              (ZKP).
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

      {/* Steps Section */}
      <section id="steps" className="py-16 md:py-24">
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
              title="Получите сообщение о верификации данных"
              description="Дождитесь подтверждения успешной проверки ваших документов"
              icon={<CheckCircle className="h-10 w-10 text-[#21A038]" />}
            />
            <StepCard
              number={4}
              title="Выпустите NFT с zkKYC"
              description="Получите уникальный NFT-сертификат, подтверждающий вашу верификацию"
              icon={<Award className="h-10 w-10 text-[#21A038]" />}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0F2B5B] py-16 text-white md:py-24">
        <div className="container text-center">
          <div className="mx-auto max-w-2xl space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Готовы защитить свои данные?
            </h2>
            <p className="text-lg text-white/80">
              Начните использовать zkKYC прямо сейчас и получите безопасный
              доступ к сервисам Web3
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#21A038] text-lg hover:bg-[#21A038]/90"
            >
              <Link href="/kyc">Получить</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
