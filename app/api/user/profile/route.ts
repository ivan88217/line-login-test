import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const userProfile = cookieStore.get('user_profile');

  if (!userProfile) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const profile = JSON.parse(userProfile.value);
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid profile data' }, { status: 400 });
  }
} 
