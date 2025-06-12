<template>
  <div>
    <article
      :style="{ height: articleHeight }"
      class="overflow-y-auto mx-auto p-4 shadow rounded-t bg-white text-gray-700 flex flex-col gap-2"
    >
      <h1 class="text-2xl font-semibold">{{ subject }}</h1>
      <p class="text-gray-600">{{ textType.description }}</p>
      <p class="text-gray-500">{{ textType.example }}</p>
      <div class="flex flex-col gap-4 text-xl">
        <!-- Title section  -->
        <div :class="activeTip === 0 ? 'bg-amber-100' : ''">
          {{ textType.structure[0].content }}
        </div>
        <!-- Introduction section  -->
        <div>
          <span :class="activeTip === 3 ? 'bg-amber-100' : ''">{{
            textType.structure[1].content
          }}</span>
          {{ textType.structure[2].content }}
        </div>
        <!-- Body Section  -->
        <div class="flex flex-col gap-2">
          <p>
            {{ textType.structure[4].content }}
          </p>
          <p>
            {{ textType.structure[5].content }}
          </p>
          <p>
            {{ textType.structure[6].content }}
          </p>
          <p>
            {{ textType.structure[7].content }}
          </p>
        </div>
        <!-- Closing section  -->
        <div></div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { textTypesExamples } from "@/data";

const textType = textTypesExamples.find((item) => item.id === 1);
const { subject, salutation, body, closing, signature } = textType.structure;

const props = defineProps({
  articleHeight: {
    type: String,
    default: "40rem",
  },
  activeTip: {
    type: String,
  },
});
</script>
