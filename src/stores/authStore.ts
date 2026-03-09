import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiClient } from '../services/api'

interface User {
  id: number
  email: string
  name: string
  role: 'admin' | 'doctor'
  doctorId?: number | null
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isDoctor = computed(() => user.value?.role === 'doctor')

  const initializeAuth = () => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
    }
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.login(email, password)
      token.value = response.accessToken
      user.value = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        role: response.user.role,
        doctorId: response.user.doctorId ?? null,
      }
      localStorage.setItem('token', response.accessToken)
      localStorage.setItem('user', JSON.stringify(user.value))
    } catch (err: any) {
      error.value = err.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const signup = async (email: string, password: string, name: string, role: 'admin' | 'doctor') => {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.signup(email, password, name, role)
      token.value = response.accessToken
      user.value = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        role: response.user.role,
        doctorId: response.user.doctorId ?? null,
      }
      localStorage.setItem('token', response.accessToken)
      localStorage.setItem('user', JSON.stringify(user.value))
    } catch (err: any) {
      error.value = err.message || 'Signup failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    isDoctor,
    initializeAuth,
    login,
    signup,
    logout,
  }
})
