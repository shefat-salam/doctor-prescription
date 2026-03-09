<template>
  <DoctorLayout>
    <template #title>Dashboard</template>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- My Patients Card -->
      <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-xl border border-green-200 p-8 hover:shadow-2xl transition duration-200">
        <div class="flex items-center justify-center">
          <div class="text-center">
            <p class="text-gray-700 text-sm font-medium mb-2">My Patients</p>
            <p class="text-5xl font-bold text-green-600">{{ myPatients.length }}</p>
            <p class="text-xs text-gray-600 mt-3">Active patients</p>
          </div>
        </div>
      </div>

      <!-- My Prescriptions Card -->
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-xl border border-blue-200 p-8 hover:shadow-2xl transition duration-200">
        <div class="flex items-center justify-center">
          <div class="text-center">
            <p class="text-gray-700 text-sm font-medium mb-2">My Prescriptions</p>
            <p class="text-5xl font-bold text-blue-600">{{ myPrescriptions.length }}</p>
            <p class="text-xs text-gray-600 mt-3">Total issued</p>
          </div>
        </div>
      </div>

      <!-- This Month Card -->
      <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-xl border border-orange-200 p-8 hover:shadow-2xl transition duration-200">
        <div class="flex items-center justify-center">
          <div class="text-center">
            <p class="text-gray-700 text-sm font-medium mb-2">This Month</p>
            <p class="text-5xl font-bold text-orange-600">{{ thisMonthPrescriptions.length }}</p>
            <p class="text-xs text-gray-600 mt-3">Prescriptions issued</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Patients -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Patients</h3>
        <div v-if="myPatients.length > 0" class="space-y-3">
          <div v-for="patient in myPatients.slice(0, 5)" :key="patient.id" class="border-b border-gray-200 pb-3 last:border-b-0">
            <p class="text-sm font-medium text-gray-900">{{ patient.name }}</p>
            <p class="text-xs text-gray-500">Age: {{ patient.age }} years</p>
            <p class="text-xs text-gray-500 mt-1">📞 {{ patient.phone }}</p>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          <p>No patients assigned yet</p>
        </div>
      </div>

      <!-- Recent Prescriptions -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Prescriptions</h3>
        <div v-if="myPrescriptions.length > 0" class="space-y-3">
          <div v-for="prescription in myPrescriptions.slice(0, 5)" :key="prescription.id" class="border-b border-gray-200 pb-3 last:border-b-0">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-gray-900">Prescription #{{ prescription.id }}</p>
                <p class="text-xs text-gray-500">{{ new Date(prescription.date).toLocaleDateString() }}</p>
              </div>
              <span class="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">{{ prescription.items.length }} items</span>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          <p>No prescriptions issued yet</p>
        </div>
      </div>
    </div>
  </DoctorLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import DoctorLayout from '../layouts/DoctorLayout.vue'
import { useAuthStore } from '../stores/authStore'
import { usePatientStore } from '../stores/patientStore'
import { usePrescriptionStore } from '../stores/prescriptionStore'

const authStore = useAuthStore()
const patientStore = usePatientStore()
const prescriptionStore = usePrescriptionStore()

const myPatients = computed(() =>
  patientStore.patients.filter(p => p.doctorId === authStore.user?.id)
)

const myPrescriptions = computed(() =>
  prescriptionStore.prescriptions.filter(p => p.doctorId === authStore.user?.id)
)

const thisMonthPrescriptions = computed(() => {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  return myPrescriptions.value.filter(p => {
    const prescDate = new Date(p.date)
    return prescDate.getMonth() === currentMonth && prescDate.getFullYear() === currentYear
  })
})

onMounted(async () => {
  await Promise.all([
    patientStore.fetchPatients(),
    prescriptionStore.fetchPrescriptions(),
  ])
})
</script>
