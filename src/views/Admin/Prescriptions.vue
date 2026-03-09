<template>
  <div class="space-y-6">
    <div class="bg-white rounded-xl shadow-md p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <select v-model.number="selectedDoctorId" class="border border-gray-300 rounded-lg px-3 py-2" @change="applyFilters">
        <option :value="0">All Doctors</option>
        <option v-for="doctor in doctorStore.doctors" :key="doctor.id" :value="doctor.id">
          {{ doctor.name }}
        </option>
      </select>

      <select v-model="selectedChamberName" class="border border-gray-300 rounded-lg px-3 py-2" @change="applyFilters">
        <option value="">All Chambers</option>
        <option v-for="chamber in chamberOptions" :key="chamber" :value="chamber">{{ chamber }}</option>
      </select>
    </div>

    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <div class="p-4 border-b border-gray-200">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by prescription ID, doctor, chamber, patient, or date..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            @input="applyFilters"
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
            <th class="text-left px-4 py-3">Doctor</th>
            <th class="text-left px-4 py-3">Chamber</th>
            <th class="text-left px-4 py-3">Patient</th>
            <th class="text-left px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prescription in filteredPrescriptions" :key="prescription.id" class="border-t">
            <td class="px-4 py-3">#{{ prescription.id }}</td>
            <td class="px-4 py-3">{{ doctorName(prescription.doctorId) }}</td>
            <td class="px-4 py-3">{{ chamberNameByDoctor(prescription.doctorId) }}</td>
            <td class="px-4 py-3">{{ patientName(prescription.patientId) }}</td>
            <td class="px-4 py-3">{{ prescription.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useDoctorStore } from '../../stores/doctorStore'
import { usePatientStore } from '../../stores/patientStore'
import { usePrescriptionStore } from '../../stores/prescriptionStore'

const doctorStore = useDoctorStore()
const patientStore = usePatientStore()
const prescriptionStore = usePrescriptionStore()

const selectedDoctorId = ref(0)
const selectedChamberName = ref('')
const searchQuery = ref('')
const filteredPrescriptions = ref(prescriptionStore.prescriptions)

const chamberOptions = computed(() => {
  const values = doctorStore.doctors.map((doctor) => doctor.chamberName).filter(Boolean)
  return Array.from(new Set(values))
})

const doctorName = (doctorId: number) => {
  const doctor = doctorStore.doctors.find((item) => item.id === doctorId)
  return doctor ? doctor.name : 'Unknown'
}

const patientName = (patientId: number) => {
  const patient = patientStore.patients.find((item) => item.id === patientId)
  return patient ? patient.name : 'Unknown'
}

const chamberNameByDoctor = (doctorId: number) => {
  const doctor = doctorStore.doctors.find((item) => item.id === doctorId)
  if (!doctor) return 'Unknown'
  return doctor.chamberName || 'Unknown'
}

const applyFilters = () => {
  filteredPrescriptions.value = prescriptionStore.prescriptions.filter((prescription) => {
    const doctorMatches = selectedDoctorId.value ? prescription.doctorId === selectedDoctorId.value : true
    const chamberMatches = selectedChamberName.value
      ? chamberNameByDoctor(prescription.doctorId) === selectedChamberName.value
      : true
    const query = searchQuery.value.trim().toLowerCase()
    const searchMatches = query
      ? String(prescription.id).includes(query) ||
        doctorName(prescription.doctorId).toLowerCase().includes(query) ||
        chamberNameByDoctor(prescription.doctorId).toLowerCase().includes(query) ||
        patientName(prescription.patientId).toLowerCase().includes(query) ||
        prescription.date.toLowerCase().includes(query)
      : true
    return doctorMatches && chamberMatches && searchMatches
  })
}

onMounted(async () => {
  await Promise.all([
    doctorStore.fetchDoctors(),
    patientStore.fetchPatients(),
    prescriptionStore.fetchPrescriptions(),
  ])
  applyFilters()
})
</script>
