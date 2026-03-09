const API_URL = 'http://localhost:3000'

export interface User {
  id: number
  email: string
  password: string
  name: string
  role: 'doctor' | 'patient'
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: Omit<User, 'password'>
  token?: string
}

// Login - Find user by email and verify password
export async function login(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/users?email=${email}`)
    
    if (!response.ok) {
      return { success: false, message: 'Network error' }
    }

    const users: User[] = await response.json()
    
    if (users.length === 0) {
      return { success: false, message: 'User not found' }
    }

    const user = users[0]
    
    if (!user || user.password !== password) {
      return { success: false, message: 'Invalid password' }
    }

    // Store user info in localStorage
    const userWithoutPassword = { id: user.id, email: user.email, name: user.name, role: user.role }
    localStorage.setItem('user', JSON.stringify(userWithoutPassword))
    localStorage.setItem('token', `token_${user.id}_${Date.now()}`)

    return {
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      token: `token_${user.id}_${Date.now()}`
    }
  } catch (error) {
    return { success: false, message: 'An error occurred during login' }
  }
}

// Signup - Create new user
export async function signup(email: string, password: string, name: string, role: 'doctor' | 'patient'): Promise<AuthResponse> {
  try {
    // Check if user already exists
    const existingResponse = await fetch(`${API_URL}/users?email=${email}`)
    const existingUsers: User[] = await existingResponse.json()

    if (existingUsers.length > 0) {
      return { success: false, message: 'Email already registered' }
    }

    // Create new user
    const newUser: Omit<User, 'id'> = {
      email,
      password,
      name,
      role
    }

    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })

    if (!response.ok) {
      return { success: false, message: 'Failed to create account' }
    }

    const createdUser: User = await response.json()
    const userWithoutPassword = { id: createdUser.id, email: createdUser.email, name: createdUser.name, role: createdUser.role }

    // Store user info in localStorage
    localStorage.setItem('user', JSON.stringify(userWithoutPassword))
    localStorage.setItem('token', `token_${createdUser.id}_${Date.now()}`)

    return {
      success: true,
      message: 'Account created successfully',
      user: userWithoutPassword,
      token: `token_${createdUser.id}_${Date.now()}`
    }
  } catch (error) {
    return { success: false, message: 'An error occurred during signup' }
  }
}

// Logout - Clear stored user data
export function logout(): void {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

// Get current user
export function getCurrentUser(): Omit<User, 'password'> | null {
  const userStr = localStorage.getItem('user')
  return userStr ? JSON.parse(userStr) : null
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token')
}
