<template>
  <div class="bg-white rounded-xl shadow-md p-6 space-y-4" v-if="prescription">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900">Prescription #{{ prescription.id }}</h3>
      <button @click="printPage" class="px-3 py-2 bg-gray-800 text-white rounded-lg">Print</button>
    </div>

    <p class="text-sm text-gray-600">Date: {{ prescription.date }}</p>
    <p class="text-sm text-gray-600">Patient: {{ patientName(prescription.patientId) }}</p>

    <div class="border rounded-lg p-4">
      <h4 class="font-semibold text-gray-900 mb-2">Items</h4>
      <ul class="list-disc pl-5 text-sm text-gray-700 space-y-1">
        <li v-for="item in prescription.items" :key="item.id">
          {{ medicationName(item.medicationId) }} — {{ item.dosage }}, {{ item.frequency }}, {{ item.duration }}
        </li>
      </ul>
    </div>

    <textarea v-model="notes" rows="4" class="w-full border border-gray-300 rounded-lg px-3 py-2" />

    <div class="flex gap-3">
      <button @click="save" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">Save Changes</button>
      <router-link to="/doctor/prescriptions" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">Back</router-link>
    </div>
  </div>
  <div v-else class="bg-white rounded-xl shadow-md p-6 text-gray-600">Prescription not found or access denied.</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import { useMedicationStore } from '../../stores/medicationStore'
import { usePatientStore } from '../../stores/patientStore'
import { usePrescriptionStore } from '../../stores/prescriptionStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const medicationStore = useMedicationStore()
const patientStore = usePatientStore()
const prescriptionStore = usePrescriptionStore()

const prescriptionId = computed(() => Number(route.params.id))
const prescription = computed(() =>
  prescriptionStore.prescriptions.find((item) => item.id === prescriptionId.value && item.doctorId === authStore.user?.doctorId)
)

const notes = ref('')

const patientName = (patientId: number) => {
  const patient = patientStore.patients.find((item) => item.id === patientId)
  return patient ? patient.name : 'Unknown'
}

const medicationName = (medicationId: number) => {
  const medication = medicationStore.medications.find((item) => item.id === medicationId)
  return medication?.medicineName ?? 'Unknown Medication'
}

const save = async () => {
  if (!prescription.value) return
  await prescriptionStore.updatePrescriptionItem(prescription.value.id, { notes: notes.value })
}

const printPage = () => {
  window.print()
}

onMounted(async () => {
  const doctorId = authStore.user?.doctorId ?? undefined
  await Promise.all([
    medicationStore.fetchMedications(),
    patientStore.fetchPatients(doctorId),
    prescriptionStore.fetchPrescriptions(doctorId),
  ])

  if (!prescription.value) {
    router.replace('/doctor/prescriptions')
    return
  }

  notes.value = prescription.value.notes
})
</script>
