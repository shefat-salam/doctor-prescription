<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-900">Medicine List</h2>

    <!-- Search Bar -->
    <div class="bg-white rounded-xl shadow-md p-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search medicines by name or generic name..."
        class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    <!-- Medicine Table -->
    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 sticky top-0">
            <tr>
              <th class="text-left px-4 py-3">Medicine Name</th>
              <th class="text-left px-4 py-3">Generic Name</th>
              <th class="text-left px-4 py-3">Type</th>
              <th class="text-left px-4 py-3">Strength</th>
              <th class="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody class="max-h-[600px] overflow-y-auto">
            <tr v-for="med in filteredMedications" :key="med.id" class="border-t hover:bg-gray-50">
              <td class="px-4 py-3 font-semibold">{{ med.medicineName }}</td>
              <td class="px-4 py-3 text-gray-600">{{ med.genericName }}</td>
              <td class="px-4 py-3">{{ med.type }}</td>
              <td class="px-4 py-3">{{ med.strength }}</td>
              <td class="px-4 py-3">
                <button
                  @click="toggleFavorite(med.id)"
                  :class="[
                    'px-3 py-1 rounded transition text-xs',
                    isFavorite(med.id)
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  {{ isFavorite(med.id) ? '★ Favorite' : '☆ Add to Favorites' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useMedicationStore } from '../../stores/medicationStore'

const medicationStore = useMedicationStore()
const searchQuery = ref('')
const favorites = ref<number[]>([])

const filteredMedications = computed(() => {
  if (!searchQuery.value.trim()) return medicationStore.medications

  const query = searchQuery.value.toLowerCase()
  return medicationStore.medications.filter(
    (m) =>
      m.medicineName.toLowerCase().includes(query) ||
      m.genericName.toLowerCase().includes(query)
  )
})

const isFavorite = (id: number) => favorites.value.includes(id)

const toggleFavorite = (id: number) => {
  const index = favorites.value.indexOf(id)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(id)
  }
  localStorage.setItem('favoriteMedicines', JSON.stringify(favorites.value))
}

onMounted(async () => {
  await medicationStore.fetchMedications()
  const stored = localStorage.getItem('favoriteMedicines')
  if (stored) {
    favorites.value = JSON.parse(stored)
  }
})
</script>
