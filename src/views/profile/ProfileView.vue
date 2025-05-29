<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import InfoCard from "./components/InfoCard.vue";
import UserInfo from "./components/UserInfo.vue";
import GoalsCard from "./components/GoalsCard.vue";

// Dummy data
const student = {
  profilePicture: "https://randomuser.me/api/portraits/men/90.jpg",
  name: "Patrick Chan",
  school: "Springfield Secondary School",
  school_name: "Springfield Secondary School",
  email: "parick.chank@email.com",
  phone: "+852 9123 4567",
  date_of_birth: "2005-08-15",
};

const route = useRoute();
const router = useRouter();
const activeTab = ref(route.query.activeTab || "information");

// Watch for route changes (e.g., browser navigation)
watch(
  () => route.query.activeTab,
  (newTab) => {
    if (newTab && newTab !== activeTab.value) {
      activeTab.value = newTab;
    }
  }
);

// Update router query when tab changes
function setActiveTab(tab) {
  activeTab.value = tab;
  router.replace({ query: { ...route.query, activeTab: tab } });
}
</script>

<template>
  <div>
    <div class="h-screen self-center w-screen mt-4 md:w-5xl">
      <div>
        <div class="flex flex-col w-full gap-4">
          <div class="flex w-full bg-white border border-gray-100">
            <div class="flex flex-col w-full p-2">
              <div class="flex w-full relative justify-start items-center">
                <img
                  :src="student.profilePicture"
                  alt="Profile Picture"
                  class="w-16 h-16 rounded-full border-2 border-gray-300"
                />
                <div class="flex flex-col px-2">
                  <h1 class="text-2xl font-bold text-gray-800">
                    {{ student.name }}
                  </h1>
                  <p class="text-gray-600">
                    {{
                      student.school
                        ? student.school
                        : "No school information available"
                    }}
                  </p>
                </div>
                <span
                  class="material-icons-outlined right-0 text-gray-400 hover:text-gray-500 cursor-pointer"
                  >edit</span
                >
              </div>
              <hr class="w-full border-gray-300 my-2" />
              <div class="grid grid-cols-1 md:grid-cols-4 px-2">
                <InfoCard>
                  <template #header> School Name </template>
                  <template #content>
                    {{ student.school_name }}
                  </template>
                </InfoCard>
                <InfoCard>
                  <template #header> Email address </template>
                  <template #content>
                    {{ student.email }}
                  </template>
                </InfoCard>

                <InfoCard>
                  <template #header> Phone Number </template>
                  <template #content>
                    {{ student.phone }}
                  </template>
                </InfoCard>

                <InfoCard>
                  <template #header> Date of Birth </template>
                  <template #content>
                    {{ student.date_of_birth }}
                  </template>
                </InfoCard>
              </div>
            </div>
          </div>

          <div
            class="flex flex-col md:flex-row w-full bg-white p-4 border border-gray-100"
          >
            <div class="flex flex-col w-full">
              <div class="flex flex-col md:flex-row gap-2">
                <button
                  :class="
                    activeTab === 'information'
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  "
                  class="font-semibold py-2 px-4 rounded-l"
                  @click="setActiveTab('information')"
                >
                  Information
                </button>
                <button
                  :class="
                    activeTab === 'goals'
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  "
                  class="font-semibold py-2 px-4"
                  @click="setActiveTab('goals')"
                >
                  Goals
                </button>
                <button
                  :class="
                    activeTab === 'subscriptions'
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  "
                  class="font-semibold py-2 px-4"
                  @click="setActiveTab('subscriptions')"
                >
                  Subscriptions
                </button>
                <button
                  :class="
                    activeTab === 'attendance'
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  "
                  class="font-semibold py-2 px-4"
                  @click="setActiveTab('attendance')"
                >
                  Attendance
                </button>
                <button
                  :class="
                    activeTab === 'history'
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  "
                  class="font-semibold py-2 px-4 rounded-r"
                  @click="setActiveTab('history')"
                >
                  History
                </button>
              </div>
              <hr class="w-full border-gray-300 my-2" />
              <div class="flex flex-col w-full justify-start items-center">
                <div class="flex flex-col p-2 w-full">
                  <template v-if="activeTab === 'information'">
                    <UserInfo />
                  </template>
                  <template v-else-if="activeTab === 'goals'">
                    <GoalsCard />
                  </template>
                  <template v-else-if="activeTab === 'subscriptions'">
                    <h1 class="text-2xl font-bold text-gray-800 mb-2">
                      Subscriptions
                    </h1>
                    <p class="text-gray-700">
                      This is the student's subscriptions section.
                    </p>
                  </template>
                  <template v-else-if="activeTab === 'attendance'">
                    <h1 class="text-2xl font-bold text-gray-800 mb-2">
                      Attendance
                    </h1>
                    <p class="text-gray-700">
                      This is the student's attendance section.
                    </p>
                  </template>
                  <template v-else-if="activeTab === 'history'">
                    <h1 class="text-2xl font-bold text-gray-800 mb-2">
                      History
                    </h1>
                    <p class="text-gray-700">
                      This is the student's history section.
                    </p>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
