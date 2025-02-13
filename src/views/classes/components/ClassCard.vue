<template>
  <div>
    <div
      class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
    >
      <div class="md:flex">
        <div class="md:shrink-0">
          <img
            class="h-48 w-full object-cover md:h-full md:w-48"
            :src="img"
            alt="Class Image"
          />
        </div>
        <div class="p-8">
          <div
            class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
          >
            Article Writing
          </div>
          <RouterLink
            to="/writing"
            class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >
            {{ title }}
          </RouterLink>
          <p class="mt-2 text-slate-500">
            {{ description }}
          </p>
          <p class="mt-4">
            Teacher: <span class="text-indigo-500">{{ teacher }}</span>
          </p>
          <p>
            Date: <span class="text-indigo-500">{{ date }}</span>
          </p>
          <p>
            Time: <span class="text-indigo-500">{{ time }}</span>
          </p>
        </div>
        <div class="flex items-end p-4">
          <RouterLink
            to="/writing"
            class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
          >
            View
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: String,
  description: String,
  teacher: String,
  date: String,
  time: String,
  img: String,
})
</script>