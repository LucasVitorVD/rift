"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  signInWithRedirect, 
  signOut, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '@/firebase/config';

interface AuthContextType {
  user: User | null
  loading: boolean
  googleSignIn: () => void
  signIn: (email: string, password: string) => void
  signUp: (email: string, password: string) => void
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

  const signIn = async (email: string, password: string) => {    
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error
    }
  }

  const logOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, googleSignIn, logOut, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  
  return context;
};