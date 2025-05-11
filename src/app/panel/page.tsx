'use client'

import { useUserRoles } from '@/lib/web3/roles'
import { useAccount } from 'wagmi'
import { AdminContent } from './_components/admin-content'
import { VerificatorContent } from './_components/verificator-content'

export default function PanelPage() {
  const { isConnected, address } = useAccount()

  const { isAdmin, isVerifier } = useUserRoles(address)

  return (
    <main className="flex-1">
      <div className="container">
        <section className="relative overflow-hidden bg-white py-16 md:py-24">
          {!isConnected && <h1>Авторизуйтесь через кошелек для продолжения</h1>}

          {isAdmin && <AdminContent className="mb-10 border-b pb-10" />}
          {isVerifier && <VerificatorContent />}
        </section>
      </div>
    </main>
  )
}
