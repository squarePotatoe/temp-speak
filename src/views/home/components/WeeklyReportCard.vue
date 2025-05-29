<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div>
    <RouterLink
      to="/report"
      class="flex flex-col h-full py-6 px-4 rounded-xl shadow border bg-white border-slate-100 hover:shadow-lg transition cursor-pointer group"
      aria-label="Go to full weekly report"
    >
      <div class="flex items-center justify-between">
        <div class="text-2xl text-amber-500 font-semibold">
          Weekly Report Card
        </div>
        <span
          class="material-icons text-blue-400 group-hover:translate-x-1 transition"
          >arrow_forward</span
        >
      </div>
      <hr class="text-gray-300 my-2" />
      <div class="flex flex-col gap-3 mt-2">
        <div class="text-gray-700 text-base">
          See your progress and feedback for this week.
        </div>
        <div class="flex flex-col gap-2 mt-2">
          <div class="flex items-center gap-2">
            <span class="material-icons text-green-500">auto_stories</span>
            <span class="font-semibold text-gray-800">Reading Performance</span>
            <!-- <span class="ml-auto text-blue-700 font-bold">85%</span> -->
          </div>
          <div class="flex items-center gap-2">
            <span class="material-icons text-purple-500">quiz</span>
            <span class="font-semibold text-gray-800">Quizzes Compleded:</span>
            <span class="ml-auto text-blue-700 font-bold">3/5</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="material-icons text-orange-400">emoji_events</span>
            <span class="font-semibold text-gray-800">Engagement:</span>
            <span class="ml-auto text-blue-700 font-bold">Active</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="material-icons text-pink-400">chat</span>
            <span class="font-semibold text-gray-800">Teacher Feedback:</span>
            <span class="ml-auto text-gray-600 italic truncate max-w-[120px]"
              >"Great effort this week!"</span
            >
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>
