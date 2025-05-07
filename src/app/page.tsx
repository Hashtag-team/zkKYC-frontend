import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Wallet, Upload, CheckCircle, Award } from 'lucide-react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#0F2B5B]">zkKYC</span>
            <span className="text-[#21A038]">Сбер</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#about"
              className="text-muted-foreground text-sm font-medium hover:text-[#21A038]"
            >
              О сервисе
            </Link>
            <Link
              href="#steps"
              className="text-muted-foreground text-sm font-medium hover:text-[#21A038]"
            >
              Как это работает
            </Link>
            <Link
              href="#contact"
              className="text-muted-foreground text-sm font-medium hover:text-[#21A038]"
            >
              Контакты
            </Link>
          </nav>
          {/* <Button className="bg-[#21A038] hover:bg-[#21A038]/90">
            Подключить кошелек
          </Button> */}
          <ConnectButton label="Подключить кошелек" />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white py-16 md:py-24">
          <div className="container grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold tracking-tighter text-[#0F2B5B] sm:text-4xl md:text-5xl lg:text-6xl">
                Защитите свои персональные данные при использовании сервисов
                WEB3
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Безопасная верификация личности с использованием технологии
                доказательства с нулевым разглашением
              </p>
              <Button
                size="lg"
                className="bg-[#21A038] text-lg hover:bg-[#21A038]/90"
              >
                Получить
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
                size="lg"
                className="bg-[#21A038] text-lg hover:bg-[#21A038]/90"
              >
                Получить
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#0F2B5B]">zkKYC</span>
            <span className="text-[#21A038]">Сбер</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} zkKYC. Все права защищены.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-muted-foreground text-sm hover:text-[#21A038]"
            >
              Условия использования
            </Link>
            <Link
              href="#"
              className="text-muted-foreground text-sm hover:text-[#21A038]"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function StepCard({
  number,
  title,
  description,
  icon,
}: {
  number: number
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card className="flex flex-col items-center p-6 text-center transition-all hover:shadow-lg">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0F2B5B]/10">
        {icon}
      </div>
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#0F2B5B] text-white">
        {number}
      </div>
      <h3 className="mt-4 mb-2 text-xl font-bold text-[#0F2B5B]">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  )
}
