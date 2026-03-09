import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiClient } from '../services/api'

export interface PrescriptionItem {
  id: number
  medicationId: number
  dosage: string
  frequency: string
  duration: string
}

export interface Prescription {
  id: number
  patientId: number
  doctorId: number
  date: string
  notes: string
  items: PrescriptionItem[]
}

export const usePrescriptionStore = defineStore('prescription', () => {
  const prescriptions = ref<Prescription[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchPrescriptions = async (doctorId?: number, patientId?: number) => {
    loading.value = true
    try {
      const response = await apiClient.getPrescriptions(doctorId, patientId)
      prescriptions.value = response.data
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addPrescription = async (prescription: Omit<Prescription, 'id'>) => {
    try {
      const response = await apiClient.createPrescription(prescription)
      prescriptions.value.push(response.data)
      return response.data
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const updatePrescriptionItem = async (id: number, prescription: Partial<Prescription>) => {
    try {
      const response = await apiClient.updatePrescription(id, prescription)
      const index = prescriptions.value.findIndex(p => p.id === id)
      if (index !== -1) {
        prescriptions.value[index] = response.data
      }
      return response.data
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const deletePrescriptionItem = async (id: number) => {
    try {
      await apiClient.deletePrescription(id)
      prescriptions.value = prescriptions.value.filter(p => p.id !== id)
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  return {
    prescriptions,
    loading,
    error,
    fetchPrescriptions,
    addPrescription,
    updatePrescriptionItem,
    deletePrescriptionItem,
  }
})
