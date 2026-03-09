<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-xl border border-blue-200 p-8 flex flex-col items-center justify-center">
      <p class="text-gray-700 text-sm font-medium">Clinics</p>
      <p class="text-5xl font-bold text-blue-600 mt-3">{{ clinicStore.clinics.length }}</p>
    </div>
    <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-xl border border-purple-200 p-8 flex flex-col items-center justify-center">
      <p class="text-gray-700 text-sm font-medium">Doctors</p>
      <p class="text-5xl font-bold text-purple-600 mt-3">{{ doctorStore.doctors.length }}</p>
    </div>
    <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-xl border border-green-200 p-8 flex flex-col items-center justify-center">
      <p class="text-gray-700 text-sm font-medium">Medications</p>
      <p class="text-5xl font-bold text-green-600 mt-3">{{ medicationStore.medications.length }}</p>
    </div>
    <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-xl border border-orange-200 p-8 flex flex-col items-center justify-center">
      <p class="text-gray-700 text-sm font-medium">Prescriptions</p>
      <p class="text-5xl font-bold text-orange-600 mt-3">{{ prescriptionStore.prescriptions.length }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useClinicStore } from '../../stores/clinicStore'
import { useDoctorStore } from '../../stores/doctorStore'
import { useMedicationStore } from '../../stores/medicationStore'
import { usePrescriptionStore } from '../../stores/prescriptionStore'

const clinicStore = useClinicStore()
const doctorStore = useDoctorStore()
const medicationStore = useMedicationStore()
const prescriptionStore = usePrescriptionStore()

onMounted(async () => {
  await Promise.all([
    clinicStore.fetchClinics(),
    doctorStore.fetchDoctors(),
    medicationStore.fetchMedications(),
    prescriptionStore.fetchPrescriptions(),
  ])
})
</script>
