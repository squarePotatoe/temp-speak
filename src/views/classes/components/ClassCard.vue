<template>
  <div>
    <div
      class="max-w-md md:max-w-6xl mx-auto max-h-fill md:max-h-70 bg-gradient-to-br from-white via-slate-50 to-gray-100 rounded-2xl shadow-lg overflow-hidden transition hover:shadow-2xl"
    >
      <div class="flex flex-col md:flex-row w-full">
        <div class="md:shrink-0">
          <img
            class="h-48 w-full md:h-full md:w-72"
            :src="img"
            alt="Class Image"
          />
        </div>
        <div class="p-6 md:p-8 flex-1 flex flex-col justify-between">
          <div>
            <div
              class="uppercase tracking-wide underline animate-pulse text-amber-500 font-semibold text-sm md:text-base"
            >
              {{ activity }}
            </div>
            <RouterLink
              :to="classLink"
              class="block mt-2 text-2xl md:text-3xl leading-tight font-bold text-indigo-900 hover:underline"
            >
              {{ title }}
            </RouterLink>
            <p class="mt-2 text-slate-600 text-base md:text-lg">
              {{ description }}
            </p>
            <p
              class="mt-2 text-slate-600 font-semibold underline text-base md:text-lg"
            >
              Text type: {{ textType }}
            </p>
          </div>
          <div class="mt-4 flex flex-wrap gap-4 text-sm md:text-base">
            <span>
              <span class="font-semibold text-slate-700">Teacher:</span>
              <span class="text-indigo-500">{{ teacher }}</span>
            </span>
            <span>
              <span class="font-semibold text-slate-700">Date:</span>
              <span class="text-indigo-500">{{ date }}</span>
            </span>
          </div>
        </div>
        <div
          class="flex flex-row md:flex-col items-center justify-between p-4 md:p-2 gap-2 md:gap-4 bg-white/70"
        >
          <p
            class="tag bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold text-xs md:text-sm"
          >
            {{ course }}
          </p>
          <RouterLink
            :to="classLink"
            class="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-full shadow transition text-base md:text-lg"
          >
            View
          </RouterLink>
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
  textType: String,
  teacher: String,
  date: String,
  time: String,
  img: String,
  course: String,
  classLink: String,
});
</script>
