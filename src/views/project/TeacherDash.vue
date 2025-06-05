<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { textFormatDemo } from "@/data";
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
import QuizBarChart from "@/components/QuizBarChart.vue";
import { RouterLink } from "vue-router";
import StudentsTable from "./components/StudentsTable.vue";

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

const missedDays = [3, 5, 12, 18];
const loggedDays = [2, 4, 6, 9, 10, 11, 13, 16, 17, 19];
const upcommingDays = [20, 23, 24, 25, 26, 27, 30];
const todayDate = [19];

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
  {
    key: "upcoming",
    dates: upcommingDays.map(makeDate),
    highlight: {
      color: "purple",
      fillMode: "solid",
      class: "bg-purple-400 text-white",
    },
    popover: {
      label: "Upcoming Assignment",
    },
  },
  {
    key: "today",
    dates: todayDate.map(makeDate),
    highlight: {
      color: "purple",
      fillMode: "outline",
      class: "bg-purple-400 text-white",
    },
    popover: {
      label: "Today / Not submitted",
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

<template>
  <div>
    <main
      class="container relative justify-between min-h-[calc(100vh-74px)] max-w-6xl mx-auto mt-5 p-2 md:p-0"
    >
      <h1 class="text-2xl font-bold mb-4">Teacher Dashboard</h1>
      <StudentsTable />
    </main>
    <!-- <Features /> -->
  </div>
</template>
