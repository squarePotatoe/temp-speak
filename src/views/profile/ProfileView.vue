<script setup>
import InfoCard from "./components/InfoCard.vue";
import { ref } from "vue";

// Dummy data
const student = {
  profilePicture: "https://randomuser.me/api/portraits/men/90.jpg",
  name: "Patrick Chan",
  school: "Springfield High School",
  school_name: "Springfield High School",
  email: "c.patrick@example.com",
  phone: "+852 8567 8901",
  date_of_birth: "2005-08-15",
};

const activeTab = ref("information");
</script>

<template>
  <div>
    <div class="w-full mx-auto rounded-xl h-screen self-center">
      <div>
        <div class="flex flex-col w-full gap-4 pt-4">
          <div class="flex w-full bg-white p-4 border border-gray-100">
            <div class="flex flex-col w-full">
              <div class="flex w-full relative justify-start items-center">
                <img
                  :src="student.profilePicture"
                  alt="Profile Picture"
                  class="w-16 h-16 rounded-full border-2 border-gray-300"
                />
                <div class="flex flex-col p-2">
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
                  <span
                    class="material-icons-outlined right-0 text-gray-400 hover:text-gray-500 cursor-pointer"
                    >edit</span
                  >
                </div>
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

          <div class="flex w-full bg-white p-4 border border-gray-100">
            <div class="flex flex-col w-full">
              <div class="flex w-full gap-2">
                <button
                  :class="
                    activeTab === 'information'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  "
                  class="font-semibold py-2 px-4 rounded-l"
                  @click="activeTab = 'information'"
                >
                  Information
                </button>
                <button
                  :class="
                    activeTab === 'goals'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  "
                  class="font-semibold py-2 px-4"
                  @click="activeTab = 'goals'"
                >
                  Goals
                </button>
                <button
                  :class="
                    activeTab === 'subscriptions'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  "
                  class="font-semibold py-2 px-4"
                  @click="activeTab = 'subscriptions'"
                >
                  Subscriptions
                </button>
                <button
                  :class="
                    activeTab === 'attendance'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  "
                  class="font-semibold py-2 px-4"
                  @click="activeTab = 'attendance'"
                >
                  Attendance
                </button>
                <button
                  :class="
                    activeTab === 'history'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  "
                  class="font-semibold py-2 px-4 rounded-r"
                  @click="activeTab = 'history'"
                >
                  History
                </button>
              </div>
              <hr class="w-full border-gray-300 my-2" />
              <div class="flex justify-start items-center">
                <div class="flex flex-col p-2 w-full">
                  <template v-if="activeTab === 'information'">
                    <h1 class="text-2xl font-bold text-gray-800 mb-2">
                      Basic Information
                    </h1>
                    <p class="text-gray-700">
                      This is the student's basic information section.
                    </p>
                  </template>
                  <template v-else-if="activeTab === 'goals'">
                    <h1 class="text-2xl font-bold text-gray-800 mb-2">Goals</h1>
                    <p class="text-gray-700">
                      This is the student's goals section.
                    </p>
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
