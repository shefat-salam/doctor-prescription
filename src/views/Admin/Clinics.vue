<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 class="text-2xl font-bold text-gray-900">Clinic Management</h2>
      <button
        @click="showForm = true; resetForm()"
        class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
      >
        + Add Clinic
      </button>
    </div>

    <form v-if="showForm" @submit.prevent="submitClinic" class="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <input v-model="form.name" placeholder="Clinic name" class="border border-gray-300 rounded-lg px-3 py-2" required />
      <input v-model="form.email" placeholder="Email" class="border border-gray-300 rounded-lg px-3 py-2" required />
      <input v-model="form.phone" placeholder="Phone" class="border border-gray-300 rounded-lg px-3 py-2" required />
      <input v-model="form.address" placeholder="Address" class="border border-gray-300 rounded-lg px-3 py-2" required />
      <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg">
        {{ editingId ? 'Update Clinic' : 'Add Clinic' }}
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
            placeholder="Search by clinic name, phone, or email..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      <table class="w-full text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="text-left px-4 py-3">Name</th>
            <th class="text-left px-4 py-3">Phone</th>
            <th class="text-left px-4 py-3">Email</th>
            <th class="text-left px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="clinic in filteredClinics" :key="clinic.id" class="border-t">
            <td class="px-4 py-3">{{ clinic.name }}</td>
            <td class="px-4 py-3">{{ clinic.phone }}</td>
            <td class="px-4 py-3">{{ clinic.email }}</td>
            <td class="px-4 py-3 space-x-2">
              <button @click="startEdit(clinic.id)" class="px-3 py-1 bg-blue-100 text-blue-700 rounded">Edit</button>
              <button @click="remove(clinic.id)" class="px-3 py-1 bg-red-100 text-red-700 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useClinicStore } from '../../stores/clinicStore'

const clinicStore = useClinicStore()
const editingId = ref<number | null>(null)
const showForm = ref(false)
const searchQuery = ref('')
const form = reactive({ name: '', address: '', phone: '', email: '' })

const filteredClinics = computed(() => {
  if (!searchQuery.value.trim()) return clinicStore.clinics

  const query = searchQuery.value.toLowerCase()
  return clinicStore.clinics.filter((clinic) =>
    clinic.name.toLowerCase().includes(query) ||
    clinic.phone.toLowerCase().includes(query) ||
    clinic.email.toLowerCase().includes(query)
  )
})

const resetForm = () => {
  form.name = ''
  form.address = ''
  form.phone = ''
  form.email = ''
  editingId.value = null
}

const submitClinic = async () => {
  if (editingId.value) {
    await clinicStore.updateClinicItem(editingId.value, { ...form })
  } else {
    await clinicStore.addClinic({ ...form })
  }
  showForm.value = false
  resetForm()
}

const startEdit = (id: number) => {
  const clinic = clinicStore.clinics.find((item) => item.id === id)
  if (!clinic) return
  showForm.value = true
  editingId.value = id
  form.name = clinic.name
  form.address = clinic.address
  form.phone = clinic.phone
  form.email = clinic.email
}

const remove = async (id: number) => {
  await clinicStore.deleteClinicItem(id)
}

onMounted(async () => {
  await clinicStore.fetchClinics()
})
</script>
