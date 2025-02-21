<template>
  <div>
    <div class="h-[calc(100vh-100px)] overflow-auto">
      <h2 class="text-lg font-semibold pb-2">How to structure an {{ guide.textType }}</h2>
      <p class="text-gray-600 pb-4">Follow these steps for the basic structure</p>
      <div v-for="(item, index) in guide.structure" :key="index" class="flex flex-col overflow-y-auto shadow-md mb-4">
        <div class="bg-yellow-50 p-4 rounded-md">
          <h3 class="font-bold">{{ item.header }}</h3>
          <p>{{ item.content }}</p>
          <p class="italic text-gray-600">Example: {{ item.example }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { guidesForTextTypes } from '@/data'

const guide = guidesForTextTypes.find(item => item.id === 1)
</script>

<style scoped>
/* Add any necessary styles here */
</style>