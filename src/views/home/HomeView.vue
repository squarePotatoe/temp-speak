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
import QuizBarChart from "@/components/QuizBarChart.vue";
import WeeklyReportCard from "./components/WeeklyReportCard.vue";

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

const missedDays = [5, 9, 12, 15, 27];
const loggedDays = [6, 7, 8, 13, 14, 16, 19, 20, 21, 22, 23, 26, 28];
const upcommingDays = [30];
const todayDate = [29];

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
      <UserWelcome :formattedTime="formattedTime" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RouterLink :to="`/reading/${1}`" class="home-card animate-slide-up">
          <div>
            <span
              class="h-3 w-3 absolute bg-cyan-500 rounded-full right-4 animate-ping duration-300 p-1"
            ></span>
            <div class="text-2xl font-bold text-amber-500">Next lesson</div>
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
                <p class="tag max-w-fit">iSpeakPerfect 360</p>
              </div>
            </div>
          </div>
        </RouterLink>
        <RouterLink :to="`/reading/${2}`" class="home-card animate-slide-up">
          <div>
            <span
              class="h-3 w-3 absolute bg-cyan-500 rounded-full right-4 animate-ping duration-300 p-1"
            ></span>
            <div class="text-2xl font-bold text-amber-500">Next lesson</div>
          </div>
          <hr class="text-gray-300 my-2" />
          <div>
            <div class="flex flex-col justify-between gap-2 mt-2">
              <div class="flex flex-col gap-2">
                <div class="text-xl font-semibold text-purple-700">
                  The Mighty Tongue
                </div>
                <p class="text-sm leading-tight font-semibold text-gray-600">
                  Our tongue helps us taste food and swallow it.
                </p>
                <p class="text-sm leading-tight font-semibold text-gray-600">
                  Our tongue is a muscle that can move in different directions
                  We use our tongue to make different sounds ...
                </p>
              </div>
              <div class="flex items-center justify-between relative">
                <p class="text-gray-500 border border-gray-300 rounded p-2">
                  Abby
                </p>
                <p class="tag max-w-fit">Vocabulary Building</p>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>

      <div class="flex flex-col mt-6 lg:flex-row gap-4 mb-6">
        <div class="flex-1 animate-fade-in">
          <div class="text-2xl font-bold text-amber-500">My Summary</div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div class="bg-white rounded-xl p-4 shadow">
              <div class="text-lg font-semibold mb-2">Attendance Calendar</div>
              <div class="flex items-center justify-center mt-4">
                <VCalendar
                  :attributes="calendarAttributes"
                  is-expanded
                  borderless
                />
              </div>
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
                  No Login / Missed Assignment
                </li>
                <li>
                  <span
                    class="inline-block w-3 h-3 rounded-full bg-white border-2 border-purple-400 mr-2"
                  ></span>
                  Today / Not Submitted
                </li>
                <li>
                  <span
                    class="inline-block w-3 h-3 rounded-full bg-purple-400 mr-2"
                  ></span>
                  Upcoming Assignment
                </li>
              </ul>
            </div>
            <div class="flex flex-col gap-2">
              <WeeklyReportCard />
              <div
                class="flex flex-col h-full py-6 px-4 rounded-lg shadow border bg-white border-slate-100"
              >
                <div class="text-2xl text-amber-500 font-semibold">
                  Course Report Summary
                </div>
                <hr class="text-gray-300 my-2" />
                <div class="flex flex-col gap-3 mt-2">
                  <div class="text-gray-700 text-base">
                    See your progress and feedback for this course.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- <Features /> -->
  </div>
</template>
