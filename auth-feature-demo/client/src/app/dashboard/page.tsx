"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { LogoutButton } from "@/components/auth/LogoutButton";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Auth Demo</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user.username}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome back, {user.username}! 👋
          </h2>

          <p className="text-gray-600 mb-6">
            You are successfully logged in.
          </p>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-4">Account Info</h3>
            <dl className="space-y-2">
              <div className="flex">
                <dt className="w-24 text-gray-500">Username:</dt>
                <dd className="text-gray-900">{user.username}</dd>
              </div>
              <div className="flex">
                <dt className="w-24 text-gray-500">Email:</dt>
                <dd className="text-gray-900">{user.email}</dd>
              </div>
              <div className="flex">
                <dt className="w-24 text-gray-500">User ID:</dt>
                <dd className="text-gray-900 text-sm font-mono">{user.id}</dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}
