'use client'
import { useEffect, useRef, useState } from 'react'
import { SberidSDK } from '@sberid/js-sdk'
import '@sberid/js-sdk/dist/styles/common.css'

export const SberAuthButton = () => {
  const sberid = useRef<SberidSDK | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const generateRandomString = () => {
      return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      )
    }

    sberid.current = new SberidSDK({
      container: '#sber-id-button-container',
      baseUrl: 'https://id-ift.sber.ru',
      oidc: {
        response_type: 'code',
        client_type: 'PRIVATE',
        client_id: process.env.NEXT_PUBLIC_SBER_ID_CLIENT_ID!,
        redirect_uri: process.env.NEXT_PUBLIC_SBER_ID_REDIRECT_URI!,
        state: generateRandomString(),
        scope: 'openid',
        nonce: generateRandomString(),
      },
      sa: {
        enable: true,
        init: 'auto',
        clientId: process.env.NEXT_PUBLIC_SBER_ID_CLIENT_ID!,
        clientName: 'zkKYC Frontend',
      },
      display: 'page',
    })

    sberid.current.enable()

    return () => {
      sberid.current?.disable()
    }
  }, [mounted])

  return <div id="sber-id-button-container"></div>
}
