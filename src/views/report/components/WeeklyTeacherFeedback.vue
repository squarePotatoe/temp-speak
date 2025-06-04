<script setup>
import { ref } from "vue";
import { readingFeedback } from "@/data";

const feedbackData = ref(readingFeedback);
const modalOpen = ref(false);
const selectedEntry = ref(null);

function openModal(entry) {
  selectedEntry.value = entry;
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
  selectedEntry.value = null;
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
            @click="openModal(entry)"
            :aria-expanded="false"
          >
            <div class="flex items-center gap-2">
              <span class="material-icons text-pink-400">chat</span>
              <span
                class="font-semibold text-lg text-blue-700 underline hover:text-blue-900 cursor-pointer"
                >Feedback #{{ idx + 1 }}</span
              >
            </div>
            <span class="material-icons text-gray-400">open_in_new</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    v-if="modalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/45 bg-opacity-40 px-2"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative">
      <button
        class="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
        @click="closeModal"
        aria-label="Close"
      >
        <span class="material-icons">close</span>
      </button>
      <div v-if="selectedEntry">
        <h2 class="text-xl font-semibold text-amber-600 mb-4">
          Feedback Details
        </h2>
        <p>Here you see feedback sent from the teacher on that day.</p>
        <hr class="my-4 border-gray-200" />
        <div class="mb-2">
          <span class="font-semibold text-gray-700">Message:</span>
          <span class="ml-1 text-gray-800">{{ selectedEntry.message }}</span>
        </div>
        <div class="mb-2">
          <span class="font-semibold text-gray-700">Question:</span>
          <span class="ml-1 text-gray-800">{{ selectedEntry.question }}</span>
        </div>
        <div>
          <span class="font-semibold text-gray-700 flex flex-col"
            >Words to Work On:</span
          >
          <ul class="ml-4 list-disc text-indigo-600 font-mono">
            <template v-if="Array.isArray(selectedEntry.vocabulary)">
              <li v-for="(word, i) in selectedEntry.vocabulary" :key="i">
                {{ word }}
              </li>
            </template>
            <template v-else>
              <li>{{ selectedEntry.vocabulary }}</li>
            </template>
          </ul>
        </div>
        <div class="m-4 flex items-center">
          <button
            class="ml-2 flex h-fit justify-center text-blue-600 hover:underline"
            @click="() => window.open(selectedEntry.videoUrl, '_blank')"
          >
            <span class="material-icons text-blue-600">play_circle_filled</span>
            Watch Feedback Video
          </button>
        </div>
        <div>
          <span class="font-semibold text-gray-700">Date:</span>
          <span class="ml-1 text-gray-800">{{ selectedEntry.date }}</span>
        </div>
        <div>
          <span class="font-semibold text-gray-700">Time:</span>
          <span class="ml-1 text-gray-800">{{ selectedEntry.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
