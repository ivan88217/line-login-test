'use client';

import { Button } from "@/components/ui/button";

export const LineLoginButton = () => {
  const handleLineLogin = () => {
    const channelId = process.env.NEXT_PUBLIC_LINE_CHANNEL_ID;
    const redirectUri = process.env.NEXT_PUBLIC_LINE_CALLBACK_URL;
    const state = Math.random().toString(36).substring(7);
    
    const lineLoginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channelId}&redirect_uri=${redirectUri}&state=${state}&scope=profile%20openid%20email`;
    
    window.location.href = lineLoginUrl;
  };

  return (
    <Button
      onClick={handleLineLogin}
      className="bg-[#06C755] hover:bg-[#05a548] text-white"
    >
      使用 LINE 登入
    </Button>
  );
}; 
