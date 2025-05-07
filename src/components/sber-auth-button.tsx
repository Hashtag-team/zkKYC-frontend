'use client'
import { useEffect, useRef } from 'react'
import { SberidSDK } from '@sberid/js-sdk'
import '@sberid/js-sdk/dist/styles/common.css'

export const SberAuthButton = () => {
  const sberid = useRef<SberidSDK | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const generateRandomString = () => {
      return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      )
    }

    sberid.current = new SberidSDK({
      container: '#sber-id-button-container',
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
      display: 'popup',
      onSuccessCallback: (result) => {
        console.log('Auth success:', result)
        window.location.href = '/profile'
      },
      onErrorCallback: (error) => {
        console.error('Auth error:', error)
        alert('Ошибка авторизации')
      },
    })

    sberid.current.enable()

    return () => {
      sberid.current?.disable()
    }
  }, [])

  return <div id="sber-id-button-container"></div>
}
