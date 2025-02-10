<template>
    <!-- <div class="overlay fixed inset-0 bg-indigo-900/50 z-40 hidden opacity-0 transition-opacity duration-300"></div> -->
    <Header @toggleSidebar="toggleSidebar" />
    <div class="max-w-7xl mx-auto flex">
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

