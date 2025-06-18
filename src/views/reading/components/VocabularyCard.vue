<script setup>
import { ref } from "vue";
const showQuizModal = ref(false);
const availableQuizzes = ref([
  {
    id: 1,
    title: "S-Defying Gravity: The Art and Adventure of Skysurfing",
    type: "Spelling",
  },
]);
const completedQuizzes = ref([
  { id: 3, title: "S-Defying Gravity: The Art and Adventure of Skysurfing" },
]);

function startQuiz(id) {
  // Logic to start the quiz
  // For example: router.push(`/quiz/${id}`)
}
</script>

<template>
  <div class="flex flex-col p-2">
    <div class="flex">
      <div
        class="flex items-center gap-2 text-xl font-extrabold text-white p-3 bg-gradient-to-r from-sky-500 to-sky-400 w-fit rounded-tl-2xl shadow-lg"
      >
        <span class="material-icons text-yellow-300 text-4xl"
          >auto_awesome</span
        >
        Vocabulary
      </div>
      <button
        @click="showQuizModal = true"
        class="text-xl flex items-center gap-2 font-extrabold text-white p-3 bg-gradient-to-r from-green-500 to-green-700 w-fit rounded-tr-2xl shadow-lg"
      >
        Quiz
        <span class="material-icons text-yellow-300 text-4xl animate-bounce"
          >quiz</span
        >
      </button>
    </div>

    <div
      class="flex flex-col p-2 gap-1 h-fit bg-gradient-to-br from-blue-100 rounded-b-2xl rounded-tr-2xl border-4 border-sky-400 shadow-xl"
    >
      <slot></slot>
    </div>

    <div
      v-if="showQuizModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-60"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl relative">
        <button
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          @click="showQuizModal = false"
        >
          <span class="material-icons">close</span>
        </button>
        <h2 class="text-xl font-bold mb-6 text-center">Quiz Center</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Available Quizzes -->
          <div>
            <h3 class="text-lg font-semibold mb-2">Available Quizzes</h3>
            <ul>
              <li
                v-for="quiz in availableQuizzes"
                :key="quiz.id"
                class="flex flex-col mb-2 items-start gap-2"
              >
                <div class="flex items-center gap-2">
                  <span class="material-icons text-blue-400">quiz</span>
                  <span>{{ quiz.title }}</span>
                </div>

                <a
                  class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  target="_blank"
                  href="https://edu.speak3.com/paper/a76b0e633d61bb15c51d35ecf226533e"
                >
                  Start
                </a>
              </li>
              <li v-if="availableQuizzes.length === 0" class="text-gray-400">
                No quizzes available.
              </li>
            </ul>
          </div>
          <!-- Quiz History -->
          <div>
            <h3 class="text-lg font-semibold mb-2">Quiz History</h3>
            <ul>
              <li
                v-for="quiz in completedQuizzes"
                :key="quiz.id"
                class="mb-2 flex items-center gap-2"
              >
                <span class="material-icons text-green-400">check_circle</span>
                <a
                  :href="`https://edu.speak3.com/paper/615641e665b202ebba634694f99b1d7a/result`"
                  class="text-blue-700 underline hover:text-blue-900"
                  target="_blank"
                >
                  {{ quiz.title }}
                </a>
                <span class="ml-auto text-xs text-gray-500">Completed</span>
              </li>
              <li v-if="completedQuizzes.length === 0" class="text-gray-400">
                No completed quizzes.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
