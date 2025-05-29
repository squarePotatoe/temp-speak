<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
});

// Dummy data for demo
const dummyLoginHistory = [
  { login_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() }, // 6 days ago
  { login_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() }, // 5 days ago
  { login_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() }, // 3 days ago
  { login_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() }, // yesterday
  { login_at: new Date().toISOString() }, // today
];
const dummyLastLogin = dummyLoginHistory[dummyLoginHistory.length - 1];

const formattedLastLogin = computed(() => {
  if (!dummyLastLogin) return "";
  const date = new Date(dummyLastLogin.login_at);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
});

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const isDateInCurrentWeek = (date) => {
  const now = new Date();
  const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1; // Monday = 0
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  return date >= startOfWeek && date < endOfWeek;
};

const loginsByDay = computed(() => {
  const counts = Array(7).fill(0);

  dummyLoginHistory.forEach((entry) => {
    const loginDate = new Date(entry.login_at);

    if (isDateInCurrentWeek(loginDate)) {
      const dayIndex = (loginDate.getDay() + 6) % 7;
      counts[dayIndex]++;
    }
  });

  return counts;
});

const todayIndex = computed(() => {
  const today = new Date().getDay();
  return today === 0 ? 6 : today - 1; // Adjust Sunday to 6
});
</script>

<template>
  <div class="">
    <div
      class="flex-grow bg-white rounded-xl shadow-md px-6 py-4 flex flex-col items-end border border-slate-100"
    >
      <div
        class="text-lg font-semibold tracking-wide uppercase py-1 px-3 rounded-full bg-amber-500 text-white mb-2"
      >
        This week login streek
      </div>
      <div class="grid grid-cols-7 gap-1 flex-grow self-stretch">
        <div
          v-for="(day, index) in daysOfWeek"
          :key="index"
          class="flex flex-col justify-end items-center"
        >
          <div
            class="w-4 mx-auto rounded-full"
            :class="{
              'bg-amber-500 h-32': loginsByDay[index] > 0, // Login exists
              'bg-red-200 h-16': loginsByDay[index] === 0 && index < todayIndex, // Day has passed with no login
              'bg-gray-200 h-16': index > todayIndex, // Upcoming days
            }"
          ></div>
          <div class="text-center text-xs text-gray-400 font-semibold mt-2">
            {{ day }}
          </div>
        </div>
      </div>
      <div
        class="flex gap-2 p-2 rounded-xl border-amber-500 text-amber-500 text-lg mt-4 w-full justify-between items-center"
      >
        <!-- <div class="flex flex-col text-xs gap-2">
                  <div class="bg-amber-400 p-2 rounded-full"></div>
                  <div class="bg-red-400 p-2 rounded-full"></div>
                  <div class="bg-gray-200 p-2 rounded-full"></div>
                </div> -->
        <div class="flex gap-2">
          <p class="font-semibold">Last logged in:</p>
          {{ formattedLastLogin }}
        </div>
      </div>
      <RouterLink
        :to="{ path: '/profile', query: { activeTab: 'history' } }"
        class="text-sm text-amber-500 font-semibold border rounded-xl border-amber-500 p-2 hover:bg-amber-500 hover:text-white transition duration-300 ease-in-out"
      >
        View Login History
      </RouterLink>
    </div>
  </div>
</template>
