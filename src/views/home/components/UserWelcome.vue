<script setup>
import { ref, computed, onMounted } from "vue";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { RouterLink } from "vue-router";
import LoginChart from "./LoginChart.vue";

const props = defineProps({
  formattedTime: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const donutChartRef = ref(null);

onMounted(() => {
  if (donutChartRef.value) {
    const data = {
      labels: [
        "Minutes until goal met",
        "Minutes read",
        "Yellow",
        "Green",
        "Purple",
        "Orange",
      ],
      datasets: [
        {
          label: "My Reading time",
          data: [20, 10],
          backgroundColor: [
            "#A78BFA",
            "#d3d3d3",
            "#FBBF24",
            "#10B981",
            "#F59E0B",
            "#3B82F6",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
      aspectRatio: 1,
      cutout: "50%",
      animation: {
        animateRotate: false,
      },
    };

    new Chart(donutChartRef.value, {
      type: "doughnut",
      data,
      options,
    });
  }
});
</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div
        class="grid grid-cols-2 bg-white border-slate-100 shadow rounded-xl animate-fade-in border-2 p-2 h-full"
      >
        <div
          class="flex flex-col justify-center items-center text-xl text-teal-900"
        >
          Welcome back, <br /><strong class="text-3xl"> Patrick </strong>
          <span
            class="inline-block w-fit mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-teal-500"
          >
            {{ formattedTime }}
          </span>
          <div class="flex flex-col w-full justify-center items-center mt-4">
            <div
              class="flex items-center text-lg font-semibold text-gray-700 mt-4"
            >
              <span
                class="material-icons-outlined animate-pulse text-orange-600 p-2"
                >rocket_launch</span
              >
              Login streak: 8 days
            </div>
          </div>
        </div>
        <div class="w-full flex flex-col items-center justify-center">
          <div class="">
            <canvas ref="donutChartRef" class="h-42 w-42"> </canvas>
          </div>
          <RouterLink
            to="/profile#goals"
            class="text-xl font-semibold text-gray-700 mt-4 hover:text-teal-500"
          >
            My goal
          </RouterLink>
        </div>
      </div>
      <LoginChart :isLoading="isLoading" />
    </div>
  </div>
</template>
