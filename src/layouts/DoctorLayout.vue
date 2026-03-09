<template>
  <div class="flex h-screen bg-gray-100 overflow-hidden">
    <!-- Mobile Menu Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      @click="isMobileMenuOpen = false"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <div class="p-6">
        <div class="flex items-center gap-3 mb-8">
          <div class="bg-gradient-to-br from-green-600 to-teal-600 rounded-lg p-2">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a3 3 0 11-6 0 3 3 0 016 0zm0 0v4m0 0H9m6 0H9"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900">MediScript</h1>
            <p class="text-xs text-gray-500">Doctor Portal</p>
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="space-y-2">
          <router-link
            to="/doctor/dashboard"
            :class="['flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition duration-200',
              route.path === '/doctor/dashboard'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-700 hover:bg-gray-100'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-3m2-2l6.5-6.5a2 2 0 012.828 0L20 10m0 0l-2 2m2-2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9"></path>
            </svg>
            Dashboard
          </router-link>

          <!-- Patients Menu Group -->
          <div>
            <button
              @click="toggleMenu('patients')"
              :class="['w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition duration-200',
                isMenuActive('patients')
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              ]"
            >
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                Patients
              </div>
              <svg :class="['w-4 h-4 transition-transform', openMenus.patients ? 'rotate-90' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            <div v-if="openMenus.patients" class="ml-9 mt-1 space-y-1">
              <router-link
                to="/doctor/patients"
                :class="['block px-4 py-2 rounded-lg text-sm transition',
                  route.path === '/doctor/patients' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-100'
                ]"
              >
                Patient List
              </router-link>
            </div>
          </div>

          <!-- Appointments Menu Group -->
          <div>
            <button
              @click="toggleMenu('appointments')"
              :class="['w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition duration-200',
                isMenuActive('appointments')
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              ]"
            >
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Appointments
              </div>
              <svg :class="['w-4 h-4 transition-transform', openMenus.appointments ? 'rotate-90' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            <div v-if="openMenus.appointments" class="ml-9 mt-1 space-y-1">
              <router-link
                to="/doctor/appointments"
                :class="['block px-4 py-2 rounded-lg text-sm transition',
                  route.path === '/doctor/appointments' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-100'
                ]"
              >
                Today Appointments
              </router-link>
            </div>
          </div>

          <!-- Prescriptions Menu Group -->
          <div>
            <button
              @click="toggleMenu('prescriptions')"
              :class="['w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition duration-200',
                isMenuActive('prescriptions')
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              ]"
            >
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Prescriptions
              </div>
              <svg :class="['w-4 h-4 transition-transform', openMenus.prescriptions ? 'rotate-90' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            <div v-if="openMenus.prescriptions" class="ml-9 mt-1 space-y-1">
              <router-link
                to="/doctor/prescriptions"
                :class="['block px-4 py-2 rounded-lg text-sm transition',
                  route.path === '/doctor/prescriptions' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-100'
                ]"
              >
                Prescription List
              </router-link>
              <router-link
                to="/doctor/prescriptions/new"
                :class="['block px-4 py-2 rounded-lg text-sm transition',
                  route.path === '/doctor/prescriptions/new' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-100'
                ]"
              >
                New Prescription
              </router-link>
            </div>
          </div>

          <!-- Medicines Menu Group -->
          <div>
            <button
              @click="toggleMenu('medicines')"
              :class="['w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition duration-200',
                isMenuActive('medicines')
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              ]"
            >
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
                Medicines
              </div>
              <svg :class="['w-4 h-4 transition-transform', openMenus.medicines ? 'rotate-90' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            <div v-if="openMenus.medicines" class="ml-9 mt-1 space-y-1">
              <router-link
                to="/doctor/medicines"
                :class="['block px-4 py-2 rounded-lg text-sm transition',
                  route.path === '/doctor/medicines' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-100'
                ]"
              >
                Medicine List
              </router-link>
              <router-link
                to="/doctor/medicines/favorites"
                :class="['block px-4 py-2 rounded-lg text-sm transition',
                  route.path === '/doctor/medicines/favorites' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-100'
                ]"
              >
                Favorite Medicines
              </router-link>
            </div>
          </div>

          <!-- Lab Tests Menu -->
          <router-link
            to="/doctor/lab-tests"
            :class="['flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition duration-200',
              route.path === '/doctor/lab-tests'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-700 hover:bg-gray-100'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            Lab Tests
          </router-link>

          <!-- Reports Menu -->
          <router-link
            to="/doctor/reports"
            :class="['flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition duration-200',
              route.path === '/doctor/reports'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-700 hover:bg-gray-100'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Reports
          </router-link>

          <!-- My Profile -->
          <router-link
            to="/doctor/profile"
            :class="['flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition duration-200',
              route.path === '/doctor/profile'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-700 hover:bg-gray-100'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A9 9 0 1118.88 17.8M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            My Profile
          </router-link>

          <!-- Settings -->
          <router-link
            to="/doctor/settings"
            :class="['flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition duration-200',
              route.path === '/doctor/settings'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-700 hover:bg-gray-100'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Settings
          </router-link>
        </nav>
      </div>

      <!-- Logout Button -->
      <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
        <button
          @click="handleLogout"
          class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg transition duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Navigation Bar -->
      <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div class="flex items-center justify-between h-16 px-4 lg:px-6">
          <!-- Mobile Menu Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          <div class="flex-1">
            <h2 class="text-xl lg:text-2xl font-bold text-gray-900 ml-4 lg:ml-0">
              <slot name="title">Dashboard</slot>
            </h2>
          </div>
          <div class="flex items-center gap-4">
            <!-- User Info -->
            <div class="hidden md:block text-right">
              <p class="text-sm font-semibold text-gray-900">{{ authStore.user?.name }}</p>
              <p class="text-xs text-gray-500">Doctor</p>
            </div>
            <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-600 rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-sm">{{ getInitials(authStore.user?.name || '') }}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <div class="flex-1 overflow-auto">
        <div class="p-4 lg:p-6">
          <slot></slot>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)

const openMenus = reactive({
  patients: false,
  appointments: false,
  prescriptions: false,
  medicines: false,
})

const toggleMenu = (menu: keyof typeof openMenus) => {
  openMenus[menu] = !openMenus[menu]
}

const isMenuActive = (menu: keyof typeof openMenus) => {
  const menuRoutes = {
    patients: ['/doctor/patients'],
    appointments: ['/doctor/appointments'],
    prescriptions: ['/doctor/prescriptions', '/doctor/prescriptions/new'],
    medicines: ['/doctor/medicines', '/doctor/medicines/favorites'],
  }
  return menuRoutes[menu].some(routePath => route.path.startsWith(routePath))
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>

<style scoped>
/* Smooth scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
