<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden">
    <div class="p-4 border-b border-gray-200">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by user name, email, or role..."
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
          <th class="text-left px-4 py-3">Email</th>
          <th class="text-left px-4 py-3">Role</th>
          <th class="text-left px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id" class="border-t">
          <td class="px-4 py-3">{{ user.name }}</td>
          <td class="px-4 py-3">{{ user.email }}</td>
          <td class="px-4 py-3">
            <select v-model="user.role" @change="updateRole(user.id, user.role)" class="border border-gray-300 rounded px-2 py-1">
              <option value="admin">admin</option>
              <option value="doctor">doctor</option>
            </select>
          </td>
          <td class="px-4 py-3">
            <button @click="remove(user.id)" class="px-3 py-1 bg-red-100 text-red-700 rounded">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { apiClient } from '../../services/api'

interface UserRow {
  id: number
  name: string
  email: string
  role: 'admin' | 'doctor'
}

const users = ref<UserRow[]>([])
const searchQuery = ref('')

const filteredUsers = computed(() => {
  if (!searchQuery.value.trim()) return users.value

  const query = searchQuery.value.toLowerCase()
  return users.value.filter((user) =>
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    user.role.toLowerCase().includes(query)
  )
})

const loadUsers = async () => {
  const response = await apiClient.getUsers()
  users.value = response.data
}

const updateRole = async (id: number, role: 'admin' | 'doctor') => {
  await apiClient.updateUser(id, { role })
}

const remove = async (id: number) => {
  await apiClient.deleteUser(id)
  users.value = users.value.filter((user) => user.id !== id)
}

onMounted(loadUsers)
</script>
