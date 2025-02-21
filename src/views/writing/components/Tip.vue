<template>
  <div>
    <div class="mb-4">
        <div class="p-4 rounded-md" :class="{ 'bg-green-200' : isDone, 'bg-yellow-50' : !isDone}">
          <div class="flex">
          <div class="flex flex-col gap-1 items-start">
            <h3 class="font-bold">{{ props.header }}</h3>
            <p>{{ props.content }}</p>
            <p class="italic text-gray-600">Example: {{ props.example }}</p>
          </div>
          <label class="flex items-center h-fit  rounded-full bg-white cursor-pointer">
            <input type="checkbox" v-model="isDone" class="hidden" />
            <span class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center" :class="{ 'bg-red-200' : !isDone}">
              <svg v-if="isDone" class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <svg v-else class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </span>
          </label>
          </div>


        </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  header: {
    type: String,
    modelValue: String,
  },
  content: {
    type: String,
    modelValue: String,
  },
  example: {
    type: String,
    modelValue: String,
  },
})

const isDone = ref(false)
</script>
