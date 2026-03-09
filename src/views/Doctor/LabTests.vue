<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-900">Lab Tests</h2>

    <!-- Search Bar -->
    <div class="bg-white rounded-xl shadow-md p-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search lab tests..."
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    <!-- Lab Tests Grid -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <div v-if="filteredLabTests.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="test in filteredLabTests"
          :key="test.id"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
        >
          <h3 class="font-semibold text-gray-900 mb-2">{{ test.name }}</h3>
          <p class="text-sm text-gray-600 mb-3">{{ test.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-green-600">{{ test.category }}</span>
            <button
              @click="addToRecommended(test.id)"
              class="px-3 py-1 bg-green-100 text-green-700 hover:bg-green-200 rounded transition text-xs"
            >
              Add to Recommended
            </button>
          </div>
        </div>
      </div>
      <p v-else class="text-gray-500 text-center py-8">No lab tests found</p>
    </div>

    <!-- Recommended Tests -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">My Recommended Tests</h3>
      <div v-if="recommendedTests.length > 0" class="space-y-2">
        <div
          v-for="test in recommendedTests"
          :key="test.id"
          class="flex justify-between items-center border border-gray-200 rounded-lg p-3"
        >
          <span class="font-medium text-gray-900">{{ test.name }}</span>
          <button
            @click="removeFromRecommended(test.id)"
            class="text-red-500 hover:text-red-700 text-sm"
          >
            Remove
          </button>
        </div>
      </div>
      <p v-else class="text-gray-500 text-center py-8">No recommended tests yet</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useLabTestStore } from '../../stores/labTestStore'

const labTestStore = useLabTestStore()
const searchQuery = ref('')
const recommended = ref<number[]>([])

const filteredLabTests = computed(() => {
  if (!searchQuery.value.trim()) return labTestStore.labTests

  const query = searchQuery.value.toLowerCase()
  return labTestStore.labTests.filter(
    (t) =>
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query)
  )
})

const recommendedTests = computed(() =>
  labTestStore.labTests.filter((t) => recommended.value.includes(t.id))
)

const addToRecommended = (id: number) => {
  if (!recommended.value.includes(id)) {
    recommended.value.push(id)
    localStorage.setItem('recommendedTests', JSON.stringify(recommended.value))
  }
}

const removeFromRecommended = (id: number) => {
  const index = recommended.value.indexOf(id)
  if (index > -1) {
    recommended.value.splice(index, 1)
    localStorage.setItem('recommendedTests', JSON.stringify(recommended.value))
  }
}

onMounted(async () => {
  await labTestStore.fetchLabTests()
  const stored = localStorage.getItem('recommendedTests')
  if (stored) {
    recommended.value = JSON.parse(stored)
  }
})
</script>
