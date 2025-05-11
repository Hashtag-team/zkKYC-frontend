import {
  AboutSection,
  CTASection,
  HeroSection,
  StepsSection,
} from '@/components/sections'

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <AboutSection />
      <StepsSection />
      <CTASection />
    </main>
  )
}
