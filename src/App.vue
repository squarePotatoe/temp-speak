<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
import MainLayout from "./layouts/MainLayout.vue";
</script>

<template>
  <main>
    <component :is="$route.meta.layout || 'div'" />
  </main>
</template>
