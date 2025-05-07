'use client'

import type React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { config } from '@/lib/web3/wagmi'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          locale="ru-RU"
          theme={lightTheme({
            accentColor: '#21A038', // Основной цвет кнопки (синий)
            accentColorForeground: 'white', // Цвет текста кнопки
            borderRadius: 'medium',
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
