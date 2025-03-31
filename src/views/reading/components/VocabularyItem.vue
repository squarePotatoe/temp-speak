<template>
    <div>
        <div class="group flex flex-col text-lg relative rounded bg-white p-2 mr-2 ">
        <div class="flex flex-col">
          <div class="text-sm">{{ props.word }}</div>
        <div
          class="w-96 group-hover:opacity-100 text-sm transition-opacity bg-white text-black border-2 border-gray-600 rounded-xl absolute translate-y-10 -translate-x-10 opacity-0 z-10 pointer-events-none"
          >
          <div class="flex gap-2">
            <div v-if="props.image != null" class="flex w-1/2">
                <img :src="props.image" alt="Vocabulary image" class="w-36 object-cover rounded-l-xl">
            </div>
            <div class="flex flex-col  p-2">
                <p class="font-semibold">Definition: </p><span>{{ props.definition}}</span>
                <p class="font-semibold">Example: </p><span>{{ props.example }}</span>
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
    image: String
})
</script>