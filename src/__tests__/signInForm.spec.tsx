import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import SignInForm from '@/components/form/SignInForm'

describe("SignIn form component", () => {
  it("should render form", () => {
    const { queryByRole } = render(<SignInForm />)

    const button = queryByRole("button", { name: "Entrar" })

    expect(button).toBeInTheDocument()
  })

  it("should render validation errors if inputs values are not correct", async () => {
    const { queryAllByTestId, queryByRole } = render(<SignInForm />)

    const inputs = queryAllByTestId("signInInput")

    expect(inputs).toHaveLength(2)

    const button = queryByRole("button", { name: "Entrar" })!

    fireEvent.click(button)

    await waitFor(() => {
      const errors = queryAllByTestId("validationErrorMessage");
      expect(errors).toHaveLength(inputs.length);
    })
  })

  it("should not render validation errors if inputs value are correct", async () => {
    const { queryAllByTestId, queryByRole } = render(<SignInForm />)

    const inputs = queryAllByTestId("signInInput")

    expect(inputs).toHaveLength(2)

    fireEvent.input(inputs[0], { target: { value: "email@gmail.com" } })
    fireEvent.input(inputs[1], { target: { value: "password124" } })

    const button = queryByRole("button", { name: "Entrar" })!

    fireEvent.click(button)

    await waitFor(() => {
      const errors = queryAllByTestId("validationErrorMessage");
      expect(errors).toHaveLength(0);
    })
  })
})