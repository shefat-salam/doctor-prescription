<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <button @click="router.back()" class="text-green-600 hover:text-green-700 font-medium">
        ← Back to Patients
      </button>
    </div>

    <!-- Patient Info Card -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Patient History</h2>
      <div v-if="patient" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p class="text-sm text-gray-600">Name</p>
          <p class="font-semibold">{{ patient.name }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Age</p>
          <p class="font-semibold">{{ patient.age }} years</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Gender</p>
          <p class="font-semibold">{{ patient.gender }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Blood Group</p>
          <p class="font-semibold"><span class="px-2 py-1 bg-red-100 text-red-700 rounded">{{ patient.bloodGroup }}</span></p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Phone</p>
          <p class="font-semibold">{{ patient.phone }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Weight / Height</p>
          <p class="font-semibold">{{ patient.weight }} kg / {{ patient.height }} ft</p>
        </div>
        <div class="md:col-span-2">
          <p class="text-sm text-gray-600">Address</p>
          <p class="font-semibold">{{ patient.address }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-600">Allergies</p>
          <p class="font-semibold text-red-600">{{ patient.allergies || 'None' }}</p>
        </div>
        <div class="md:col-span-2">
          <p class="text-sm text-gray-600">Chronic Disease</p>
          <p class="font-semibold text-orange-600">{{ patient.chronicDisease || 'None' }}</p>
        </div>
        <div class="md:col-span-3">
          <p class="text-sm text-gray-600">Emergency Contact</p>
          <p class="font-semibold">{{ patient.emergencyContactName }} ({{ patient.relationship }}) - {{ patient.emergencyPhone }}</p>
        </div>
      </div>
    </div>

    <!-- Prescription History -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-4">Prescription History</h3>
      <div v-if="patientPrescriptions.length > 0" class="space-y-3">
        <div
          v-for="prescription in patientPrescriptions"
          :key="prescription.id"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
          @click="viewPrescription(prescription.id)"
        >
          <div class="flex justify-between items-start">
            <div>
              <p class="font-semibold text-gray-900">
                {{ new Date(prescription.date).toLocaleDateString() }}
              </p>
              <p class="text-sm text-gray-600 mt-1">
                Medications: {{ prescription.items?.length || 0 }}
              </p>
            </div>
            <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
              View Details →
            </span>
          </div>
        </div>
      </div>
      <p v-else class="text-gray-500 text-center py-8">No prescription history available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePatientStore } from '../../stores/patientStore'
import { usePrescriptionStore } from '../../stores/prescriptionStore'

const route = useRoute()
const router = useRouter()
const patientStore = usePatientStore()
const prescriptionStore = usePrescriptionStore()

const patientId = computed(() => Number(route.params.id))
const patient = computed(() => patientStore.patients.find((p) => p.id === patientId.value))
const patientPrescriptions = computed(() =>
  prescriptionStore.prescriptions.filter((p) => p.patientId === patientId.value)
)

const viewPrescription = (prescriptionId: number) => {
  router.push(`/doctor/prescriptions/${prescriptionId}`)
}

onMounted(async () => {
  await patientStore.fetchPatients()
  await prescriptionStore.fetchPrescriptions()
})
</script>
