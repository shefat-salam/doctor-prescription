<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 class="text-2xl font-bold text-gray-900">Patient List</h2>
    </div>

    <!-- Search Bar -->
    <div class="bg-white rounded-xl shadow-md p-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by patient name, phone, or ID..."
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    <!-- Patient Table -->
    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 sticky top-0">
            <tr>
              <th class="text-left px-4 py-3">Patient ID</th>
              <th class="text-left px-4 py-3">Name</th>
              <th class="text-left px-4 py-3">Age</th>
              <th class="text-left px-4 py-3">Gender</th>
              <th class="text-left px-4 py-3">Phone</th>
              <th class="text-left px-4 py-3">Last Visit</th>
              <th class="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody class="max-h-[500px] overflow-y-auto">
            <tr v-for="patient in filteredPatients" :key="patient.id" class="border-t hover:bg-gray-50">
              <td class="px-4 py-3 font-medium">{{ patient.id }}</td>
              <td class="px-4 py-3">{{ patient.name }}</td>
              <td class="px-4 py-3">{{ patient.age }}</td>
              <td class="px-4 py-3">{{ patient.gender }}</td>
              <td class="px-4 py-3">{{ patient.phone }}</td>
              <td class="px-4 py-3 text-gray-500">-</td>
              <td class="px-4 py-3">
                <div class="flex gap-2">
                  <button
                    @click="viewHistory(patient.id)"
                    class="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded transition text-xs"
                  >
                    History
                  </button>
                  <button
                    @click="createPrescription(patient.id)"
                    class="px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 rounded transition text-xs"
                  >
                    Prescribe
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePatientStore } from '../../stores/patientStore'
import { useAuthStore } from '../../stores/authStore'

const router = useRouter()
const patientStore = usePatientStore()
const authStore = useAuthStore()
const searchQuery = ref('')

const filteredPatients = computed(() => {
  const assignedPatients = patientStore.patients.filter(
    patient => patient.doctorId === authStore.user?.id
  )

  if (!searchQuery.value.trim()) return assignedPatients

  const query = searchQuery.value.toLowerCase()
  return assignedPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.phone.includes(query) ||
      String(p.id).includes(query)
  )
})

const viewHistory = (patientId: number) => {
  router.push(`/doctor/patients/${patientId}/history`)
}

const createPrescription = (patientId: number) => {
  router.push(`/doctor/prescriptions/new?patientId=${patientId}`)
}

onMounted(async () => {
  await patientStore.fetchPatients(authStore.user?.id)
})
</script>
