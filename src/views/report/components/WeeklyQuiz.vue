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
import annotationPlugin from "chartjs-plugin-annotation";
Chart.register(annotationPlugin);
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function getAverage(data) {
  const valid = data.filter((n) => n > 0);
  return valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : 0;
}

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const quizAttempts = [
  { attempt: 1, time: 95, score: 6 },
  { attempt: 2, time: 80, score: 8 },
  { attempt: 4, time: 110, score: 5 },
  { attempt: 5, time: 120, score: 7 },
];

const quizLabels = quizAttempts.map((a, i) => dayNames[i % dayNames.length]);

const quizScoreData = quizAttempts.map((a) => a.score);
// Convert seconds to minutes (rounded to 2 decimals)
const quizTimeData = quizAttempts.map((a) => +(a.time / 60).toFixed(2));

const totalQuestions = 8;
const bestScore = Math.max(...quizScoreData);
const bestPercent = Math.round((bestScore / totalQuestions) * 100);

const avgScore = getAverage(quizScoreData);
const avgTime = getAverage(quizTimeData);

const quizScoreChart = {
  labels: quizLabels,
  datasets: [
    {
      label: "Quiz Score (out of 8)",
      backgroundColor: "#818cf8",
      data: quizScoreData,
    },
  ],
};

const quizTimeChart = {
  labels: quizLabels,
  datasets: [
    {
      label: "Time Taken (minutes)",
      backgroundColor: "#f472b6",
      data: quizTimeData,
    },
  ],
};

const quizScoreChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: false },
    annotation: {
      annotations: {
        averageLine: {
          type: "line",
          yMin: avgScore,
          yMax: avgScore,
          borderColor: "#ef4444",
          borderWidth: 2,
          label: {
            display: true,
            enabled: true,
            content: `Average: ${avgScore.toFixed(2)}`,
            position: "start",
            backgroundColor: "#ef4444",
            color: "#fff",
            font: { weight: "bold", size: 12 },
            padding: 6,
          },
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: totalQuestions,
      title: { display: true, text: "Score (out of 8)" },
    },
    x: {
      title: { display: true, text: "Quiz Attempt" },
    },
  },
};

const quizTimeChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: false },
    annotation: {
      annotations: {
        averageLine: {
          type: "line",
          yMin: avgTime,
          yMax: avgTime,
          borderColor: "#ef4444",
          borderWidth: 2,
          label: {
            display: true,
            enabled: true,
            content: `Average: ${avgTime.toFixed(2)} min`,
            position: "start",
            backgroundColor: "#ef4444",
            color: "#fff",
            font: { weight: "bold", size: 12 },
            padding: 6,
          },
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: "Time (minutes)" },
    },
    x: {
      title: { display: true, text: "Quiz Attempt" },
    },
  },
};
</script>

<template>
  <div class="mt-12">
    <div class="text-2xl font-bold text-amber-600 mb-4">Quiz Summary</div>
    <div class="bg-white rounded-xl shadow p-6 mb-8">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4"
      >
        <div class="flex flex-col gap-2">
          <div>
            <span class="font-semibold text-gray-700">Quiz Attempts:</span>
            <span class="ml-2 text-blue-600 font-bold"
              >{{ quizAttempts.length }} / 5</span
            >
          </div>
          <div>
            <span class="font-semibold text-gray-700">Quiz Type:</span>
            <span class="ml-2 text-blue-600 font-bold"
              >Reading Comprehension</span
            >
          </div>
        </div>
        <div>
          <span class="font-semibold text-gray-700">Best Score:</span>
          <span class="ml-2 text-green-600 font-bold"
            >{{ bestScore }}/{{ totalQuestions }} ({{ bestPercent }}%)</span
          >
        </div>
      </div>
      <div>
        <p class="text-sm text-gray-500 mb-2">
          You can take a quiz each day to test your reading skills. The best
          score from the week will be highlighted.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold text-blue-500 mb-2">Quiz Scores</h3>
          <a
            href="https://edu.speak3.com/paper/7a4f37af883bb7a11f913bff54de645f/result"
            target="_blank"
            class="w-full"
          >
            <Bar :data="quizScoreChart" :options="quizScoreChartOptions" />
          </a>
          <p class="text-xs mt-1">
            Each attempt shows how many questions you answered correctly (out of
            8).
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-pink-500 mb-2">Time Taken</h3>
          <Bar :data="quizTimeChart" :options="quizTimeChartOptions" />
          <p class="text-xs mt-1">
            See how long you took for each quiz attempt. Try to improve both
            your score and speed!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
