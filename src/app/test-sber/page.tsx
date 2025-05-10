'use client'
import dynamic from 'next/dynamic'

const SberAuthButton = dynamic(
  () =>
    import('@/components/sber-auth-button').then((mod) => mod.SberAuthButton),
  {
    ssr: false,
  },
)

export default function TestPage() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="container max-w-6xl">
          <h1 className="mb-12 text-center text-3xl font-bold tracking-tighter text-[#0F2B5B] sm:text-4xl">
            Тест с авторизацией через Сбер ID
          </h1>

          <div className="mx-auto mb-16 max-w-2xl">
            <div className="flex justify-center rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
              <SberAuthButton />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
