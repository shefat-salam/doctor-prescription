<template>
  <div class="space-y-6">
    <div class="flex justify-end">
      <router-link to="/doctor/prescriptions/new" class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg">
        New Prescription
      </router-link>
    </div>

    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <div class="p-4 border-b border-gray-200">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by prescription ID, patient, or date..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      <table class="w-full text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="text-left px-4 py-3">ID</th>
            <th class="text-left px-4 py-3">Patient</th>
            <th class="text-left px-4 py-3">Date</th>
            <th class="text-left px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prescription in filteredPrescriptions" :key="prescription.id" class="border-t">
            <td class="px-4 py-3">#{{ prescription.id }}</td>
            <td class="px-4 py-3">{{ patientName(prescription.patientId) }}</td>
            <td class="px-4 py-3">{{ prescription.date }}</td>
            <td class="px-4 py-3">
              <router-link :to="`/doctor/prescriptions/${prescription.id}`" class="px-3 py-1 bg-blue-100 text-blue-700 rounded">View / Edit</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '../../stores/authStore'
import { usePatientStore } from '../../stores/patientStore'
import { usePrescriptionStore } from '../../stores/prescriptionStore'

const authStore = useAuthStore()
const patientStore = usePatientStore()
const prescriptionStore = usePrescriptionStore()
const searchQuery = ref('')

const filteredPrescriptions = computed(() => {
  if (!searchQuery.value.trim()) return prescriptionStore.prescriptions

  const query = searchQuery.value.toLowerCase()
  return prescriptionStore.prescriptions.filter((prescription) =>
    String(prescription.id).includes(query) ||
    patientName(prescription.patientId).toLowerCase().includes(query) ||
    prescription.date.toLowerCase().includes(query)
  )
})

const patientName = (patientId: number) => {
  const patient = patientStore.patients.find((item) => item.id === patientId)
  return patient ? patient.name : 'Unknown'
}

onMounted(async () => {
  const doctorId = authStore.user?.doctorId ?? undefined
  await Promise.all([
    patientStore.fetchPatients(doctorId),
    prescriptionStore.fetchPrescriptions(doctorId),
  ])
})
</script>
