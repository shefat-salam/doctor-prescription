<template>
  <form @submit.prevent="submit" class="bg-white rounded-xl shadow-md p-6 space-y-4 max-w-3xl">
    <h3 class="text-lg font-semibold text-gray-900">Create Prescription</h3>

    <select v-model.number="form.patientId" class="w-full border border-gray-300 rounded-lg px-3 py-2" required>
      <option disabled :value="0">Select patient</option>
      <option v-for="patient in patientStore.patients" :key="patient.id" :value="patient.id">
        {{ patient.name }}
      </option>
    </select>

    <select v-model.number="item.medicationId" class="w-full border border-gray-300 rounded-lg px-3 py-2" required>
      <option disabled :value="0">Select medication</option>
      <option v-for="medication in medicationStore.medications" :key="medication.id" :value="medication.id">
        {{ medication.medicineName }} ({{ medication.strength }})
      </option>
    </select>

    <input v-model="item.dosage" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Dosage" required />
    <input v-model="item.frequency" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Frequency" required />
    <input v-model="item.duration" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Duration" required />
    <textarea v-model="form.notes" class="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="Instructions / Notes" rows="4" />

    <button type="submit" class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg">Save Prescription</button>
  </form>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import { useMedicationStore } from '../../stores/medicationStore'
import { usePatientStore } from '../../stores/patientStore'
import { usePrescriptionStore } from '../../stores/prescriptionStore'

const authStore = useAuthStore()
const patientStore = usePatientStore()
const medicationStore = useMedicationStore()
const prescriptionStore = usePrescriptionStore()
const router = useRouter()

const form = reactive({
  patientId: 0,
  notes: '',
})

const item = reactive({
  medicationId: 0,
  dosage: '',
  frequency: '',
  duration: '',
})

const submit = async () => {
  await prescriptionStore.addPrescription({
    patientId: form.patientId,
    doctorId: authStore.user?.doctorId || 0,
    date: new Date().toISOString().slice(0, 10),
    notes: form.notes,
    items: [
      {
        id: Date.now(),
        medicationId: item.medicationId,
        dosage: item.dosage,
        frequency: item.frequency,
        duration: item.duration,
      },
    ],
  })

  router.push('/doctor/prescriptions')
}

onMounted(async () => {
  const doctorId = authStore.user?.doctorId ?? undefined
  await Promise.all([patientStore.fetchPatients(doctorId), medicationStore.fetchMedications()])
})
</script>
