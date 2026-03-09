<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-10">
        <div class="inline-block bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl p-3 mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">Join MediScript</h1>
        <p class="text-gray-600 text-base">Create your account to get started</p>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
          </svg>
          {{ errorMessage }}
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg text-sm">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
          </svg>
          {{ successMessage }}
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSignup" class="space-y-5">
        <!-- Name Field -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2.5">Full Name</label>
          <div class="relative">
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:bg-white focus:border-purple-500 focus:outline-none transition duration-200 placeholder-gray-400"
              placeholder="John Doe"
            />
            <svg class="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
        </div>

        <!-- Email Field -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2.5">Email Address</label>
          <div class="relative">
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:bg-white focus:border-purple-500 focus:outline-none transition duration-200 placeholder-gray-400"
              placeholder="your@email.com"
            />
            <svg class="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>

        <!-- Role Selection -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2.5">Account Type</label>
          <div class="relative">
            <select
              v-model="form.role"
              class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:bg-white focus:border-purple-500 focus:outline-none transition duration-200 appearance-none cursor-pointer font-medium"
            >
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
            <svg class="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>

        <!-- Password Field -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2.5">Password</label>
          <div class="relative">
            <input
              v-model="form.password"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:bg-white focus:border-purple-500 focus:outline-none transition duration-200 placeholder-gray-400"
              placeholder="••••••••"
            />
            <svg class="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <p class="text-xs text-gray-500 mt-1.5">At least 6 characters</p>
        </div>

        <!-- Confirm Password Field -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2.5">Confirm Password</label>
          <div class="relative">
            <input
              v-model="form.confirmPassword"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:bg-white focus:border-purple-500 focus:outline-none transition duration-200 placeholder-gray-400"
              placeholder="••••••••"
            />
            <svg class="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-purple-400 disabled:to-indigo-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 disabled:scale-100"
        >
          <div v-if="loading" class="flex items-center justify-center gap-2">
            <svg class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Creating Account...
          </div>
          <div v-else>Create Account</div>
        </button>
      </form>

      <!-- Divider -->
      <div class="relative my-8">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t-2 border-gray-200"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="px-3 bg-white text-sm font-medium text-gray-600">Already registered?</span>
        </div>
      </div>

      <!-- Sign In Link -->
      <router-link to="/login" class="w-full block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg transition duration-200">
        Sign In Instead
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'doctor' as 'doctor' | 'admin'
})

const handleSignup = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  // Validation
  if (!form.value.name.trim()) {
    errorMessage.value = 'Name is required'
    return
  }

  if (!form.value.email.includes('@')) {
    errorMessage.value = 'Please enter a valid email'
    return
  }

  if (form.value.password.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters'
    return
  }

  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  loading.value = true
  try {
    await authStore.signup(
      form.value.email,
      form.value.password,
      form.value.name,
      form.value.role
    )
    successMessage.value = 'Account created successfully! Redirecting...'
    setTimeout(() => {
      router.push(authStore.isAdmin ? '/admin/dashboard' : '/doctor/dashboard')
    }, 1500)
  } catch (error: any) {
    errorMessage.value = error.message || 'Signup failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Component styles */
</style>
