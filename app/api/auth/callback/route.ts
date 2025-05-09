import { NextResponse } from 'next/server';

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.NEXT_PUBLIC_LINE_CALLBACK_URL || '',
        client_id: process.env.NEXT_PUBLIC_LINE_CHANNEL_ID || '',
        client_secret: process.env.LINE_CHANNEL_SECRET || '',
      }),
    });

    const tokenData = await tokenResponse.json();
    console.log(tokenData);

    if (!tokenData.access_token) {
      throw new Error('Failed to get access token');
    }

    // 取得 LINE Profile
    const profileResponse = await fetch('https://api.line.me/v2/profile', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });
    const profileData = await profileResponse.json();
    console.log(profileData);

    // 解析 id_token 取得 email
    let email = undefined;
    if (tokenData.id_token) {
      const idPayload = parseJwt(tokenData.id_token);
      if (idPayload && idPayload.email) {
        email = idPayload.email;
      }
    }
    console.log(email);

    // 將用戶資料與 email 存儲在 cookie 中
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.set('user_profile', JSON.stringify({ ...profileData, email }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('LINE login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
} 
