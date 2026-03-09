import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiClient } from '../services/api'

export interface Clinic {
  id: number
  name: string
  address: string
  phone: string
  email: string
}

export const useClinicStore = defineStore('clinic', () => {
  const clinics = ref<Clinic[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchClinics = async () => {
    loading.value = true
    try {
      const response = await apiClient.getClinics()
      clinics.value = response.data
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addClinic = async (clinic: Omit<Clinic, 'id'>) => {
    try {
      const response = await apiClient.createClinic(clinic)
      clinics.value.push(response.data)
      return response.data
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const updateClinicItem = async (id: number, clinic: Partial<Clinic>) => {
    try {
      const response = await apiClient.updateClinic(id, clinic)
      const index = clinics.value.findIndex(c => c.id === id)
      if (index !== -1) {
        clinics.value[index] = response.data
      }
      return response.data
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const deleteClinicItem = async (id: number) => {
    try {
      await apiClient.deleteClinic(id)
      clinics.value = clinics.value.filter(c => c.id !== id)
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  return {
    clinics,
    loading,
    error,
    fetchClinics,
    addClinic,
    updateClinicItem,
    deleteClinicItem,
  }
})
