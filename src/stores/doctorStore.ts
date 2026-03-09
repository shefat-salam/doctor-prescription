import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiClient } from '../services/api'

export interface Doctor {
  id: number
  name: string
  photo: string
  gender: string
  qualification: string
  specialization: string
  bmdcNumber: string
  experience: number
  currentPosition: string
  hospital: string
  chamberName: string
  chamberAddress: string
  chamberDays: string[]
  chamberTime: string
  consultationFee: number
  phone: string
}

export const useDoctorStore = defineStore('doctor', () => {
  const doctors = ref<Doctor[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchDoctors = async () => {
    loading.value = true
    try {
      const response = await apiClient.getDoctors()
      doctors.value = response.data
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addDoctor = async (doctor: Omit<Doctor, 'id'>) => {
    try {
      const response = await apiClient.createDoctor(doctor)
      doctors.value.push(response.data)
      return response.data
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const updateDoctorItem = async (id: number, doctor: Partial<Doctor>) => {
    try {
      const response = await apiClient.updateDoctor(id, doctor)
      const index = doctors.value.findIndex(d => d.id === id)
      if (index !== -1) {
        doctors.value[index] = response.data
      }
      return response.data
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const deleteDoctorItem = async (id: number) => {
    try {
      await apiClient.deleteDoctor(id)
      doctors.value = doctors.value.filter(d => d.id !== id)
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  return {
    doctors,
    loading,
    error,
    fetchDoctors,
    addDoctor,
    updateDoctorItem,
    deleteDoctorItem,
  }
})
