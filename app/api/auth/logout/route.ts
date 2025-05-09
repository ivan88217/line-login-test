import { NextResponse } from "next/server";

export async function POST() {
  // 刪除 user_profile cookie
  const response = NextResponse.json({ success: true });
  response.cookies.set("user_profile", "", { maxAge: 0 });
  return response;
} 
