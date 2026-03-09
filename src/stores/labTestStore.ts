import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiClient } from '../services/api'

export interface LabTest {
  id: number
  name: string
  description: string
  category: string
}

export const useLabTestStore = defineStore('labTest', () => {
  const labTests = ref<LabTest[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchLabTests = async () => {
    loading.value = true
    try {
      const response = await apiClient.getLabTests()
      labTests.value = response.data
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addLabTest = async (labTest: Omit<LabTest, 'id'>) => {
    try {
      const response = await apiClient.createLabTest(labTest)
      labTests.value.push(response.data)
      return response.data
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const updateLabTestItem = async (id: number, labTest: Partial<LabTest>) => {
    try {
      const response = await apiClient.updateLabTest(id, labTest)
      const index = labTests.value.findIndex(t => t.id === id)
      if (index !== -1) {
        labTests.value[index] = response.data
      }
      return response.data
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  const deleteLabTestItem = async (id: number) => {
    try {
      await apiClient.deleteLabTest(id)
      labTests.value = labTests.value.filter(t => t.id !== id)
    } catch (err: any) {
      error.value = err.message
      throw err
    }
  }

  return {
    labTests,
    loading,
    error,
    fetchLabTests,
    addLabTest,
    updateLabTestItem,
    deleteLabTestItem,
  }
})
