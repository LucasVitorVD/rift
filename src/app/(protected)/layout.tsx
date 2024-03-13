"use client"

import AuthGuard from "@/components/auth-guard/AuthGuard"
import Loader from "@/components/loader/Loader"
import { useAuthContext } from "@/context/AuthContext"
import { SpotifyContextProvider } from "@/context/SpotifyContext"

interface ProtectedLayoutProps {
  children: React.ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { user, loading } = useAuthContext()

  if (loading) { 
    return (
      <div className="grid place-items-center mt-8">
        <Loader />
      </div>  
    )
  }

  if (!user) {return <AuthGuard />}
  
  return (
    <SpotifyContextProvider>
      {children}
    </SpotifyContextProvider>
  )
}