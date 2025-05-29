<script setup>
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
</script>

<template>
  <div class="mx-auto w-full py-4 px-2 md:px-0">
    <div class="flex flex-col">
      <div class="text-3xl font-bold text-amber-600 mb-3">Weekly Report</div>
      <p class="text-slate-500">
        Here you can view your weekly reading performance metrics, including
        fluency and pronunciation scores. These scores are based on your reading
        activities throughout the week, helping you track your progress and see
        your progress.
      </p>
    </div>
    <WeeklyReading />
    <WeeklyQuiz />
    <WeeklyTeacherFeedback />
    <div class="mt-6 bg-white rounded-lg shadow p-5">
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
