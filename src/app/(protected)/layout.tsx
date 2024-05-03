"use client"

import AuthGuard from "@/components/auth-guard/AuthGuard"
import Loader from "@/components/loader/Loader"
import { SpotifyContextProvider } from "@/context/SpotifyContext"
import { useSession } from "next-auth/react"

interface ProtectedLayoutProps {
  children: React.ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const session = useSession()
  
  if (session.status === "loading") { 
    return (
      <div className="grid place-items-center mt-8">
        <Loader />
      </div>  
    )
  }

  if (session.status === "unauthenticated") {return <AuthGuard />}
  
  return (
    <SpotifyContextProvider>
      {children}
    </SpotifyContextProvider>
  )
}