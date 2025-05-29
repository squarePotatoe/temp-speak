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

const chartData = {
  labels: ["Quiz 1", "Quiz 2", "Quiz 3"],
  datasets: [
    {
      label: "Spelling",
      backgroundColor: "#60a5fa",
      data: [85, 90, 78],
    },
    {
      label: "Dictation",
      backgroundColor: "#fbbf24",
      data: [80, 88, 82],
    },
    {
      label: "Reading Comprehension",
      backgroundColor: "#34d399",
      data: [92, 87, 91],
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: {
      display: true,
      text: "Average Quiz Scores by Type",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      title: {
        display: true,
        text: "Average Score (%)",
      },
    },
    x: {
      title: {
        display: true,
        text: "Quiz",
      },
    },
  },
};
</script>

<template>
  <div class="w-full max-w-2xl mx-auto p-4">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
