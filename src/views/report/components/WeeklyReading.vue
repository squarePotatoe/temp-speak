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

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const fluencyData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  datasets: [
    {
      label: "Fluency",
      backgroundColor: "#60a5fa",
      data: [3, 0, 3, 4, 5],
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
      title: { display: true, text: "Day of week" },
    },
  },
};
</script>

<template>
  <div>
    <div class="text-2xl font-bold text-amber-600 mb-3 mt-8">
      Reading Performance
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl shadow p-2 md:p-6 mb-8">
        <h2 class="text-xl font-semibold text-amber-500 mb-4">Fluency</h2>
        <Bar :data="fluencyData" :options="chartOptions" />
        <p class="text-xs">
          Fluency measures how smoothly and quickly you read. A higher score
          indicates better fluency.
        </p>
      </div>
      <div class="bg-white rounded-xl shadow p-2 md:p-6 mb-8">
        <h2 class="text-xl font-semibold text-yellow-600 mb-4">
          Pronunciation
        </h2>
        <Bar :data="pronunciationData" :options="chartOptions" />
        <p class="text-xs">
          Pronunciation measures how accurately you pronounce words. A higher
          score indicates better pronunciation.
        </p>
      </div>
    </div>
    <p class="text-slate-500">
      Scores are based on HKDSE rubrics, where 1 is the lowest and 5 is the
      highest.
    </p>
    <p class="text-slate-500">0 indicates no data available for that day.</p>
  </div>
</template>
