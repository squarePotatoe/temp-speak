<template>
  <div>
    <article
      :style="{ height: articleHeight }"
      class="overflow-y-auto mx-auto p-4 shadow rounded-t bg-white text-gray-700 flex flex-col gap-2"
    >
        <h1 class="text-2xl font-semibold">{{ subject }}</h1>
        <p class="text-gray-600">{{ textType.description }}</p>
        <p class="text-gray-500">{{ textType.example }}</p>
        <div class="flex flex-col gap-2">
          <div v-for="(item, index) in textType.structure" :key="index" class="flex flex-col gap-2">
            {{ item }}
          </div>
        </div>

    </article>
  </div>
</template>

<script setup>
import { textTypesExamples } from '@/data';

const textType = textTypesExamples.find(item => item.id === 1)
const { subject, salutation, body, closing, signature } = textType.structure

const props = defineProps({
  articleHeight: {
    type: String,
    default: '40rem',
  },
})

</script>
