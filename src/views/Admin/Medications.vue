<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 class="text-2xl font-bold text-gray-900">Medication Management</h2>
      <button
        @click="showForm = true; resetForm()"
        class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
      >
        + Add Medication
      </button>
    </div>

    <form v-if="showForm" @submit.prevent="submitMedication" class="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <input v-model="form.medicineName" placeholder="Medicine name" class="border border-gray-300 rounded-lg px-3 py-2" required />
      <input v-model="form.genericName" placeholder="Generic name" class="border border-gray-300 rounded-lg px-3 py-2" required />
      <input v-model="form.type" placeholder="Type (Tablet/Syrup/etc.)" class="border border-gray-300 rounded-lg px-3 py-2" required />
      <select v-model="form.strength" class="border border-gray-300 rounded-lg px-3 py-2" required>
        <option disabled value="">Select strength</option>
        <option value="2.5 mg">2.5 mg</option>
        <option value="5 mg">5 mg</option>
        <option value="10 mg">10 mg</option>
        <option value="20 mg">20 mg</option>
        <option value="25 mg">25 mg</option>
        <option value="40 mg">40 mg</option>
        <option value="50 mg">50 mg</option>
        <option value="75 mg">75 mg</option>
        <option value="100 mg">100 mg</option>
        <option value="125 mg">125 mg</option>
        <option value="150 mg">150 mg</option>
        <option value="200 mg">200 mg</option>
        <option value="250 mg">250 mg</option>
        <option value="300 mg">300 mg</option>
        <option value="400 mg">400 mg</option>
        <option value="500 mg">500 mg</option>
        <option value="600 mg">600 mg</option>
        <option value="750 mg">750 mg</option>
        <option value="1000 mg">1000 mg</option>
        <option value="5 mg/5 ml">5 mg/5 ml</option>
        <option value="10 mg/5 ml">10 mg/5 ml</option>
        <option value="50 mg/5 ml">50 mg/5 ml</option>
        <option value="100 mg/5 ml">100 mg/5 ml</option>
        <option value="125 mg/5 ml">125 mg/5 ml</option>
        <option value="250 mg/5 ml">250 mg/5 ml</option>
        <option value="1 g">1 g</option>
        <option value="2 g">2 g</option>
      </select>
      <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg">
        {{ editingId ? 'Update Medication' : 'Add Medication' }}
      </button>
      <button
        type="button"
        @click="showForm = false; resetForm()"
        class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 rounded-lg"
      >
        Cancel
      </button>
    </form>

    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <div class="p-4 border-b border-gray-200">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by medicine, generic, type, or strength..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="text-left px-4 py-3">Medicine</th>
            <th class="text-left px-4 py-3">Generic</th>
            <th class="text-left px-4 py-3">Type</th>
            <th class="text-left px-4 py-3">Strength</th>
            <th class="text-left px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="med in filteredMedications" :key="med.id" class="border-t">
            <td class="px-4 py-3">{{ med.medicineName }}</td>
            <td class="px-4 py-3">{{ med.genericName }}</td>
            <td class="px-4 py-3">{{ med.type }}</td>
            <td class="px-4 py-3">{{ med.strength }}</td>
            <td class="px-4 py-3 space-x-2">
              <button @click="startEdit(med.id)" class="px-3 py-1 bg-blue-100 text-blue-700 rounded">Edit</button>
              <button @click="remove(med.id)" class="px-3 py-1 bg-red-100 text-red-700 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useMedicationStore } from '../../stores/medicationStore'

const medicationStore = useMedicationStore()
const editingId = ref<number | null>(null)
const showForm = ref(false)
const searchQuery = ref('')
const form = reactive({
  medicineName: '',
  genericName: '',
  type: '',
  strength: '',
})

const filteredMedications = computed(() => {
  if (!searchQuery.value.trim()) return medicationStore.medications

  const query = searchQuery.value.toLowerCase()
  return medicationStore.medications.filter((med) =>
    med.medicineName.toLowerCase().includes(query) ||
    med.genericName.toLowerCase().includes(query) ||
    med.type.toLowerCase().includes(query) ||
    med.strength.toLowerCase().includes(query)
  )
})

const resetForm = () => {
  form.medicineName = ''
  form.genericName = ''
  form.type = ''
  form.strength = ''
  editingId.value = null
}

const submitMedication = async () => {
  const payload = {
    medicineName: form.medicineName,
    genericName: form.genericName,
    type: form.type,
    strength: form.strength,
  }

  if (editingId.value) {
    await medicationStore.updateMedicationItem(editingId.value, payload)
  } else {
    await medicationStore.addMedication(payload)
  }

  showForm.value = false
  resetForm()
}

const startEdit = (id: number) => {
  const med = medicationStore.medications.find((item) => item.id === id)
  if (!med) return
  showForm.value = true
  editingId.value = id
  form.medicineName = med.medicineName
  form.genericName = med.genericName
  form.type = med.type
  form.strength = med.strength
}

const remove = async (id: number) => {
  await medicationStore.deleteMedicationItem(id)
}

onMounted(async () => {
  await medicationStore.fetchMedications()
})
</script>
