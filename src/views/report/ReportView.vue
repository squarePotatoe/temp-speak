<script setup>
import { ref } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import WeeklyQuiz from "./components/WeeklyQuiz.vue";
import WeeklyReading from "./components/WeeklyReading.vue";
import WeeklyTeacherFeedback from "./components/WeeklyTeacherFeedback.vue";

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const fluencyData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  datasets: [
    {
      label: "Fluency",
      backgroundColor: "#60a5fa",
      data: [4, 0, 3, 4, 5],
    },
  ],
};

const pronunciationData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  datasets: [
    {
      label: "Pronunciation",
      backgroundColor: "#fbbf24",
      data: [3, 0, 4, 5, 4],
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 5,
      ticks: { stepSize: 1 },
      title: { display: true, text: "Score (1-7)" },
    },
    x: {
      title: { display: true, text: "Day" },
    },
  },
};

const activeTab = ref("weekly");

function setActiveTab(tab) {
  activeTab.value = tab;
}
</script>

<template>
  <div class="mx-auto md:w-6xl py-4 px-2 md:px-0">
    <div class="flex flex-col mb-4">
      <div class="text-3xl font-bold text-amber-600 mb-3">My Report card</div>
      <div class="bg-white rounded-lg shadow p-4 mb-3">
        <div class="text-lg font-semibold text-amber-500 mb-1">
          Track Your Progress
        </div>
        <p class="text-slate-600">
          Here you can track your progress. Your weekly report will help you
          understand your strengths and areas for improvement. Stay motivated
          and keep up the great work!
        </p>
      </div>
      <div class="grid md:grid-cols-2 gap-2">
        <div class="bg-white rounded-lg shadow p-4">
          <div class="text-lg font-semibold text-amber-500 mb-1">
            Weekly Overview
          </div>
          <p class="text-slate-600">
            View your weekly reading and quiz performance, along with teacher
            feedback to enhance your learning experience. Click on the tabs
            below to switch between the weekly report and course report.
          </p>
        </div>
        <div class="bg-white rounded-lg shadow p-4">
          <div class="text-lg font-semibold text-amber-500 mb-1">
            Course Overview
          </div>
          <p class="text-slate-600">
            View your course progress, including quizzes, assignments, and
            overall performance.
          </p>
        </div>
      </div>
    </div>
    <div class="flex text-2xl text-white font-semibold">
      <button
        @click="setActiveTab('weekly')"
        :class="
          activeTab === 'weekly'
            ? 'hover:bg-amber-600 bg-amber-500 '
            : 'bg-amber-400 hover:bg-amber-300'
        "
        class="px-4 py-2 rounded-tl-lg shadow transition-colors flex items-center gap-2"
      >
        Weekly Report
        <span class="material-icons-outlined">bar_chart</span></button
      ><button
        @click="setActiveTab('course')"
        :class="
          activeTab === 'course'
            ? 'hover:bg-amber-600 bg-amber-500 text-white '
            : 'bg-amber-400 hover:bg-amber-300'
        "
        class="px-4 py-2 rounded-tr-lg shadow transition-colors flex items-center gap-2"
      >
        Course Report
        <span class="material-icons-outlined">assessment</span>
      </button>
    </div>
    <div v-if="activeTab === 'weekly'" class="bg-white rounded p-4">
      <WeeklyReading />
      <WeeklyQuiz />
      <WeeklyTeacherFeedback />
    </div>
    <div v-else class="bg-white rounded p-4">
      <div class="text-xl font-semibold text-amber-500 mb-4">
        Course Report Coming Soon!
      </div>
      <p class="text-slate-600">
        Stay tuned for detailed insights into your course performance, including
        quizzes, assignments, and overall progress.
      </p>
    </div>

    <div class="bg-white rounded-lg shadow p-5 mt-2">
      <div class="text-xl font-semibold text-blue-700 mb-2">
        Why Consistency Matters
      </div>
      <p class="text-slate-600 mb-2">
        Consistent practice is key to improving your reading and speaking
        skills. By engaging with your activities regularly, you build strong
        habits that lead to steady progress over time.
      </p>
      <p class="text-slate-600 mb-2">
        Tracking your progress helps you identify strengths and areas for
        improvement, keeping you motivated and focused on your goals. Remember,
        small steps taken every day add up to big results!
      </p>
      <ul class="list-disc pl-5 text-slate-600">
        <li>Stay motivated by celebrating your achievements each week.</li>
        <li>Use your progress data to set realistic and achievable goals.</li>
        <li>Reflect on your journey to see how far you've come.</li>
      </ul>
    </div>

    <div></div>
  </div>
</template>
