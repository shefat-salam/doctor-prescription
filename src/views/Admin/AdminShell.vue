<template>
  <AdminLayout>
    <template #title>{{ title }}</template>
    <router-view />
  </AdminLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AdminLayout from '../../layouts/AdminLayout.vue'

const route = useRoute()
const title = computed(() => (route.meta.title as string) || 'Admin')
</script>
