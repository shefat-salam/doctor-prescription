import { createRouter, createWebHistory, type RouteRecordRaw, type RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'

import AdminShell from '../views/Admin/AdminShell.vue'
import AdminDashboard from '../views/Admin/Dashboard.vue'
import AdminClinics from '../views/Admin/Clinics.vue'
import AdminDoctors from '../views/Admin/Doctors.vue'
import AdminPatients from '../views/Admin/Patients.vue'
import AdminMedications from '../views/Admin/Medications.vue'
import AdminPrescriptions from '../views/Admin/Prescriptions.vue'
import AdminUsers from '../views/Admin/Users.vue'

import DoctorShell from '../views/Doctor/DoctorShell.vue'
import DoctorDashboard from '../views/Doctor/Dashboard.vue'
import DoctorProfile from '../views/Doctor/Profile.vue'
import DoctorPatientList from '../views/Doctor/PatientList.vue'
import DoctorPatientHistory from '../views/Doctor/PatientHistory.vue'
import DoctorAppointments from '../views/Doctor/Appointments.vue'
import DoctorPrescriptionList from '../views/Doctor/PrescriptionList.vue'
import DoctorPrescriptionForm from '../views/Doctor/PrescriptionForm.vue'
import DoctorPrescriptionDetail from '../views/Doctor/PrescriptionDetail.vue'
import DoctorMedicineList from '../views/Doctor/MedicineList.vue'
import DoctorFavoriteMedicines from '../views/Doctor/FavoriteMedicines.vue'
import DoctorLabTests from '../views/Doctor/LabTests.vue'
import DoctorReports from '../views/Doctor/Reports.vue'
import DoctorSettings from '../views/Doctor/Settings.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: () => {
      const authStore = useAuthStore()
      if (!authStore.isAuthenticated) {
        return '/login'
      }
      return authStore.isAdmin ? '/admin/dashboard' : '/doctor/dashboard'
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView,
    meta: { requiresAuth: false },
  },

  {
    path: '/admin',
    component: AdminShell,
    meta: { requiresAuth: true, requiredRole: 'admin' },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard',
      },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { requiresAuth: true, requiredRole: 'admin', title: 'Dashboard' },
      },
      {
        path: 'clinics',
        name: 'AdminClinics',
        component: AdminClinics,
        meta: { requiresAuth: true, requiredRole: 'admin', title: 'Clinics Management' },
      },
      {
        path: 'doctors',
        name: 'AdminDoctors',
        component: AdminDoctors,
        meta: { requiresAuth: true, requiredRole: 'admin', title: 'Doctors Management' },
      },
      {
        path: 'patients',
        name: 'AdminPatients',
        component: AdminPatients,
        meta: { requiresAuth: true, requiredRole: 'admin', title: 'Patients Management' },
      },
      {
        path: 'medications',
        name: 'AdminMedications',
        component: AdminMedications,
        meta: { requiresAuth: true, requiredRole: 'admin', title: 'Medications' },
      },
      {
        path: 'prescriptions',
        name: 'AdminPrescriptions',
        component: AdminPrescriptions,
        meta: { requiresAuth: true, requiredRole: 'admin', title: 'Prescriptions' },
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: AdminUsers,
        meta: { requiresAuth: true, requiredRole: 'admin', title: 'Users' },
      },
    ],
  },

  {
    path: '/doctor',
    component: DoctorShell,
    meta: { requiresAuth: true, requiredRole: 'doctor' },
    children: [
      {
        path: '',
        redirect: '/doctor/dashboard',
      },
      {
        path: 'dashboard',
        name: 'DoctorDashboard',
        component: DoctorDashboard,
        meta: { requiresAuth: true, requiredRole: 'doctor', title: 'Dashboard' },
      },
      {
        path: 'profile',
        name: 'DoctorProfile',
        component: DoctorProfile,
        meta: { requiresAuth: true, requiredRole: 'doctor', title: 'My Profile' },
      },
      {
        path: 'patients',
        name: 'DoctorPatients',
        component: DoctorPatientList,
        meta: { requiresAuth: true, requiredRole: 'doctor', title: 'Patient List' },
      },
      {
        path: 'patients/:id/history',
        name: 'DoctorPatientHistory',
        component: DoctorPatientHistory,
        meta: { requiresAuth: true, requiredRole: 'doctor', title: 'Patient History' },
      },
      {
        path: 'appointments',
        name: 'DoctorAppointments',
        component: DoctorAppointments,
        meta: { requiresAuth: true, requiredRole: 'doctor', title: 'Appointments' },
      },
      {
        path: 'prescriptions',
        name: 'DoctorPrescriptions',
        component: DoctorPrescriptionList,
        meta: { requiresAuth: true, requiredRole: 'doctor', title: 'Prescription List' },
      },
      {
        path: 'prescriptions/new',
        name: 'DoctorPrescriptionNew',
        component: DoctorPrescriptionForm,
        meta: { requiresAuth: true, requiredRole: 'doctor', title: 'New Prescription' },
      },
      {
        path: 'prescriptions/:id',
        name: 'DoctorPrescriptionDetail',
        component: DoctorPrescriptionDetail,
        meta: { requiresAuth: true, requiredRole: 'doctor', title: 'View Prescription' },
      },
      {
        path: 'medicines',
        name: 'DoctorMedicines',
        component: DoctorMedicineList,
        meta: { requiresAuth: true, requiredRole: 'doctor', title: 'Medicine List' },
      },
      {
        path: 'medicines/favorites',
        name: 'DoctorFavoriteMedicines',
        component: DoctorFavoriteMedicines,
        meta: { requiresAuth: true, requiredRole: 'doctor', title: 'Favorite Medicines' },
      },
      {
        path: 'lab-tests',
        name: 'DoctorLabTests',
        component: DoctorLabTests,
        meta: { requiresAuth: true, requiredRole: 'doctor', title: 'Lab Tests' },
      },
      {
        path: 'reports',
        name: 'DoctorReports',
        component: DoctorReports,
        meta: { requiresAuth: true, requiredRole: 'doctor', title: 'Reports' },
      },
      {
        path: 'settings',
        name: 'DoctorSettings',
        component: DoctorSettings,
        meta: { requiresAuth: true, requiredRole: 'doctor', title: 'Settings' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Global navigation guard for route protection
router.beforeEach((to: RouteLocationNormalized, _from: RouteLocationNormalized, next: any) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some((route) => Boolean(route.meta.requiresAuth))
  const requiredRole = (to.meta.requiredRole as 'admin' | 'doctor' | undefined)

  // If route requires auth and user is not logged in, redirect to login
  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  }
  // If route requires specific role and user doesn't have it, redirect to dashboard
  else if (requiresAuth && requiredRole && authStore.user?.role !== requiredRole) {
    next(authStore.isAdmin ? '/admin/dashboard' : '/doctor/dashboard')
  }
  // If user is logged in and trying to access login/signup, redirect to dashboard
  else if (!requiresAuth && authStore.isAuthenticated && (to.path === '/login' || to.path === '/signup')) {
    next(authStore.isAdmin ? '/admin/dashboard' : '/doctor/dashboard')
  }
  // Otherwise, proceed
  else {
    next()
  }
})

export default router
