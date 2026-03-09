<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-900">Settings</h2>

    <!-- Prescription Template Settings -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Prescription Template</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Header Text</label>
          <textarea
            v-model="settings.headerText"
            rows="3"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter header text for prescription..."
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Footer Text</label>
          <textarea
            v-model="settings.footerText"
            rows="3"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter footer text for prescription..."
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Print Layout Settings -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Print Layout</h3>
      <div class="space-y-4">
        <div>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              v-model="settings.showDoctorPhoto"
              type="checkbox"
              class="w-4 h-4 text-green-600 focus:ring-green-500 rounded"
            />
            <span class="text-sm text-gray-700">Show doctor photo on prescription</span>
          </label>
        </div>
        <div>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              v-model="settings.showSignature"
              type="checkbox"
              class="w-4 h-4 text-green-600 focus:ring-green-500 rounded"
            />
            <span class="text-sm text-gray-700">Show signature on prescription</span>
          </label>
        </div>
        <div>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              v-model="settings.showBMDC"
              type="checkbox"
              class="w-4 h-4 text-green-600 focus:ring-green-500 rounded"
            />
            <span class="text-sm text-gray-700">Show BMDC number</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Default Dosage Patterns -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Default Dosage Patterns</h3>
      <div class="space-y-3">
        <div v-for="(_pattern, index) in settings.defaultDosages" :key="index" class="flex gap-2">
          <input
            v-model="settings.defaultDosages[index]"
            type="text"
            class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., 1+0+1 (Morning + Night)"
          />
          <button
            @click="removePattern(index)"
            class="px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition"
          >
            Remove
          </button>
        </div>
        <button
          @click="addPattern"
          class="w-full px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition"
        >
          + Add Pattern
        </button>
      </div>
    </div>

    <!-- Save Button -->
    <div class="flex justify-end">
      <button
        @click="saveSettings"
        class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
      >
        Save Settings
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'

const settings = reactive({
  headerText: '',
  footerText: '',
  showDoctorPhoto: true,
  showSignature: true,
  showBMDC: true,
  defaultDosages: ['1+0+1', '1+1+1', '0+0+1'],
})

const addPattern = () => {
  settings.defaultDosages.push('')
}

const removePattern = (index: number) => {
  settings.defaultDosages.splice(index, 1)
}

const saveSettings = () => {
  localStorage.setItem('doctorSettings', JSON.stringify(settings))
  alert('Settings saved successfully!')
}

onMounted(() => {
  const stored = localStorage.getItem('doctorSettings')
  if (stored) {
    Object.assign(settings, JSON.parse(stored))
  }
})
</script>
