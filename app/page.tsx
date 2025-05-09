"use client";

import { LineLoginButton } from "./components/LineLoginButton";
import { useEffect, useState } from "react";
import { LineTermsDialog } from "./components/LineTermsDialog";
import Image from "next/image";
import { LogoutButton } from "./components/LogoutButton";

interface UserProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

export default function Home() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/user/profile");
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          歡迎使用 LINE 登入
        </h1>

        {/* 使用者條約彈窗觸發按鈕 */}
        <div className="flex justify-center mb-6">
          <button
            className="px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
            onClick={() => setShowTerms(true)}
          >
            查看使用者條約
          </button>
        </div>
        <LineTermsDialog
          open={showTerms}
          onAgree={() => setShowTerms(false)}
        />

        {/* 主要內容 */}
        {userProfile ? (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              {userProfile.pictureUrl && (
                <Image
                  src={userProfile.pictureUrl}
                  alt={userProfile.displayName}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">
                  {userProfile.displayName}
                </h2>
                {userProfile.statusMessage && (
                  <p className="text-gray-600">{userProfile.statusMessage}</p>
                )}
              </div>
            </div>
            <LogoutButton />
          </div>
        ) : (
          <div className="flex justify-center">
            {/* 只有同意條約後才顯示登入按鈕 */}
            {!showTerms && <LineLoginButton />}
          </div>
        )}
      </div>
    </main>
  );
}
