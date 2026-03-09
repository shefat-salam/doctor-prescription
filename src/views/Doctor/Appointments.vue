<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-900">Today's Appointments</h2>

    <!-- Today's Appointments -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
        </h3>
        <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          {{ todayAppointments.length }} appointments
        </span>
      </div>

      <div v-if="todayAppointments.length > 0" class="space-y-3">
        <div
          v-for="appointment in todayAppointments"
          :key="appointment.id"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <p class="font-semibold text-gray-900">{{ appointment.patientName }}</p>
              <p class="text-sm text-gray-600 mt-1">Time: {{ appointment.time }}</p>
              <p class="text-sm text-gray-500 mt-1">Phone: {{ appointment.phone }}</p>
            </div>
            <div class="flex gap-2">
              <button class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition">
                Start Consultation
              </button>
              <button class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded-lg transition">
                Reschedule
              </button>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-gray-500 text-center py-8">No appointments for today</p>
    </div>

    <!-- Upcoming Appointments -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
      <div v-if="upcomingAppointments.length > 0" class="space-y-3">
        <div
          v-for="appointment in upcomingAppointments"
          :key="appointment.id"
          class="border border-gray-200 rounded-lg p-4"
        >
          <div class="flex justify-between items-start">
            <div>
              <p class="font-semibold text-gray-900">{{ appointment.patientName }}</p>
              <p class="text-sm text-gray-600 mt-1">
                {{ new Date(appointment.date).toLocaleDateString() }} at {{ appointment.time }}
              </p>
              <p class="text-sm text-gray-500 mt-1">Phone: {{ appointment.phone }}</p>
            </div>
            <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
              Scheduled
            </span>
          </div>
        </div>
      </div>
      <p v-else class="text-gray-500 text-center py-8">No upcoming appointments</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAppointmentStore } from '../../stores/appointmentStore'

const appointmentStore = useAppointmentStore()

const todayAppointments = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return appointmentStore.appointments.filter((a) => a.date === today)
})

const upcomingAppointments = computed(() => {
  const todayDate = new Date().toISOString().split('T')[0] as string
  return appointmentStore.appointments.filter((a) => a.date > todayDate).slice(0, 10)
})

onMounted(async () => {
  await appointmentStore.fetchAppointments()
})
</script>
