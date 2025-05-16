<template>
  <div>
    <div
      class="group flex flex-col text-lg relative rounded-2xl bg-gradient-to-r from-blue-100 to-orange-sky p-2 mb-3 shadow-md transition hover:scale-105 hover:z-10"
    >
      <div class="flex items-center gap-2 mb-1">
        <span class="material-icons text-pink-400 text-2xl">translate</span>
        <span
          class="text-xl font-bold text-indigo-700 bg-white rounded-full px-4 py-1 shadow"
        >
          {{ props.word }}
        </span>
      </div>
      <!-- Popup card on hover -->
      <div
        class="w-[340px] group-hover:opacity-100 text-base transition-opacity bg-white text-slate-800 border-4 border-pink-200 rounded-2xl absolute left-0 top-14 opacity-0 z-[9999] pointer-events-none shadow-xl p-4"
      >
        <div class="flex gap-4 items-center">
          <div v-if="props.image" class="flex-shrink-0">
            <!-- <img
              :src="props.image"
              alt="Vocabulary image"
              class="w-24 h-24 object-cover rounded-xl border-2 border-indigo-200 bg-white"
            /> -->
          </div>
          <div class="flex flex-col gap-2">
            <div>
              <span class="font-semibold text-pink-700">Definition:</span>
              <span class="ml-1">{{ props.definition }}</span>
            </div>
            <div>
              <span class="font-semibold text-indigo-700">Example:</span>
              <span class="ml-1 italic">"{{ props.example }}"</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  word: String,
  definition: String,
  example: String,
  image: String,
});
</script>
