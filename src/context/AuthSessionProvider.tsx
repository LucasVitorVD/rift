"use client"

import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode
}

export default function AuthSessionProvider({ children }: Props) {
  return (
    <SessionProvider basePath="/api/users">
      {children}
    </SessionProvider>
  )
}