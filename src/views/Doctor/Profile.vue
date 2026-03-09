<template>
  <div class="bg-white rounded-xl shadow-md p-6" v-if="profile">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">My Profile</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <p><span class="font-semibold">Name:</span> {{ profile.name }}</p>
      <p><span class="font-semibold">Gender:</span> {{ profile.gender }}</p>
      <p><span class="font-semibold">Qualification:</span> {{ profile.qualification }}</p>
      <p><span class="font-semibold">Specialization:</span> {{ profile.specialization }}</p>
      <p><span class="font-semibold">BMDC:</span> {{ profile.bmdcNumber }}</p>
      <p><span class="font-semibold">Experience:</span> {{ profile.experience }} years</p>
      <p><span class="font-semibold">Current Position:</span> {{ profile.currentPosition }}</p>
      <p><span class="font-semibold">Hospital:</span> {{ profile.hospital }}</p>
      <p><span class="font-semibold">Chamber:</span> {{ profile.chamberName }}</p>
      <p><span class="font-semibold">Chamber Address:</span> {{ profile.chamberAddress }}</p>
      <p><span class="font-semibold">Chamber Days:</span> {{ profile.chamberDays.join(', ') }}</p>
      <p><span class="font-semibold">Chamber Time:</span> {{ profile.chamberTime }}</p>
      <p><span class="font-semibold">Consultation Fee:</span> ৳{{ profile.consultationFee }}</p>
      <p><span class="font-semibold">Phone:</span> {{ profile.phone }}</p>
    </div>
  </div>
  <div v-else class="bg-white rounded-xl shadow-md p-6 text-gray-600">Doctor profile not found.</div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '../../stores/authStore'
import { useDoctorStore } from '../../stores/doctorStore'

const authStore = useAuthStore()
const doctorStore = useDoctorStore()

const profile = computed(() => doctorStore.doctors.find((doctor) => doctor.id === authStore.user?.doctorId))

onMounted(async () => {
  await doctorStore.fetchDoctors()
})
</script>
