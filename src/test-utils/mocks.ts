import { jest } from '@jest/globals';
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter, useSearchParams } from 'next/navigation'

export const setupFirebaseAuthMocks = () => {
  return jest.mock("firebase/auth", () => ({
    signInWithEmailAndPassword: jest.fn(),
    getAuth: jest.fn(),
    onAuthStateChanged: jest.fn((auth, callback: any) => {
      const unsubscribe = jest.fn();
      callback();
      return unsubscribe;
    }),
  }));
};

export const setupNextRouterMocks = () => {
  return jest.mock('next/navigation', () => {
    return {
      __esModule: true,
      usePathname: () => ({ pathname: '' }),
      useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn()
      }),
      useSearchParams: () => ({ get: () => {} }),
      useServerInsertedHTML: jest.fn()
    };
  });
};