'use client';

import { LineLoginButton } from './components/LineLoginButton';
import { useEffect, useState } from 'react';

interface UserProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

export default function Home() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">歡迎使用 LINE 登入</h1>
        
        {userProfile ? (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              {userProfile.pictureUrl && (
                <img
                  src={userProfile.pictureUrl}
                  alt={userProfile.displayName}
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">{userProfile.displayName}</h2>
                {userProfile.statusMessage && (
                  <p className="text-gray-600">{userProfile.statusMessage}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <LineLoginButton />
          </div>
        )}
      </div>
    </main>
  );
}
