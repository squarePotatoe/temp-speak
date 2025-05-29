<script setup>
import { ref } from "vue";
import { readingFeedback } from "@/data";

const feedbackData = ref(readingFeedback);
const openIndex = ref(null);

function toggleAccordion(idx) {
  openIndex.value = openIndex.value === idx ? null : idx;
}
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="mb-4">
        <div class="text-2xl font-bold text-amber-600 mb-2">
          Teacher Feedback
        </div>
        <p class="text-slate-600">
          Here you can review your teacher's feedback for each reading session
          this week. Each entry includes a message from your teacher, a question
          to think about, and a list of vocabulary words to practice. Click on
          each feedback entry to view the details.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <div
          v-for="(entry, idx) in feedbackData"
          :key="idx"
          class="border border-slate-100 rounded-xl shadow bg-white"
        >
          <button
            class="w-full flex items-center justify-between px-4 py-3 focus:outline-none"
            @click="toggleAccordion(idx)"
            :aria-expanded="openIndex === idx"
          >
            <div class="flex items-center gap-2">
              <span class="material-icons text-pink-400">chat</span>
              <span class="font-semibold text-lg text-blue-700"
                >Feedback #{{ idx + 1 }}</span
              >
            </div>
            <span
              class="material-icons text-gray-400 transition-transform duration-200"
              :class="openIndex === idx ? 'rotate-180' : ''"
              >expand_more</span
            >
          </button>
          <div v-if="openIndex === idx" class="px-6 pb-4 pt-2">
            <div class="mb-2">
              <span class="font-semibold text-gray-700">Message:</span>
              <span class="ml-1 text-gray-800">{{ entry.message }}</span>
            </div>
            <div class="mb-2">
              <span class="font-semibold text-gray-700">Question:</span>
              <span class="ml-1 text-gray-800">{{ entry.question }}</span>
            </div>
            <div>
              <span class="font-semibold text-gray-700 flex flex-col"
                >Words to Work On:</span
              >
              <ul class="ml-4 list-disc text-indigo-600 font-mono">
                <template v-if="Array.isArray(entry.vocabulary)">
                  <li v-for="(word, i) in entry.vocabulary" :key="i">
                    {{ word }}
                  </li>
                </template>
                <template v-else>
                  <li>{{ entry.vocabulary }}</li>
                </template>
              </ul>
            </div>
            <div class="m-4 flex items-center">
              <button
                class="ml-2 flex h-fit justify-center text-blue-600 hover:underline"
                @click="() => window.open(entry.videoUrl, '_blank')"
              >
                <span class="material-icons text-blue-600"
                  >play_circle_filled</span
                >
                Watch Feedback Video
              </button>
            </div>
            <div>
              <span class="font-semibold text-gray-700">Date:</span>
              <span class="ml-1 text-gray-800">{{ entry.date }}</span>
            </div>
            <div>
              <span class="font-semibold text-gray-700">Time:</span>
              <span class="ml-1 text-gray-800">{{ entry.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
