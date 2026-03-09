<template>
  <AdminLayout>
    <template #title>Dashboard</template>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Clinics Card -->
      <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-xl border border-purple-200 p-8 hover:shadow-2xl transition duration-200">
        <div class="flex items-center justify-center">
          <div class="text-center">
            <p class="text-gray-700 text-sm font-medium mb-2">Total Clinics</p>
            <p class="text-5xl font-bold text-purple-600">{{ clinicStore.clinics.length }}</p>
            <p class="text-xs text-gray-600 mt-3">Active clinics</p>
          </div>
        </div>
      </div>

      <!-- Total Doctors Card -->
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-xl border border-blue-200 p-8 hover:shadow-2xl transition duration-200">
        <div class="flex items-center justify-center">
          <div class="text-center">
            <p class="text-gray-700 text-sm font-medium mb-2">Total Doctors</p>
            <p class="text-5xl font-bold text-blue-600">{{ doctorStore.doctors.length }}</p>
            <p class="text-xs text-gray-600 mt-3">Registered doctors</p>
          </div>
        </div>
      </div>

      <!-- Total Patients Card -->
      <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-xl border border-green-200 p-8 hover:shadow-2xl transition duration-200">
        <div class="flex items-center justify-center">
          <div class="text-center">
            <p class="text-gray-700 text-sm font-medium mb-2">Total Patients</p>
            <p class="text-5xl font-bold text-green-600">{{ patientStore.patients.length }}</p>
            <p class="text-xs text-gray-600 mt-3">Registered patients</p>
          </div>
        </div>
      </div>

      <!-- Total Prescriptions Card -->
      <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-xl border border-orange-200 p-8 hover:shadow-2xl transition duration-200">
        <div class="flex items-center justify-center">
          <div class="text-center">
            <p class="text-gray-700 text-sm font-medium mb-2">Total Prescriptions</p>
            <p class="text-5xl font-bold text-orange-600">{{ prescriptionStore.prescriptions.length }}</p>
            <p class="text-xs text-gray-600 mt-3">Issued prescriptions</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Prescriptions -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Prescriptions</h3>
        <div v-if="prescriptionStore.prescriptions.length > 0" class="space-y-3">
          <div v-for="prescription in prescriptionStore.prescriptions.slice(0, 5)" :key="prescription.id" class="border-b border-gray-200 pb-3 last:border-b-0">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-gray-900">Prescription #{{ prescription.id }}</p>
                <p class="text-xs text-gray-500">{{ new Date(prescription.date).toLocaleDateString() }}</p>
              </div>
              <span class="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">Active</span>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          <p>No prescriptions yet</p>
        </div>
      </div>

      <!-- Recent Clinics -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Registered Clinics</h3>
        <div v-if="clinicStore.clinics.length > 0" class="space-y-3">
          <div v-for="clinic in clinicStore.clinics.slice(0, 5)" :key="clinic.id" class="border-b border-gray-200 pb-3 last:border-b-0">
            <p class="text-sm font-medium text-gray-900">{{ clinic.name }}</p>
            <p class="text-xs text-gray-500">{{ clinic.address }}</p>
            <p class="text-xs text-gray-500 mt-1">📞 {{ clinic.phone }}</p>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          <p>No clinics registered</p>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import { useClinicStore } from '../stores/clinicStore'
import { useDoctorStore } from '../stores/doctorStore'
import { usePatientStore } from '../stores/patientStore'
import { usePrescriptionStore } from '../stores/prescriptionStore'

const clinicStore = useClinicStore()
const doctorStore = useDoctorStore()
const patientStore = usePatientStore()
const prescriptionStore = usePrescriptionStore()

onMounted(async () => {
  await Promise.all([
    clinicStore.fetchClinics(),
    doctorStore.fetchDoctors(),
    patientStore.fetchPatients(),
    prescriptionStore.fetchPrescriptions(),
  ])
})
</script>
