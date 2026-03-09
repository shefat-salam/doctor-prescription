<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-900">Favorite Medicines</h2>

    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <div v-if="favoriteMedications.length > 0" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="med in favoriteMedications"
            :key="med.id"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
          >
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold text-gray-900">{{ med.medicineName }}</h3>
              <button
                @click="removeFavorite(med.id)"
                class="text-red-500 hover:text-red-700"
                title="Remove from favorites"
              >
                ×
              </button>
            </div>
            <p class="text-sm text-gray-600">{{ med.genericName }}</p>
            <div class="mt-3 flex gap-2 text-xs">
              <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded">{{ med.type }}</span>
              <span class="px-2 py-1 bg-green-100 text-green-700 rounded">{{ med.strength }}</span>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-gray-500 text-center py-12">
        No favorite medicines yet. Add medicines to favorites from the Medicine List.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useMedicationStore } from '../../stores/medicationStore'

const medicationStore = useMedicationStore()
const favorites = ref<number[]>([])

const favoriteMedications = computed(() =>
  medicationStore.medications.filter((m) => favorites.value.includes(m.id))
)

const removeFavorite = (id: number) => {
  const index = favorites.value.indexOf(id)
  if (index > -1) {
    favorites.value.splice(index, 1)
    localStorage.setItem('favoriteMedicines', JSON.stringify(favorites.value))
  }
}

onMounted(async () => {
  await medicationStore.fetchMedications()
  const stored = localStorage.getItem('favoriteMedicines')
  if (stored) {
    favorites.value = JSON.parse(stored)
  }
})
</script>
