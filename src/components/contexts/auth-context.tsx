'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

// Типы для данных пользователя от Сбер ID
interface SberUserData {
  iss: string
  sub: string
  aud: string
  birthdate: string
  email: string
  family_name: string
  given_name: string
  phone_number: string
  // Дополнительные поля, которые могут быть в ответе
  middle_name?: string
  gender?: 'male' | 'female'
  verified?: boolean
}

interface AuthContextType {
  accessToken: string | null
  userData: SberUserData | null
  setAuthData: (token: string, user: SberUserData) => void
  clearAuthData: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sberAccessToken')
    }
    return null
  })

  const [userData, setUserData] = useState<SberUserData | null>(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('sberUserData')
      return data ? JSON.parse(data) : null
    }
    return null
  })

  const setAuthData = (token: string, user: SberUserData) => {
    setAccessToken(token)
    setUserData(user)
    localStorage.setItem('sberAccessToken', token)
    localStorage.setItem('sberUserData', JSON.stringify(user))
  }

  const clearAuthData = () => {
    setAccessToken(null)
    setUserData(null)
    localStorage.removeItem('sberAccessToken')
    localStorage.removeItem('sberUserData')
  }

  return (
    <AuthContext.Provider
      value={{ accessToken, userData, setAuthData, clearAuthData }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
