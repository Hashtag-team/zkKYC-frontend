import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(`/?error=${error}`)
  }

  if (!code) {
    return NextResponse.redirect('/?error=no_code')
  }

  try {
    // Обмен кода на токен
    const tokenResponse = await fetch('https://oidc.sberid.ru/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_SBER_ID_CLIENT_ID!,
        client_secret: process.env.SBER_ID_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.NEXT_PUBLIC_SBER_ID_REDIRECT_URI!,
      }),
    })

    const tokens = await tokenResponse.json()

    // Сохраняем токен в куки
    // TODO: Тут нужно потом редиректить юзера на страницу с отображением его данных
    const response = NextResponse.redirect('/')
    response.cookies.set('sber_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })

    return response
  } catch (err) {
    console.error('Ошибка callback:', err)
    return NextResponse.redirect('/?error=auth_failed')
  }
}
