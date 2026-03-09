import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiClient } from '../services/api'

export interface Medication {
  id: number
  medicineName: string
  genericName: string
  type: string
  strength: string
}

export const useMedicationStore = defineStore('medication', () => {
  const medications = ref<Medication[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchMedications = async () => {
    loading.value = true
    try {
      const response = await apiClient.getMedications()
      medications.value = response.data
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addMedication = async (medication: Omit<Medication, 'id'>) => {
    try {
      const response = await apiClient.createMedication(medication)
      medications.value.push(response.data)
      return response.data
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const updateMedicationItem = async (id: number, medication: Partial<Medication>) => {
    try {
      const response = await apiClient.updateMedication(id, medication)
      const index = medications.value.findIndex(m => m.id === id)
      if (index !== -1) {
        medications.value[index] = response.data
      }
      return response.data
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const deleteMedicationItem = async (id: number) => {
    try {
      await apiClient.deleteMedication(id)
      medications.value = medications.value.filter(m => m.id !== id)
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  return {
    medications,
    loading,
    error,
    fetchMedications,
    addMedication,
    updateMedicationItem,
    deleteMedicationItem,
  }
})
