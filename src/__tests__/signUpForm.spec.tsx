import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import SignUpForm from '@/components/form/SignUpForm'
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

const MockSignUpForm = () => {
  return (
    <AuthContextProvider>
      <SignUpForm />
    </AuthContextProvider>
  )
}

describe("SignUp form component", () => {
  it("should render form", () => {
    const { queryByRole } = render(<MockSignUpForm />)

    const button = queryByRole("button", { name: "Criar conta" })

    expect(button).toBeInTheDocument()
  })

  it("should render validation errors if inputs values are not correct", async () => {
    const { queryAllByTestId, queryByRole } = render(<MockSignUpForm />)

    const inputs = queryAllByTestId("signUpInput")

    expect(inputs).toHaveLength(3)

    const button = queryByRole("button", { name: "Criar conta" })!

    fireEvent.click(button)

    await waitFor(() => {
      const errors = queryAllByTestId("validationErrorMessage");
      expect(errors).toHaveLength(inputs.length);
    })
  })

  it("should render validation error if password inputs value are not the same", async () => {
    const { queryAllByTestId, queryByRole } = render(<MockSignUpForm />)

    const inputs = queryAllByTestId("signUpInput")

    expect(inputs).toHaveLength(3)

    fireEvent.input(inputs[0], { target: { value: "email@gmail.com" } })
    fireEvent.input(inputs[1], { target: { value: "password124" } })
    fireEvent.input(inputs[2], { target: { value: "password100" } })

    const button = queryByRole("button", { name: "Criar conta" })!

    fireEvent.click(button)

    await waitFor(() => {
      const errors = queryAllByTestId("validationErrorMessage");
      expect(errors).toHaveLength(1);
    })
  })

  it("should not render validation errors if inputs value are correct", async () => {
    const { queryAllByTestId, queryByRole } = render(<MockSignUpForm />)

    const inputs = queryAllByTestId("signUpInput")

    expect(inputs).toHaveLength(3)

    fireEvent.input(inputs[0], { target: { value: "email@gmail.com" } })
    fireEvent.input(inputs[1], { target: { value: "password124" } })
    fireEvent.input(inputs[2], { target: { value: "password124" } })

    const button = queryByRole("button", { name: "Criar conta" })!

    fireEvent.click(button)

    await waitFor(() => {
      const errors = queryAllByTestId("validationErrorMessage");
      expect(errors).toHaveLength(0);
    })
  })
})