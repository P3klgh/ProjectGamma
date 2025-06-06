import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { Navbar } from '../../components/Navbar'
import { AuthProvider } from '../../hooks/useAuth'

// Mock the auth service
vi.mock('../../services/authService', () => ({
  authService: {
    login: vi.fn(),
    register: vi.fn(),
  },
}))

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

const renderNavbar = (initialUser = null) => {
  // Mock localStorage based on user state
  if (initialUser) {
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'token') return 'mock-token'
      if (key === 'user') return JSON.stringify(initialUser)
      return null
    })
  } else {
    localStorageMock.getItem.mockReturnValue(null)
  }

  return render(
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('When user is not authenticated', () => {
    it('should render login and sign up links', () => {
      renderNavbar()
      
      expect(screen.getByText('ProjectGamma')).toBeInTheDocument()
      expect(screen.getByText('Login')).toBeInTheDocument()
      expect(screen.getByText('Sign Up')).toBeInTheDocument()
    })

    it('should not render dashboard and profile links', () => {
      renderNavbar()
      
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
      expect(screen.queryByText('Profile')).not.toBeInTheDocument()
      expect(screen.queryByText('Logout')).not.toBeInTheDocument()
    })

    it('should have correct link attributes', () => {
      renderNavbar()
      
      const loginLink = screen.getByText('Login')
      const signUpLink = screen.getByText('Sign Up')
      
      expect(loginLink.closest('a')).toHaveAttribute('href', '/login')
      expect(signUpLink.closest('a')).toHaveAttribute('href', '/register')
    })
  })

  describe('When user is authenticated', () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
    }

    it('should render dashboard and profile links', () => {
      renderNavbar(mockUser)
      
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Profile')).toBeInTheDocument()
      expect(screen.getByText('Logout')).toBeInTheDocument()
    })

    it('should display user greeting', () => {
      renderNavbar(mockUser)
      
      expect(screen.getByText('Hello, John')).toBeInTheDocument()
    })

    it('should not render login and sign up links', () => {
      renderNavbar(mockUser)
      
      expect(screen.queryByText('Login')).not.toBeInTheDocument()
      expect(screen.queryByText('Sign Up')).not.toBeInTheDocument()
    })

    it('should have correct authenticated link attributes', () => {
      renderNavbar(mockUser)
      
      const dashboardLink = screen.getByText('Dashboard')
      const profileLink = screen.getByText('Profile')
      
      expect(dashboardLink.closest('a')).toHaveAttribute('href', '/dashboard')
      expect(profileLink.closest('a')).toHaveAttribute('href', '/profile')
    })

    it('should call logout when logout button is clicked', () => {
      renderNavbar(mockUser)
      
      const logoutButton = screen.getByText('Logout')
      fireEvent.click(logoutButton)
      
      // After logout, should show login/signup links
      expect(screen.getByText('Login')).toBeInTheDocument()
      expect(screen.getByText('Sign Up')).toBeInTheDocument()
    })
  })

  describe('Brand link', () => {
    it('should always render ProjectGamma brand link', () => {
      renderNavbar()
      
      const brandLink = screen.getByText('ProjectGamma')
      expect(brandLink).toBeInTheDocument()
      expect(brandLink.closest('a')).toHaveAttribute('href', '/')
    })

    it('should have correct styling classes', () => {
      renderNavbar()
      
      const brandLink = screen.getByText('ProjectGamma')
      expect(brandLink).toHaveClass('text-xl', 'font-bold', 'text-gray-800')
    })
  })
}) 