import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiClient } from '../services/api'

export interface Patient {
  id: number
  name: string
  gender: string
  age: number
  dob: string
  phone: string
  email: string
  address: string
  bloodGroup: string
  weight: string
  height: string
  allergies: string
  chronicDisease: string
  emergencyContactName: string
  emergencyPhone: string
  relationship: string
  doctorId: number
}

export const usePatientStore = defineStore('patient', () => {
  const patients = ref<Patient[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchPatients = async (doctorId?: number) => {
    loading.value = true
    try {
      const response = await apiClient.getPatients(doctorId)
      patients.value = response.data
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addPatient = async (patient: Omit<Patient, 'id'>) => {
    try {
      const response = await apiClient.createPatient(patient)
      patients.value.push(response.data)
      return response.data
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const updatePatientItem = async (id: number, patient: Partial<Patient>) => {
    try {
      const response = await apiClient.updatePatient(id, patient)
      const index = patients.value.findIndex(p => p.id === id)
      if (index !== -1) {
        patients.value[index] = response.data
      }
      return response.data
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const deletePatientItem = async (id: number) => {
    try {
      await apiClient.deletePatient(id)
      patients.value = patients.value.filter(p => p.id !== id)
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  return {
    patients,
    loading,
    error,
    fetchPatients,
    addPatient,
    updatePatientItem,
    deletePatientItem,
  }
})
