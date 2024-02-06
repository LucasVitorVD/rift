import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Home from '../app/page'
 
describe('Home page', () => {
  it('renders a heading', () => {
    const { getByRole } = render(<Home />)
 
    const heading = getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})