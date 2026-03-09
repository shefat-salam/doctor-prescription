<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-900">Reports</h2>

    <!-- Report Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Prescription Report -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-purple-100 p-3 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Prescription Report</h3>
            <p class="text-sm text-gray-600">Total prescriptions issued</p>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-900">{{ prescriptionStore.prescriptions.length }}</p>
        <button class="mt-4 w-full px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition">
          View Details
        </button>
      </div>

      <!-- Patient Report -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-blue-100 p-3 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Patient Report</h3>
            <p class="text-sm text-gray-600">Total registered patients</p>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-900">{{ patientStore.patients.length }}</p>
        <button class="mt-4 w-full px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition">
          View Details
        </button>
      </div>

      <!-- Medicine Usage -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-green-100 p-3 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Medicine Usage</h3>
            <p class="text-sm text-gray-600">Most prescribed medicines</p>
          </div>
        </div>
        <p class="text-3xl font-bold text-gray-900">{{ medicationStore.medications.length }}</p>
        <button class="mt-4 w-full px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition">
          View Details
        </button>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div class="space-y-3">
        <div v-for="i in 5" :key="i" class="flex items-center gap-4 border-b border-gray-200 pb-3 last:border-b-0">
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          <div class="flex-1">
            <p class="text-sm text-gray-900">Prescription created for patient</p>
            <p class="text-xs text-gray-500">{{ i }} hours ago</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePrescriptionStore } from '../../stores/prescriptionStore'
import { usePatientStore } from '../../stores/patientStore'
import { useMedicationStore } from '../../stores/medicationStore'

const prescriptionStore = usePrescriptionStore()
const patientStore = usePatientStore()
const medicationStore = useMedicationStore()

onMounted(async () => {
  await prescriptionStore.fetchPrescriptions()
  await patientStore.fetchPatients()
  await medicationStore.fetchMedications()
})
</script>
