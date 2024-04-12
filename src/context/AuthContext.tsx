"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  signInWithRedirect, 
  signOut, 
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '@/firebase/config';

interface AuthContextType {
  user: User | null
  loading: boolean
  googleSignIn: () => void
  logOut: () => void
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
  }

  const logOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      throw new Error("Erro ao fazer logout. Tente novamente mais tarde.")
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext)!
  
  return context;
};