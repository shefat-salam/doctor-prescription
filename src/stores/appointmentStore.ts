import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiClient } from '../services/api'

export interface Appointment {
  id: number
  patientId: number
  patientName: string
  phone: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled'
  doctorId: number
}

export const useAppointmentStore = defineStore('appointment', () => {
  const appointments = ref<Appointment[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchAppointments = async (doctorId?: number) => {
    loading.value = true
    try {
      const response = await apiClient.getAppointments(doctorId)
      appointments.value = response.data
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addAppointment = async (appointment: Omit<Appointment, 'id'>) => {
    try {
      const response = await apiClient.createAppointment(appointment)
      appointments.value.push(response.data)
      return response.data
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const updateAppointmentItem = async (id: number, appointment: Partial<Appointment>) => {
    try {
      const response = await apiClient.updateAppointment(id, appointment)
      const index = appointments.value.findIndex(a => a.id === id)
      if (index !== -1) {
        appointments.value[index] = response.data
      }
      return response.data
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const deleteAppointmentItem = async (id: number) => {
    try {
      await apiClient.deleteAppointment(id)
      appointments.value = appointments.value.filter(a => a.id !== id)
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    addAppointment,
    updateAppointmentItem,
    deleteAppointmentItem,
  }
})
