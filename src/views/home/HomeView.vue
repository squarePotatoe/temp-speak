<template>
  <div>
    <main
      class="container relative justify-between h-[calc(100vh-74px)] max-w-6xl mx-auto mt-5"
    >
      <UserWelcome :formattedTime="formattedTime" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RouterLink :to="`/reading/${1}`" class="home-card animate-slide-up">
          <div>
            <span
              class="h-3 w-3 absolute bg-cyan-500 rounded-full right-4 animate-ping duration-300 p-1"
            ></span>
            <div class="text-2xl font-bold text-teal-700">Next lesson</div>
          </div>
          <hr class="text-gray-300 my-2" />
          <div>
            <div class="flex flex-col justify-between gap-2 mt-2">
              <div class="flex flex-col gap-2">
                <div class="text-xl font-semibold text-purple-700">
                  The Art of Skysurfing
                </div>
                <p class="text-sm leading-tight font-semibold text-gray-600">
                  An exciting sport that combines skydiving and surfing
                </p>
                <p class="text-sm leading-tight font-semibold text-gray-600">
                  Skysurfing is a high-adrenaline sport that combines the
                  excitement of skydiving with the thrill of surfing...
                </p>
              </div>
              <div class="flex items-center justify-between relative">
                <p class="text-gray-500 border border-gray-300 rounded p-2">
                  Patricia
                </p>
                <p class="tag max-w-fit">Reading</p>
              </div>
            </div>
          </div>
        </RouterLink>
        <RouterLink :to="`/reading/${2}`" class="home-card animate-slide-up">
          <div>
            <span
              class="h-3 w-3 absolute bg-cyan-500 rounded-full right-4 animate-ping duration-300 p-1"
            ></span>
            <div class="text-2xl font-bold text-teal-700">Next lesson</div>
          </div>
          <hr class="text-gray-300 my-2" />
          <div>
            <div class="flex flex-col justify-between gap-2 mt-2">
              <div class="flex flex-col gap-2">
                <div class="text-xl font-semibold text-purple-700">
                  The Mighty Tongue
                </div>
                <p class="text-sm leading-tight font-semibold text-gray-600">
                  An exciting sport that combines skydiving and surfing
                </p>
                <p class="text-sm leading-tight font-semibold text-gray-600">
                  Skysurfing is a high-adrenaline sport that combines the
                  excitement of skydiving with the thrill of surfing...
                </p>
              </div>
              <div class="flex items-center justify-between relative">
                <p class="text-gray-500 border border-gray-300 rounded p-2">
                  Abby
                </p>
                <p class="tag max-w-fit">Reading</p>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>

      <div class="flex flex-col mt-6 lg:flex-row gap-4 mb-6">
        <div
          class="flex-1 bg-orange-100 border border-indigo-200 rounded-xl p-6 animate-fade-in"
        >
          <div class="text-2xl font-bold text-teal-700">My Summary</div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div class="bg-white rounded-xl p-4 shadow">
              <div class="text-lg font-semibold mb-2">Attendance Calendar</div>
              <ul class="text-sm">
                <li>
                  <span
                    class="inline-block w-3 h-3 rounded-full bg-green-400 mr-2"
                  ></span>
                  Logged in / Submitted
                </li>
                <li>
                  <span
                    class="inline-block w-3 h-3 rounded-full bg-pink-400 mr-2"
                  ></span>
                  Missed Assignment / No Login
                </li>
              </ul>
              <div class="flex items-center justify-center mt-4">
                <VCalendar :attributes="calendarAttributes" is-expanded />
              </div>
            </div>
            <div class="bg-white rounded-xl p-4 shadow">
              <Doughnut :data="performanceData" :options="performanceOptions" />
            </div>
          </div>
          <span
            class="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-indigo-800"
          >
            Read more
          </span>
        </div>
      </div>
    </main>
    <!-- <Features /> -->
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { textFormatDemo } from "@/data";
import UserWelcome from "./components/UserWelcome.vue";
import { Doughnut } from "vue-chartjs";
import { Calendar as VCalendar } from "v-calendar";
import "v-calendar/style.css";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const attendanceData = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      label: "Week 1",
      backgroundColor: "#6366f1",
      data: [1, 1, 0, 1, 1, 1, 0], // days 1-7
      stack: "week1",
    },
    {
      label: "Week 2",
      backgroundColor: "#818cf8",
      data: [1, 1, 0, 1, 0, 1, 1], // days 8-14
      stack: "week2",
    },
    {
      label: "Week 3",
      backgroundColor: "#a5b4fc",
      data: [1, 0, 1, 1, 1, 1, 1], // days 15-21
      stack: "week3",
    },
    {
      label: "Week 4",
      backgroundColor: "#c7d2fe",
      data: [1, 1, 1, 0, 1, 1, 1], // days 22-28
      stack: "week4",
    },
    {
      label: "Week 5",
      backgroundColor: "#e0e7ff",
      data: [1, 0, 1, 0, 0, 0, 0], // days 29-30 (rest are 0)
      stack: "week5",
    },
  ],
};

const attendanceOptions = {
  responsive: true,
  plugins: {
    legend: { display: true },
    title: { display: true, text: "Attendance Calendar (Present=1, Absent=0)" },
  },
  scales: {
    y: { beginAtZero: true, max: 1, ticks: { stepSize: 1 } },
    x: { stacked: true },
    yAxes: [{ stacked: true }],
  },
};

const performanceData = {
  labels: ["Reading", "Speaking", "Listening", "Writing"],
  datasets: [
    {
      label: "Performance",
      backgroundColor: ["#f59e42", "#10b981", "#3b82f6", "#f43f5e"],
      data: [85, 90, 75, 60],
    },
  ],
};

const performanceOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: "Performance (%)" },
  },
};

const nextLesson = textFormatDemo.find((item) => item.id === 1);

const currentTime = ref(new Date());

const formattedTime = computed(() => {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(currentTime.value);
});

const updateTime = () => {
  currentTime.value = new Date();
};

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

function makeDate(day) {
  return new Date(year, month, day);
}

const missedDays = [5, 12, 18];
const loggedDays = [
  1, 2, 6, 7, 9, 10, 13, 14, 16, 17, 19, 20, 21, 22, 24, 26, 28, 29, 30,
];

const calendarAttributes = [
  {
    key: "logged",
    dates: loggedDays.map(makeDate),
    highlight: {
      color: "green",
      fillMode: "solid",
      class: "bg-green-400 text-white",
    },
    popover: {
      label: "Logged in / Submitted",
    },
  },
  {
    key: "missed",
    dates: missedDays.map(makeDate),
    highlight: {
      color: "pink",
      fillMode: "solid",
      class: "bg-pink-400 text-white",
    },
    popover: {
      label: "Missed Assignment / No Login",
    },
  },
];

onMounted(() => {
  const interval = setInterval(updateTime, 1000);
  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>
