'use client'
import { useAuth } from '@/contexts/AuthContext'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import MainLayout from '@/components/Layout/MainLayout'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userProfile, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !userProfile) {
      redirect('/login')
    }
  }, [userProfile, isLoading])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!userProfile) {
    return null // Will redirect
  }

  return <MainLayout>{children}</MainLayout>
}