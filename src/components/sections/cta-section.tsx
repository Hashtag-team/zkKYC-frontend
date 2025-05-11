import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import Link from 'next/link'

interface Props {
  className?: string
}

export const CTASection: React.FC<Props> = ({ className }) => {
  return (
    <section
      className={cn('bg-[#0F2B5B] py-16 text-white md:py-24', className)}
    >
      <div className="container text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Готовы защитить свои данные?
          </h2>
          <p className="text-lg text-white/80">
            Начните использовать zkKYC прямо сейчас и получите безопасный доступ
            к сервисам Web3
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
  )
}
