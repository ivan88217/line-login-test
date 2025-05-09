"use client";
import { useCallback } from "react";

export function LogoutButton() {
  const handleLogout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  }, []);

  return (
    <button
      className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 mt-4"
      onClick={handleLogout}
    >
      登出
    </button>
  );
} 
