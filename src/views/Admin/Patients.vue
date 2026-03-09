<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 class="text-2xl font-bold text-gray-900">Patient Management</h2>
      <button
        @click="showForm = true; resetForm()"
        class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
      >
        + Add Patient
      </button>
    </div>

    <!-- Add/Edit Patient Form -->
    <form v-if="showForm" @submit.prevent="submitPatient" class="bg-white rounded-xl shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ editingId ? 'Edit Patient' : 'Add New Patient' }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            v-model="form.name"
            type="text"
            required
            placeholder="Md. Rahim"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
          <select
            v-model="form.gender"
            required
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
          <input
            v-model="form.dob"
            type="date"
            required
            @change="updateAge"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            v-model="form.age"
            type="number"
            readonly
            class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Blood Group *</label>
          <select
            v-model="form.bloodGroup"
            required
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select blood group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <input
            v-model="form.phone"
            type="tel"
            required
            placeholder="01712345678"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="email@example.com"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
          <input
            v-model="form.weight"
            type="text"
            placeholder="72"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Height (ft)</label>
          <input
            v-model="form.height"
            type="text"
            placeholder="5.7"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Address *</label>
          <textarea
            v-model="form.address"
            required
            rows="2"
            placeholder="Chandpur, Bangladesh"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
          <input
            v-model="form.allergies"
            type="text"
            placeholder="Penicillin, Aspirin..."
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Chronic Disease</label>
          <input
            v-model="form.chronicDisease"
            type="text"
            placeholder="Diabetes, Hypertension..."
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div class="col-span-1 md:col-span-2 lg:col-span-3">
          <h4 class="font-semibold text-gray-900 mb-3 mt-2">Emergency Contact</h4>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
          <input
            v-model="form.emergencyContactName"
            type="text"
            required
            placeholder="Fatema"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contact Phone *</label>
          <input
            v-model="form.emergencyPhone"
            type="tel"
            required
            placeholder="01812345678"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Relationship *</label>
          <select
            v-model="form.relationship"
            required
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select relationship</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Wife">Wife</option>
            <option value="Husband">Husband</option>
            <option value="Brother">Brother</option>
            <option value="Sister">Sister</option>
            <option value="Son">Son</option>
            <option value="Daughter">Daughter</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div class="flex gap-3 mt-6">
        <button type="submit" class="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition">
          {{ editingId ? 'Update Patient' : 'Add Patient' }}
        </button>
        <button type="button" @click="showForm = false; resetForm()" class="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded-lg transition">
          Cancel
        </button>
      </div>
    </form>

    <!-- Patient Table -->
    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <div class="p-4 border-b border-gray-200">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by patient name, phone, or ID..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 sticky top-0">
            <tr>
              <th class="text-left px-4 py-3">ID</th>
              <th class="text-left px-4 py-3">Name</th>
              <th class="text-left px-4 py-3">Age</th>
              <th class="text-left px-4 py-3">Gender</th>
              <th class="text-left px-4 py-3">Blood Group</th>
              <th class="text-left px-4 py-3">Phone</th>
              <th class="text-left px-4 py-3">Email</th>
              <th class="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody class="max-h-[500px] overflow-y-auto">
            <tr v-for="patient in filteredPatients" :key="patient.id" class="border-t hover:bg-gray-50">
              <td class="px-4 py-3 font-medium">{{ patient.id }}</td>
              <td class="px-4 py-3">{{ patient.name }}</td>
              <td class="px-4 py-3">{{ patient.age }}</td>
              <td class="px-4 py-3">{{ patient.gender }}</td>
              <td class="px-4 py-3"><span class="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">{{ patient.bloodGroup }}</span></td>
              <td class="px-4 py-3">{{ patient.phone }}</td>
              <td class="px-4 py-3 text-gray-500">{{ patient.email || '-' }}</td>
              <td class="px-4 py-3 space-x-2">
                <button @click="startEdit(patient.id)" class="px-3 py-1 bg-blue-100 text-blue-700 rounded">Edit</button>
                <button @click="remove(patient.id)" class="px-3 py-1 bg-red-100 text-red-700 rounded">Delete</button>
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
import { usePatientStore } from '../../stores/patientStore'

const patientStore = usePatientStore()
const searchQuery = ref('')
const showForm = ref(false)
const editingId = ref<number | null>(null)

const form = reactive({
  name: '',
  gender: '',
  age: 0,
  dob: '',
  phone: '',
  email: '',
  address: '',
  bloodGroup: '',
  weight: '',
  height: '',
  allergies: '',
  chronicDisease: '',
  emergencyContactName: '',
  emergencyPhone: '',
  relationship: '',
  doctorId: 1,
})

const filteredPatients = computed(() => {
  if (!searchQuery.value.trim()) return patientStore.patients

  const query = searchQuery.value.toLowerCase()
  return patientStore.patients.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.phone.includes(query) ||
      String(p.id).includes(query)
  )
})

const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

const updateAge = () => {
  if (form.dob) {
    form.age = calculateAge(form.dob)
  }
}

const resetForm = () => {
  form.name = ''
  form.gender = ''
  form.age = 0
  form.dob = ''
  form.phone = ''
  form.email = ''
  form.address = ''
  form.bloodGroup = ''
  form.weight = ''
  form.height = ''
  form.allergies = ''
  form.chronicDisease = ''
  form.emergencyContactName = ''
  form.emergencyPhone = ''
  form.relationship = ''
  form.doctorId = 1
  editingId.value = null
}

const submitPatient = async () => {
  try {
    const payload = {
      name: form.name,
      gender: form.gender,
      age: form.age,
      dob: form.dob,
      phone: form.phone,
      email: form.email,
      address: form.address,
      bloodGroup: form.bloodGroup,
      weight: form.weight,
      height: form.height,
      allergies: form.allergies,
      chronicDisease: form.chronicDisease,
      emergencyContactName: form.emergencyContactName,
      emergencyPhone: form.emergencyPhone,
      relationship: form.relationship,
      doctorId: form.doctorId,
    }

    if (editingId.value) {
      await patientStore.updatePatientItem(editingId.value, payload)
    } else {
      await patientStore.addPatient(payload)
    }

    showForm.value = false
    resetForm()
  } catch (error) {
    console.error('Failed to submit patient:', error)
  }
}

const startEdit = (id: number) => {
  const patient = patientStore.patients.find((p) => p.id === id)
  if (!patient) return

  editingId.value = id
  form.name = patient.name
  form.gender = patient.gender
  form.age = patient.age
  form.dob = patient.dob
  form.phone = patient.phone
  form.email = patient.email
  form.address = patient.address
  form.bloodGroup = patient.bloodGroup
  form.weight = patient.weight
  form.height = patient.height
  form.allergies = patient.allergies
  form.chronicDisease = patient.chronicDisease
  form.emergencyContactName = patient.emergencyContactName
  form.emergencyPhone = patient.emergencyPhone
  form.relationship = patient.relationship
  form.doctorId = patient.doctorId
  showForm.value = true
}

const remove = async (id: number) => {
  if (confirm('Are you sure you want to delete this patient?')) {
    await patientStore.deletePatientItem(id)
  }
}

onMounted(async () => {
  await patientStore.fetchPatients()
})
</script>
