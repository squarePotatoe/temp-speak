<template>
  <div>
    <div class="h-[calc(100vh-100px)] overflow-auto">
      <h2 class="text-lg font-semibold pb-2">How to structure an {{ guide.textType }}</h2>
      <p class="text-gray-600 ">Follow these steps for the basic structure</p>
      <p class="italic text-gray-500 pb-4">Mark the steps as you complete them</p>
      <div v-for="(item, index) in guide.structure" :key="index" class="flex flex-col overflow-y-auto shadow-md mb-4" >
        <Tip :header="item.header" :content="item.content" :example="item.example" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { guidesForTextTypes } from '@/data'
import Tip from './Tip.vue'

const guide = guidesForTextTypes.find(item => item.id === 1)

const isDone = ref(false)
</script>

<style scoped>
/* Add any necessary styles here */
</style>