import '@testing-library/jest-dom'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import SignInForm from '@/components/form/SignInForm'
import { AuthContextProvider } from '@/context/AuthContext'
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter, useSearchParams } from 'next/navigation'

jest.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn((auth, callback) => {
    const unsubscribe = jest.fn();
    callback()
    return unsubscribe;
  }),
}));

jest.mock('next/navigation', () => {
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

const MockSignInForm = () => {
  return (
    <AuthContextProvider>
      <SignInForm />
    </AuthContextProvider>
  )
}

describe("SignIn form component", () => {
  it("should render form", () => {
    const { queryByRole } = render(<MockSignInForm />)

    const button = queryByRole("signInButton")

    expect(button).toBeInTheDocument()
  })

  it("should render validation errors if inputs values are not correct", async () => {
    const { queryAllByTestId, queryByRole } = render(<MockSignInForm />)

    const inputs = queryAllByTestId("signInInput")

    expect(inputs).toHaveLength(2)

    const button = queryByRole("signInButton")!

    fireEvent.click(button)

    await waitFor(() => {
      const errors = queryAllByTestId("validationErrorMessage");
      expect(errors).toHaveLength(inputs.length);
    })

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(0)
  })

  it("should not render validation errors if inputs value are correct", async () => {
    const { queryAllByTestId, queryByRole } = render(<MockSignInForm />)

    const inputs = queryAllByTestId("signInInput")

    expect(inputs).toHaveLength(2)

    fireEvent.input(inputs[0], { target: { value: "email@gmail.com" } })
    fireEvent.input(inputs[1], { target: { value: "password124" } })

    const button = queryByRole("signInButton")!

    fireEvent.click(button)

    await waitFor(() => {
      const errors = queryAllByTestId("validationErrorMessage");
      expect(errors).toHaveLength(0);
    })
  })
})