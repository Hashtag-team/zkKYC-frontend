// app/api/sber-auth/route.ts
import { NextResponse } from 'next/server'
import https from 'https'
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  const RANDOM_RQUID = uuidv4().replace(/-/g, '')

  const { code } = await request.json()

  // Пути к сертификатам
  const certPath = path.join(process.cwd(), 'public', 'cert', 'certificate.crt')
  const keyPath = path.join(process.cwd(), 'public', 'cert', 'private.key')

  // Проверка существования файлов
  if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
    return NextResponse.json(
      { error: 'Certificate files not found' },
      { status: 500 },
    )
  }

  const httpsAgent = new https.Agent({
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath),
    rejectUnauthorized: false,
  })

  try {
    // 1. Получаем access token
    const tokenResponse = await axios.post(
      'https://oauth-ift.sber.ru/ru/prod/tokens/v2/oidc',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: process.env.NEXT_PUBLIC_SBER_ID_CLIENT_ID!,
        client_secret: process.env.SBER_ID_CLIENT_SECRET!,
        redirect_uri: process.env.NEXT_PUBLIC_SBER_ID_REDIRECT_URI!,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          rquid: RANDOM_RQUID,
        },
        httpsAgent,
      },
    )

    const { access_token } = tokenResponse.data

    // 2. Получаем данные пользователя
    const userInfoResponse = await axios.get(
      'https://oauth-ift.sber.ru/ru/prod/sberbankid/v2.1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'x-ibm-client-id': process.env.SBER_CLIENT_ID!,
          'x-introspect-rquid': RANDOM_RQUID,
        },
        httpsAgent,
      },
    )

    return NextResponse.json({
      accessToken: access_token,
      userData: userInfoResponse.data,
    })
  } catch (error) {
    console.error('Sber auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    )
  }
}
