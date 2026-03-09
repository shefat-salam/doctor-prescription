<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-white rounded-xl shadow-md p-6">
      <p class="text-gray-600 text-sm">My Patients</p>
      <p class="text-3xl font-bold text-gray-900">{{ myPatients.length }}</p>
    </div>
    <div class="bg-white rounded-xl shadow-md p-6">
      <p class="text-gray-600 text-sm">My Prescriptions</p>
      <p class="text-3xl font-bold text-gray-900">{{ myPrescriptions.length }}</p>
    </div>
    <div class="bg-white rounded-xl shadow-md p-6">
      <p class="text-gray-600 text-sm">This Month</p>
      <p class="text-3xl font-bold text-gray-900">{{ thisMonthPrescriptions.length }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '../../stores/authStore'
import { usePatientStore } from '../../stores/patientStore'
import { usePrescriptionStore } from '../../stores/prescriptionStore'

const authStore = useAuthStore()
const patientStore = usePatientStore()
const prescriptionStore = usePrescriptionStore()

const doctorId = computed(() => authStore.user?.doctorId)
const myPatients = computed(() =>
  patientStore.patients.filter((p) => p.doctorId === doctorId.value)
)
const myPrescriptions = computed(() =>
  prescriptionStore.prescriptions.filter((p) => p.doctorId === doctorId.value)
)
const thisMonthPrescriptions = computed(() => {
  const now = new Date()
  return myPrescriptions.value.filter((p) => {
    const date = new Date(p.date)
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  })
})

onMounted(async () => {
  const currentDoctorId = doctorId.value ?? undefined
  await Promise.all([
    patientStore.fetchPatients(currentDoctorId),
    prescriptionStore.fetchPrescriptions(currentDoctorId),
  ])
})
</script>
