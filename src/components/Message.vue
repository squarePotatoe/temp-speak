<template>
  <div>
    <div v-if="sender === 'admin'" class="flex w-full justify-center"></div>

    <div v-else class="flex w-full relative text-sm md:text-md">
      <div
        class="flex bg-amber-100 border-1 border-rose-100 p-2 rounded mb-2 max-w-2/3"
        :class="sender === 'student' ? 'ml-auto bg-indigo-200' : 'mr-auto'"
      >
        <p class="text-slate-700 whitespace-pre-wrap">
          {{ props.message }}
        </p>
      </div>
    </div>
    <div v-if="props.img != null" class="flex">
      <img :src="props.img" alt="" class="h-48 rounded" />
    </div>
    <div
      v-if="props.audio"
      class="flex w-full rounded mb-2 max-w-2/3"
      :class="props.sender === 'student' ? 'ml-auto justify-end ' : 'mr-auto'"
    >
      <audio :src="props.audio" controls></audio>
    </div>
    <div
      v-if="props.video"
      class="flex w-full rounded mb-2 max-w-2/3"
      :class="props.sender === 'student' ? 'ml-auto justify-end ' : 'mr-auto'"
    >
      <video
        :src="props.video"
        controls
        style="max-width: 300px; max-height: 200px"
      ></video>
    </div>
    <div
      class="flex w-full"
      :class="sender === 'student' ? 'ml-auto justify-end ' : 'mr-auto'"
    >
      <p class="text-xs text-slate-500">{{ props.name }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: String,
  sender: String,
  name: String,
  img: String,
  date: String,
  audio: String,
  video: String,
});
</script>
