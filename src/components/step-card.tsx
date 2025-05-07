import { Card } from '@/components/ui/card'
import type { ReactNode } from 'react'

interface StepCardProps {
  number: number
  title: string
  description: string
  icon: ReactNode
  active?: boolean
  completed?: boolean
}

export function StepCard({
  number,
  title,
  description,
  icon,
  active = false,
  completed = false,
}: StepCardProps) {
  return (
    <Card
      className={`flex flex-col items-center p-6 text-center transition-all ${
        active ? 'border-[#21A038] shadow-md' : ''
      } ${completed ? 'border-[#21A038]' : ''} hover:shadow-lg`}
    >
      <div
        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
          active || completed ? 'bg-[#21A038]/10' : 'bg-[#0F2B5B]/10'
        }`}
      >
        {icon}
      </div>
      <div
        className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full ${
          completed ? 'bg-[#21A038]' : 'bg-[#0F2B5B]'
        } text-white`}
      >
        {completed ? '✓' : number}
      </div>
      <h3 className="mt-4 mb-2 text-xl font-bold text-[#0F2B5B]">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  )
}
