<template>
  <header
    class="w-full bg-white text-indigo-800 z-50 shadow-lg animate-slide-down"
  >
    <div
      class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between h-16"
    >
      <button
        @click="toggleSidebar"
        class="mobile-menu-button mr p-2 lg:hidden"
      >
        <span class="material-icons-outlined text-2xl">menu</span>
      </button>
      <div class="text-xl font-bold text-amber-900">
        <RouterLink to="/" class="hover:text-amber-800">
          My <span class="text-amber-800">Dashboard</span>
        </RouterLink>
      </div>
      <RouterLink to="/profile" class="flex items-center space-x-2">
        <img
          class="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-110 object-cover"
          src="https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg"
          alt="Profile"
        />
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const emit = defineEmits(["toggleSidebar"]);
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  emit("toggleSidebar");
};
</script>
