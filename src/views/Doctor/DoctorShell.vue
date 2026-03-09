<template>
  <DoctorLayout>
    <template #title>{{ title }}</template>
    <router-view />
  </DoctorLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DoctorLayout from '../../layouts/DoctorLayout.vue'

const route = useRoute()
const title = computed(() => (route.meta.title as string) || 'Doctor')
</script>
