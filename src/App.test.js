import React from 'react'
import jest from 'jest'
import { render, screen } from '@testing-library/react'
import App from './App'

jest.test('renders learn react link', () => {
    render(<App />)
    const linkElement = screen.getByText(/learn react/i)
    jest.expect(linkElement).toBeInTheDocument()
})
