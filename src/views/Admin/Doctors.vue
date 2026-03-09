<template>
  <div class="space-y-4 lg:space-y-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 class="text-2xl font-bold text-gray-900">Doctor Management</h2>
      <button
        @click="showForm = true; resetForm()"
        class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
      >
        + Add Doctor
      </button>
    </div>

    <form v-if="showForm" @submit.prevent="submitDoctor" class="bg-white rounded-xl shadow-md p-4 lg:p-6">
      <!-- Photo Upload Section -->
      <div class="flex flex-col items-center mb-4 lg:mb-6">
        <div class="relative">
          <div class="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center border-4 border-purple-200 overflow-hidden">
            <img v-if="photoPreview || form.photo" :src="photoPreview || `/photos/${form.photo}`" alt="Doctor" class="w-full h-full object-cover" />
            <svg v-else class="w-12 h-12 lg:w-16 lg:h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <label class="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-1.5 lg:p-2 cursor-pointer shadow-lg transition duration-200">
            <svg class="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <input type="file" accept="image/*" @change="handlePhotoUpload" class="hidden" />
          </label>
        </div>
        <p class="text-xs lg:text-sm text-gray-500 mt-2">Click camera icon to upload photo</p>
      </div>

      <!-- Form Fields -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
      <input v-model="form.name" placeholder="Doctor name" class="border border-gray-300 rounded-lg px-3 py-2 text-sm lg:text-base" required />
      <select v-model="form.gender" class="border border-gray-300 rounded-lg px-3 py-2 text-sm lg:text-base" required>
        <option disabled value="">Select gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <select v-model="form.specialization" class="border border-gray-300 rounded-lg px-3 py-2 text-sm lg:text-base" required>
        <option disabled value="">Select specialization</option>
        <option value="Cardiology">Cardiology</option>
        <option value="Medicine Specialist">Medicine Specialist</option>
        <option value="Child Specialist">Child Specialist</option>
        <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
        <option value="Gynecology & Obstetrics">Gynecology & Obstetrics</option>
        <option value="Skin Specialist">Skin Specialist</option>
      </select>
      <input v-model="form.bmdcNumber" placeholder="BMDC number" class="border border-gray-300 rounded-lg px-3 py-2 text-sm lg:text-base" required />
      <input v-model.number="form.experience" type="number" min="0" placeholder="Experience (years)" class="border border-gray-300 rounded-lg px-3 py-2 text-sm lg:text-base" required />
      <select v-model="form.currentPosition" class="border border-gray-300 rounded-lg px-3 py-2 text-sm lg:text-base" required>
        <option disabled value="">Select current position</option>
        <option value="Consultant">Consultant</option>
        <option value="Assistant Professor">Assistant Professor</option>
        <option value="Associate Professor">Associate Professor</option>
        <option value="Professor">Professor</option>
        <option value="Registrar">Registrar</option>
        <option value="Junior Consultant">Junior Consultant</option>
      </select>
      <input v-model="form.hospital" placeholder="Hospital" class="border border-gray-300 rounded-lg px-3 py-2 text-sm lg:text-base" required />
      <input v-model="form.chamberName" placeholder="Chamber name" class="border border-gray-300 rounded-lg px-3 py-2 text-sm lg:text-base" required />
      <input v-model="form.chamberAddress" placeholder="Chamber address" class="border border-gray-300 rounded-lg px-3 py-2 text-sm lg:text-base" required />
      <input v-model="form.chamberTime" placeholder="Chamber time (e.g. 5:00 PM - 9:00 PM)" class="border border-gray-300 rounded-lg px-3 py-2 text-sm lg:text-base" required />
      <input v-model.number="form.consultationFee" type="number" min="0" placeholder="Consultation fee" class="border border-gray-300 rounded-lg px-3 py-2 text-sm lg:text-base" required />
      <input v-model="form.phone" placeholder="Phone" class="border border-gray-300 rounded-lg px-3 py-2 text-sm lg:text-base" required />
      <input v-model="form.qualification" placeholder="Qualification" class="border border-gray-300 rounded-lg px-3 py-2 text-sm lg:text-base sm:col-span-2 lg:col-span-3" required />
      <input v-model="form.chamberDays" placeholder="Chamber days (comma separated)" class="border border-gray-300 rounded-lg px-3 py-2 text-sm lg:text-base sm:col-span-2 lg:col-span-3" required />
      <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 lg:py-3 rounded-lg text-sm lg:text-base transition duration-200">
        {{ editingId ? 'Update Doctor' : 'Add Doctor' }}
      </button>
      <button
        type="button"
        @click="showForm = false; resetForm()"
        class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2.5 lg:py-3 rounded-lg text-sm lg:text-base transition duration-200"
      >
        Cancel
      </button>
      </div>
    </form>

    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <!-- Search Bar -->
      <div class="p-3 lg:p-4 border-b border-gray-200">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search doctor by name..."
            class="w-full pl-10 pr-4 py-2 text-sm lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
      
      <div class="overflow-x-auto max-h-[400px] md:max-h-[500px] lg:max-h-[600px] overflow-y-auto">
        <table class="w-full text-xs sm:text-sm">
          <thead class="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th class="text-left px-2 sm:px-4 py-3">Photo</th>
              <th class="text-left px-2 sm:px-4 py-3 cursor-pointer hover:bg-gray-100" @click="toggleSort">
                <div class="flex items-center gap-1 sm:gap-2">
                  Name
                  <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="sortOrder === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </th>
              <th class="text-left px-2 sm:px-4 py-3 hidden sm:table-cell">Gender</th>
              <th class="text-left px-2 sm:px-4 py-3">Specialization</th>
              <th class="text-left px-2 sm:px-4 py-3 hidden md:table-cell">BMDC</th>
              <th class="text-left px-2 sm:px-4 py-3 hidden lg:table-cell">Experience</th>
              <th class="text-left px-2 sm:px-4 py-3 hidden xl:table-cell">Position</th>
              <th class="text-left px-2 sm:px-4 py-3 hidden lg:table-cell">Hospital</th>
              <th class="text-left px-2 sm:px-4 py-3 hidden md:table-cell">Chamber</th>
              <th class="text-left px-2 sm:px-4 py-3 hidden xl:table-cell">Fee (৳)</th>
              <th class="text-left px-2 sm:px-4 py-3 hidden lg:table-cell">Phone</th>
              <th class="text-left px-2 sm:px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="doctor in sortedDoctors" :key="doctor.id" class="border-t hover:bg-gray-50">
              <td class="px-2 sm:px-4 py-3">
                <img v-if="doctor.photo" :src="`/photos/${doctor.photo}`" alt="Doctor" class="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" />
                <div v-else class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg class="w-4 h-4 sm:w-6 sm:h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              </td>
              <td class="px-2 sm:px-4 py-3 font-medium">{{ doctor.name }}</td>
              <td class="px-2 sm:px-4 py-3 hidden sm:table-cell">{{ doctor.gender }}</td>
              <td class="px-2 sm:px-4 py-3">{{ doctor.specialization }}</td>
              <td class="px-2 sm:px-4 py-3 hidden md:table-cell">{{ doctor.bmdcNumber }}</td>
              <td class="px-2 sm:px-4 py-3 hidden lg:table-cell">{{ doctor.experience }} yrs</td>
              <td class="px-2 sm:px-4 py-3 hidden xl:table-cell">{{ doctor.currentPosition }}</td>
              <td class="px-2 sm:px-4 py-3 hidden lg:table-cell">{{ doctor.hospital }}</td>
              <td class="px-2 sm:px-4 py-3 hidden md:table-cell">{{ doctor.chamberName }}</td>
              <td class="px-2 sm:px-4 py-3 hidden xl:table-cell">{{ doctor.consultationFee }}</td>
              <td class="px-2 sm:px-4 py-3 hidden lg:table-cell">{{ doctor.phone }}</td>
              <td class="px-2 sm:px-4 py-3">
                <div class="flex flex-col sm:flex-row gap-1 sm:gap-2">
                  <button @click="startEdit(doctor.id)" class="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs sm:text-sm whitespace-nowrap">Edit</button>
                  <button @click="remove(doctor.id)" class="px-2 sm:px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs sm:text-sm whitespace-nowrap">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue'
import { useDoctorStore } from '../../stores/doctorStore'

const doctorStore = useDoctorStore()
const editingId = ref<number | null>(null)
const showForm = ref(false)
const photoPreview = ref<string>('')
const sortOrder = ref<'asc' | 'desc'>('asc')
const searchQuery = ref<string>('')
const form = reactive({
  name: '',
  photo: '',
  gender: '',
  qualification: '',
  specialization: '',
  bmdcNumber: '',
  experience: 0,
  currentPosition: '',
  hospital: '',
  chamberName: '',
  chamberAddress: '',
  chamberDays: '',
  chamberTime: '',
  consultationFee: 0,
  phone: '',
})

const sortedDoctors = computed(() => {
  let doctors = [...doctorStore.doctors]
  
  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    doctors = doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(query)
    )
  }
  
  // Sort by name
  return doctors.sort((a, b) => {
    if (sortOrder.value === 'asc') {
      return a.name.localeCompare(b.name)
    } else {
      return b.name.localeCompare(a.name)
    }
  })
})

const toggleSort = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const toPayload = () => ({
  name: form.name,
  photo: form.photo,
  gender: form.gender,
  qualification: form.qualification,
  specialization: form.specialization,
  bmdcNumber: form.bmdcNumber,
  experience: form.experience,
  currentPosition: form.currentPosition,
  hospital: form.hospital,
  chamberName: form.chamberName,
  chamberAddress: form.chamberAddress,
  chamberDays: form.chamberDays.split(',').map((day) => day.trim()).filter(Boolean),
  chamberTime: form.chamberTime,
  consultationFee: form.consultationFee,
  phone: form.phone,
})

const handlePhotoUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    form.photo = file.name
    
    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      photoPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const resetForm = () => {
  photoPreview.value = ''
  form.name = ''
  form.photo = ''
  form.gender = ''
  form.qualification = ''
  form.specialization = ''
  form.bmdcNumber = ''
  form.experience = 0
  form.currentPosition = ''
  form.hospital = ''
  form.chamberName = ''
  form.chamberAddress = ''
  form.chamberDays = ''
  form.chamberTime = ''
  form.consultationFee = 0
  form.phone = ''
  editingId.value = null
}

const submitDoctor = async () => {
  const payload = toPayload()
  if (editingId.value) {
    await doctorStore.updateDoctorItem(editingId.value, payload)
  } else {
    await doctorStore.addDoctor(payload)
  }
  showForm.value = false
  resetForm()
}

const startEdit = (id: number) => {
  const doctor = doctorStore.doctors.find((item) => item.id === id)
  if (!doctor) return
  photoPreview.value = ''
  showForm.value = true
  editingId.value = id
  form.name = doctor.name
  form.photo = doctor.photo
  form.gender = doctor.gender
  form.qualification = doctor.qualification
  form.specialization = doctor.specialization
  form.bmdcNumber = doctor.bmdcNumber
  form.experience = doctor.experience
  form.currentPosition = doctor.currentPosition
  form.hospital = doctor.hospital
  form.chamberName = doctor.chamberName
  form.chamberAddress = doctor.chamberAddress
  form.chamberDays = doctor.chamberDays.join(', ')
  form.chamberTime = doctor.chamberTime
  form.consultationFee = doctor.consultationFee
  form.phone = doctor.phone
}

const remove = async (id: number) => {
  await doctorStore.deleteDoctorItem(id)
}

onMounted(async () => {
  await doctorStore.fetchDoctors()
})
</script>
