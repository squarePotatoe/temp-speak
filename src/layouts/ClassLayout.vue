<template>
  <Header @toggleSidebar="toggleSidebar" />
  <div class="max-w-7xl mx-auto flex">
    <Sidebar :open="isSidebarOpen" class="md:hidden"/>
    <RouterView />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import { RouterView } from 'vue-router'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  console.log(isSidebarOpen.value)
}
</script>
