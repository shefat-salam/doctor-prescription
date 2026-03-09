import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { provideTheme } from './composables/useTheme'
import { useAuthStore } from './stores/authStore'

const app = createApp(App)

// Setup Pinia
const pinia = createPinia()
app.use(pinia)

// Initialize auth on app startup
const authStore = useAuthStore()
authStore.initializeAuth()

app.use(router)

// Provide theme to entire app
provideTheme()

app.mount('#app')
