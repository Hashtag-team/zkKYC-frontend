import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'zkKYC',
  projectId: 'zkKYC-frontend',
  chains: [
    // mainnet,
    // polygon,
    // optimism,
    // arbitrum,
    // base,
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
    sepolia,
  ],
  ssr: true,
})
