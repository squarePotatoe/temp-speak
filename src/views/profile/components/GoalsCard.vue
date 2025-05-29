<script setup>
import { ref } from "vue";

const goals = ref({
  fluency: 4,
  pronunciation: 4,
  wordsLearned: 20,
  timeRead: 30,
  quizScore: 80,
});
</script>

<template>
  <div
    class="w-full mx-auto bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl shadow-xl p-8 border border-blue-100"
  >
    <h2
      class="text-3xl font-extrabold text-blue-700 mb-4 text-center flex items-center justify-center gap-2"
    >
      <span class="material-icons text-amber-400 text-4xl">emoji_events</span>
      My Learning Goals
      <span class="material-icons text-green-400 text-4xl">stars</span>
    </h2>
    <p class="text-center text-slate-600 mb-6">
      Set your goals and earn badges as you achieve them! Track your progress
      and challenge yourself every week.
    </p>
    <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        class="bg-white rounded-xl shadow p-4 flex flex-col items-center border-2 border-blue-100 relative"
      >
        <span class="material-icons text-blue-400 text-4xl mb-2">speed</span>
        <label class="block font-semibold mb-1 text-blue-800 text-center"
          >Reading Fluency (1-5)</label
        >
        <input
          type="number"
          min="1"
          max="5"
          v-model.number="goals.fluency"
          class="w-24 text-center border-2 border-blue-200 rounded-lg px-3 py-2 text-xl font-bold mb-1"
        />
        <p class="text-xs text-slate-500 text-center">
          Fluency means how smoothly and quickly you can read aloud.<br />
          <span class="inline-flex items-center gap-1">
            <span class="material-icons text-amber-400 text-base"
              >military_tech</span
            >
            Earn a badge for reaching 5!
          </span>
        </p>
      </div>
      <div
        class="bg-white rounded-xl shadow p-4 flex flex-col items-center border-2 border-blue-100 relative"
      >
        <span class="material-icons text-pink-400 text-4xl mb-2"
          >record_voice_over</span
        >
        <label class="block font-semibold mb-1 text-blue-800 text-center"
          >Pronunciation (1-5)</label
        >
        <input
          type="number"
          min="1"
          max="5"
          v-model.number="goals.pronunciation"
          class="w-24 text-center border-2 border-blue-200 rounded-lg px-3 py-2 text-xl font-bold mb-1"
        />
        <p class="text-xs text-slate-500 text-center">
          Pronunciation is how clearly you say words.<br />
          <span class="inline-flex items-center gap-1">
            <span class="material-icons text-amber-400 text-base"
              >military_tech</span
            >
            Badge for perfect 5!
          </span>
        </p>
      </div>
      <div
        class="bg-white rounded-xl shadow p-4 flex flex-col items-center border-2 border-blue-100 relative"
      >
        <span class="material-icons text-green-400 text-4xl mb-2"
          >auto_stories</span
        >
        <label class="block font-semibold mb-1 text-blue-800 text-center"
          >Words Learned (per week)</label
        >
        <input
          type="number"
          min="1"
          v-model.number="goals.wordsLearned"
          class="w-24 text-center border-2 border-blue-200 rounded-lg px-3 py-2 text-xl font-bold mb-1"
        />
        <p class="text-xs text-slate-500 text-center">
          How many new words you want to learn each week.<br />
          <span class="inline-flex items-center gap-1">
            <span class="material-icons text-amber-400 text-base"
              >military_tech</span
            >
            Collect badges for 10, 20, 30+!
          </span>
        </p>
      </div>
      <div
        class="bg-white rounded-xl shadow p-4 flex flex-col items-center border-2 border-blue-100 relative"
      >
        <span class="material-icons text-purple-400 text-4xl mb-2">timer</span>
        <label class="block font-semibold mb-1 text-blue-800 text-center"
          >Total Time Read (minutes per week)</label
        >
        <input
          type="number"
          min="1"
          v-model.number="goals.timeRead"
          class="w-24 text-center border-2 border-blue-200 rounded-lg px-3 py-2 text-xl font-bold mb-1"
        />
        <p class="text-xs text-slate-500 text-center">
          The total number of minutes you want to spend reading each week.<br />
          <span class="inline-flex items-center gap-1">
            <span class="material-icons text-amber-400 text-base"
              >military_tech</span
            >
            Badge for 60+ minutes!
          </span>
        </p>
      </div>
      <div
        class="bg-white rounded-xl shadow p-4 flex flex-col items-center border-2 border-blue-100 relative md:col-span-2"
      >
        <span class="material-icons text-yellow-400 text-4xl mb-2">quiz</span>
        <label class="block font-semibold mb-1 text-blue-800 text-center"
          >Quiz Score Goal (%)</label
        >
        <input
          type="number"
          min="0"
          max="100"
          v-model.number="goals.quizScore"
          class="w-24 text-center border-2 border-blue-200 rounded-lg px-3 py-2 text-xl font-bold mb-1"
        />
        <p class="text-xs text-slate-500 text-center">
          The percentage you want to achieve on your weekly quiz (0-100%).<br />
          <span class="inline-flex items-center gap-1">
            <span class="material-icons text-amber-400 text-base"
              >military_tech</span
            >
            Badge for 100%!
          </span>
        </p>
      </div>
    </form>
    <div class="flex justify-center pt-6">
      <button
        type="button"
        class="bg-gradient-to-r from-blue-500 to-amber-400 hover:from-blue-600 hover:to-amber-500 text-white px-8 py-3 rounded-xl font-bold text-lg shadow transition flex items-center gap-2"
      >
        <span class="material-icons text-white">check_circle</span>
        Save Goals
      </button>
    </div>
  </div>
</template>
