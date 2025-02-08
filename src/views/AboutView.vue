<script setup lang="ts">
import { ref } from 'vue';

</script>

<template>
  <div class="flex container bg-amber-600 mx-auto justify-center mt-4">
    <div class="bg-white rounded-xl p-4">
      <h1 class="text-3xl font-bold mb-4">About</h1>
      <p class="mb-4">This
        <strong>Vue 3</strong> application is a simple writing app that allows users to create and manage writing tasks. The app is built with
        <strong>Vue 3</strong> and
        <strong>Tailwind CSS</strong>. The app uses the
        <strong>Composition API</strong> and
        <strong>Vue Router</strong> for navigation. The app is a single-page application (SPA) that uses the browser's
        <strong>localStorage</strong> to store data. The app is designed to be simple and easy to use, with a clean and intuitive user interface.</p>
      <p class="mb-4">The app has the following features:</p>
      <ul class="list-disc ml-6 mb-4">
        <li>Create new writing tasks</li>
        <li>Edit existing writing tasks</li>
        <li>Delete writing tasks</li>
        <li>View writing tasks</li>
      </ul>
      <p class="mb-4">The app is designed to be responsive and work well on desktop and mobile devices. The app is a work in progress and may be updated with new features and improvements in the future.</p>
    </div>
  </div>
</template>
