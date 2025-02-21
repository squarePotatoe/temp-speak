<template>
  <div>
    <div class="mb-4">
      <h2 class="font-bold">{{ props.header }}</h2>
      <p>{{ props.content }}</p>
      <p class="italic text-gray-600">Example: {{ props.example }}</p>
    </div>
  </div>
</template>

<script setup>
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
</script>
