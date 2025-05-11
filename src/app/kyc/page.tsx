'use client'

import https from 'https'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import {
  Award,
  CheckCircle,
  RefreshCw,
  ShieldQuestion,
  User,
  Wallet,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { StepCard } from '@/components/step-card'
import { ABI } from '@/lib/web3/abi'
import { CONTRACT_ADDRESS } from '@/lib/web3/constants'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ProfileData, UserResponse } from '@/lib/api/types'
import { QUERY_KEYS } from '@/lib/api/query-keys'
import axiosInstance from '@/lib/api/instance'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'

const SberAuthButton = dynamic(
  () =>
    import('@/components/sber-auth-button').then((mod) => mod.SberAuthButton),
  {
    ssr: false,
  },
)

interface UserData {
  firstName?: string
  lastName?: string
  age?: number | string
  did?: string
  birthDate?: string // Добавляем поле для даты рождения в ISO формате
  gender?: 'F' | 'M' // Добавляем поле для пола
}

// Тип по которому проверяем веревецирванный у пользователя NFT или нет
const CLAIM_TYPE = 'verify'

export default function VerificationPage() {
  const searchParams = useSearchParams()
  const { writeContractAsync } = useWriteContract()

  const { isConnected, address } = useAccount()

  const [currentStep, setCurrentStep] = useState(1)
  const [userData, setUserData] = useState<UserData | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDataVerified, setIsDataVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Generate random user data
  const generateRandomUserData = (): UserData => {
    const firstNames = [
      'Александр',
      'Иван',
      'Сергей',
      'Дмитрий',
      'Михаил',
      'Андрей',
      'Николай',
      'Владимир',
    ]
    const lastNames = [
      'Иванов',
      'Смирнов',
      'Кузнецов',
      'Попов',
      'Васильев',
      'Петров',
      'Соколов',
      'Михайлов',
    ]

    const randomFirstName =
      firstNames[Math.floor(Math.random() * firstNames.length)]
    const randomLastName =
      lastNames[Math.floor(Math.random() * lastNames.length)]
    const randomAge = Math.floor(Math.random() * (65 - 18) + 18)

    // Генерация случайной даты рождения на основе возраста
    const currentYear = new Date().getFullYear()
    const birthYear = currentYear - randomAge
    const birthMonth = Math.floor(Math.random() * 12) + 1
    const birthDay = Math.floor(Math.random() * 28) + 1 // Упрощаем, не учитываем февраль и месяцы с 31 днем

    // Форматируем дату в ISO строку
    const birthDate = new Date(
      birthYear,
      birthMonth - 1,
      birthDay,
    ).toISOString()

    // Случайный выбор пола
    const gender = 'M'

    return {
      firstName: randomFirstName,
      lastName: randomLastName,
      age: randomAge,
      birthDate,
      gender,
    }
  }

  // Handle Sber ID authorization
  // const handleSberIdAuth = () => {
  //   setUserData(generateRandomUserData())
  //   setIsDataVerified(true)
  //   setCurrentStep(3)
  // }

  // Handle regenerating user data
  const handleRegenerateData = () => {
    setUserData(generateRandomUserData())
  }

  // Handle NFT issuance
  const handleIssueNFT = async () => {
    if (!userData?.did) {
      alert('Данные не были загружены.')
      return
    }

    const result = await writeContractAsync({
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: 'createDID',
      args: [userData?.did],
    })
    console.log(result)

    setCurrentStep(4)
  }

  // send user data to backend
  const { mutate, isPending: isPendingSendUserData } = useMutation<
    UserResponse,
    Error,
    ProfileData
  >({
    mutationFn: async (userData) => {
      const { data } = await axiosInstance.post('/user', userData)
      return data
    },
    // Опциональные параметры для обработки состояний мутации
    onSuccess: (data) => {
      console.log('Profile saved successfully:', data)
      setCurrentStep(4)
    },
    onError: (error) => {
      console.error('Error saving profile:', error)
      // Здесь можно добавить обработку ошибок, например показ toast-уведомления
    },
  })

  // get user data from backend
  const { data: userFromBackend } = useQuery<UserResponse, Error>({
    queryKey: [QUERY_KEYS.USER_DID, address],
    queryFn: async () => {
      if (!address) throw new Error('Address is required')
      const response = await axiosInstance.get<UserResponse>(`/user/${address}`)

      if (response.status === 404) {
        console.error('User not found')
      }

      if (response.data.did) {
        setUserData({
          firstName: 'Засекречено',
          lastName: 'Засекречено',
          age: 'Засекречено',
          did: response.data.did,
        })
        setCurrentStep(4)
      }
      return response.data
    },

    enabled: !!address, // Запрос выполнится только если address существует
    retry: false, // Не повторять запрос при 404 ошибке
  })

  const handleSaveUserData = () => {
    mutate({
      birth_date: userData?.birthDate || '1990-12-27T12:59:04Z',
      full_name: `${userData?.firstName} ${userData?.lastName}`,
      eth_address: address!,
      gender: userData?.gender || 'M',
    })
  }

  //   Получение DID юзера, если он у него уже есть
  const { data: userDID } = useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'getDIDByAddress',
    args: [address!],
    query: {
      enabled: isConnected,
    },
  })

  //   Получение DID юзера, если он у него уже есть
  const { data: checkUserNFTIsVerified } = useReadContract({
    abi: ABI,
    address: CONTRACT_ADDRESS,
    functionName: 'hasValidClaim',
    args: [userData?.did as string, CLAIM_TYPE],
    query: {
      enabled: !!userData?.did,
    },
  })

  useEffect(() => {
    // Move to next step when wallet is connected
    if (isConnected && currentStep === 1) {
      setCurrentStep(2)
    }

    if (isConnected && userDID) {
      setCurrentStep(5)
    }
  }, [isConnected, currentStep, userDID])

  // Эффект для обработки авторизации при монтировании
  useEffect(() => {
    const handleSberAuth = async () => {
      const code = searchParams.get('code')
      const state = searchParams.get('state')

      console.log(state)

      if (!code) return

      setIsLoading(true)
      try {
        // Шаг 1: Получаем данные юзера по токену от Сбера
        const httpsAgent = new https.Agent({
          cert: process.env.NEXT_PUBLIC_SBER_CERT,
          key: process.env.NEXT_PUBLIC_SBER_CERT_KEY,
          passphrase: 'Block4ain!',
        })

        const userInfo = await axios.post(
          'https://oauth-ift.sber.ru/ru/prod/tokens/v2/oidc',
          new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            client_id: process.env.NEXT_PUBLIC_SBER_CLIENT_ID!,
            client_secret: process.env.NEXT_PUBLIC_SBER_CLIENT_SECRET!,
            redirect_uri: `${window.location.origin}/kyc`,
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Accept: 'application/json',
              rquid: Math.random().toString(36).substring(7),
            },
            httpsAgent,
          },
        )

        console.log('Получены данные юзера: ', userInfo)

        // Шаг 3: Сохраняем данные
        const userData = {
          firstName: userInfo.data.given_name,
          lastName: userInfo.data.family_name,
          birthDate: new Date(
            userInfo.data.birthdate.split('.').reverse().join('-'),
          ).toISOString(),
          gender: 'M' as UserData['gender'], // Заглушка, нужно получить из API
        }

        // Сохраняем в локальное хранилище
        localStorage.setItem('sberAuthData', JSON.stringify(userData))

        // Обновляем состояние
        setUserData(userData)
        setIsDataVerified(true)
        setCurrentStep(3)
      } catch (error) {
        console.error('Sber auth failed:', error)
        alert('Ошибка авторизации через Сбер ID')
      } finally {
        setIsLoading(false)
      }
    }

    // Проверяем сохраненные данные при загрузке
    const savedData = localStorage.getItem('sberAuthData')
    if (savedData) {
      setUserData(JSON.parse(savedData))
      setIsDataVerified(true)
      setCurrentStep(3)
      return
    }

    handleSberAuth()
  }, [])

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="rounded-lg bg-white p-8">
              Идет авторизация через Сбер ID...
            </div>
          </div>
        )}
        <div className="container max-w-6xl">
          <h1 className="mb-12 text-center text-3xl font-bold tracking-tighter text-[#0F2B5B] sm:text-4xl">
            {!userDID ? (
              'Верификация пользователя'
            ) : (
              <span>DID пользователя: {userDID}</span>
            )}
          </h1>

          {/* Verification Process */}
          <div className="mx-auto mb-16 max-w-2xl">
            {currentStep === 1 && (
              <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="mb-6 text-xl font-semibold text-[#0F2B5B]">
                  Шаг 1: Подключите ваш кошелек
                </h3>
                <div className="flex justify-center">
                  <ConnectButton />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="mb-6 text-xl font-semibold text-[#0F2B5B]">
                  Шаг 2: Авторизация через Сбер ID
                </h3>
                <p className="mb-6 text-gray-600">
                  Для продолжения процесса верификации, пожалуйста,
                  авторизуйтесь через Сбер ID.
                </p>
                <div className="flex justify-center">
                  <SberAuthButton />
                </div>
              </div>
            )}

            {currentStep === 3 && userData && (
              <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="mb-6 text-xl font-semibold text-[#0F2B5B]">
                  Шаг 3: Проверка данных
                </h3>
                <Card className="mb-6 p-6">
                  <h4 className="mb-4 text-lg font-medium">
                    Данные пользователя:
                  </h4>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Имя:</span>{' '}
                      {userData.firstName}
                    </p>
                    <p>
                      <span className="font-medium">Фамилия:</span>{' '}
                      {userData.lastName}
                    </p>
                    <p>
                      <span className="font-medium">Возраст:</span>{' '}
                      {userData.age}
                    </p>
                    {userData.did && (
                      <p>
                        <span className="font-medium">DID:</span> {userData.did}
                      </p>
                    )}
                  </div>
                  {!userFromBackend && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 flex items-center gap-2"
                      onClick={handleRegenerateData}
                    >
                      <RefreshCw className="h-4 w-4" />
                      Сгенерировать новые данные
                    </Button>
                  )}
                </Card>
                <div className="flex justify-center">
                  <Button
                    onClick={handleSaveUserData}
                    disabled={isPendingSendUserData}
                    className="bg-[#21A038] hover:bg-[#21A038]/90"
                  >
                    Подтвердить данные
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                <div className="text-center">
                  <h3 className="mb-2 text-xl font-semibold text-[#0F2B5B]">
                    Почти готово!
                  </h3>
                  <div className="flex justify-center">
                    <Button
                      onClick={handleIssueNFT}
                      className="bg-[#21A038] hover:bg-[#21A038]/90"
                    >
                      Mint NFT
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                {!checkUserNFTIsVerified ? (
                  <div className="text-center">
                    <ShieldQuestion className="mx-auto mb-4 h-16 w-16 text-[#21A038]" />
                    <h3 className="mb-2 text-xl font-semibold text-[#0F2B5B]">
                      Поздравляем!
                    </h3>
                    <p className="mb-6 text-gray-600">
                      Ваш NFT с zkKYC успешно выпущен, вы уже можете увидеть его
                      в вашем кошльке. Но полноценно использовать его можно
                      только после подтверждения регулятором, обычно эта
                      процедура занимает около 24 часов.
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Award className="mx-auto mb-4 h-16 w-16 text-[#21A038]" />
                    <h3 className="mb-2 text-xl font-semibold text-[#0F2B5B]">
                      Верификация пройдена!
                    </h3>
                    <p className="mb-6 text-gray-600">
                      Ваш NFT с zkKYC выпущен и успешно прошел верификацию.
                      Теперь вы можете использовать его на других проектах.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Steps Section */}
          <div>
            <h2 className="mb-12 text-center text-2xl font-bold tracking-tighter text-[#0F2B5B] sm:text-3xl">
              Как пройти верификацию
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <StepCard
                number={1}
                title="Подключите свой кошелек"
                description="Используйте свой Web3 кошелек для безопасного подключения к системе"
                icon={<Wallet className="h-10 w-10 text-[#21A038]" />}
                active={currentStep === 1}
                completed={currentStep > 1}
              />
              <StepCard
                number={2}
                title="Авторизация через Сбер ID"
                description="Подтвердите свою личность через Сбер ID для верификации"
                icon={<User className="h-10 w-10 text-[#21A038]" />}
                active={currentStep === 2}
                completed={currentStep > 2}
              />
              <StepCard
                number={3}
                title="Проверка данных"
                description="Проверьте корректность ваших персональных данных"
                icon={<CheckCircle className="h-10 w-10 text-[#21A038]" />}
                active={currentStep === 3}
                completed={currentStep > 3}
              />
              <StepCard
                number={4}
                title="Выпустите NFT с zkKYC"
                description="Получите уникальный NFT-сертификат, подтверждающий вашу верификацию"
                icon={<Award className="h-10 w-10 text-[#21A038]" />}
                active={currentStep === 4}
                completed={currentStep > 4}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
