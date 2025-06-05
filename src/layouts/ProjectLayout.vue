<template>
  <Header @toggleSidebar="toggleSidebar" />
  <div class="max-w-7xl mx-auto flex">
    <SidebarProject :open="isSidebarOpen" />
    <RouterView />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "@/components/Header.vue";
import { RouterView } from "vue-router";
import SidebarProject from "@/components/SidebarProject.vue";

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  console.log(isSidebarOpen.value);
};
</script>
