<template>
  <div>
    <div
      class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-6xl"
    >
      <div class="md:flex w-full">
        <div class="md:shrink-0">
          <img
            class="h-48 w-full md:h-full md:w-48"
            :src="img"
            alt="Class Image"
          />
        </div>
        <div class="p-8 md:flex-1">
          <div
            class="uppercase tracking-wide underline animate-pulse text-indigo-500 font-semibold"
          >
            {{ activity }}
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
        
        <div class="flex md:flex-col items-center justify-between p-4 md:p-2">
          <p class="tag">
            {{ course }}
          </p>
          <div class="flex items-end p-4">
          <RouterLink
            :to="classLink"
            class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
          >
            View
          </RouterLink>
        </div>

        </div>


      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  activity: String,
  teacher: String,
  date: String,
  time: String,
  img: String,
  course: String,
  classLink: String
})
</script>