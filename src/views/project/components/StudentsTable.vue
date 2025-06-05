<script setup>
import { ref, computed } from "vue";

const projects = ref([
  {
    id: 1,
    name: "Grammar Brilliance",
    students: [
      {
        id: 1,
        name: "Alice Johnson",
        class: "Form 1A",
        attendance: [1, 1, 0, 1, 1],
        quizzes: [{ score: 80 }, { score: 90 }, { score: 100 }],
      },
      {
        id: 2,
        name: "Bob Smith",
        class: "Form 1A",
        attendance: [1, 0, 1, 1, 1],
        quizzes: [{ score: 70 }, { score: 85 }],
      },
      {
        id: 3,
        name: "Charlie Lee",
        class: "Form 1B",
        attendance: [0, 1, 1, 1, 0],
        quizzes: [{ score: 60 }, { score: 75 }, { score: 80 }, { score: 90 }],
      },
      {
        id: 4,
        name: "Diana Evans",
        class: "Form 1B",
        attendance: [1, 1, 1, 1, 1],
        quizzes: [
          { score: 95 },
          { score: 100 },
          { score: 98 },
          { score: 92 },
          { score: 97 },
        ],
      },
      {
        id: 5,
        name: "Chan Ho Yin",
        class: "Form 1A",
        attendance: [1, 1, 1, 0, 1],
        quizzes: [{ score: 88 }, { score: 92 }],
      },
      {
        id: 6,
        name: "Wong Mei Ling",
        class: "Form 1A",
        attendance: [1, 1, 1, 1, 0],
        quizzes: [{ score: 75 }, { score: 80 }, { score: 85 }],
      },
      {
        id: 7,
        name: "Lee Ka Man",
        class: "Form 1B",
        attendance: [0, 1, 1, 1, 1],
        quizzes: [{ score: 90 }, { score: 93 }],
      },
      {
        id: 8,
        name: "Ng Tsz Lok",
        class: "Form 1B",
        attendance: [1, 0, 1, 1, 1],
        quizzes: [{ score: 78 }, { score: 82 }, { score: 85 }],
      },
      {
        id: 9,
        name: "Cheung Wing Sze",
        class: "Form 1A",
        attendance: [1, 1, 1, 1, 1],
        quizzes: [{ score: 99 }, { score: 97 }, { score: 95 }],
      },
      {
        id: 10,
        name: "Lam Hoi Ching",
        class: "Form 1B",
        attendance: [1, 1, 0, 1, 1],
        quizzes: [{ score: 85 }, { score: 88 }],
      },
    ],
  },
  {
    id: 2,
    name: "Vocabulary Building",
    students: [
      {
        id: 11,
        name: "Chan Ho Yin",
        class: "Form 2A",
        attendance: [1, 1, 1, 1, 0],
        quizzes: [{ score: 88 }, { score: 92 }],
      },
      {
        id: 12,
        name: "Wong Mei Ling",
        class: "Form 2B",
        attendance: [1, 1, 0, 1, 1],
        quizzes: [{ score: 75 }, { score: 80 }, { score: 85 }],
      },
      {
        id: 13,
        name: "Lau Chun Kit",
        class: "Form 2A",
        attendance: [1, 1, 1, 1, 1],
        quizzes: [{ score: 90 }, { score: 91 }, { score: 93 }],
      },
      {
        id: 14,
        name: "Yip Wing Yan",
        class: "Form 2B",
        attendance: [1, 0, 1, 1, 1],
        quizzes: [{ score: 80 }, { score: 85 }],
      },
      {
        id: 15,
        name: "Ho Ka Wai",
        class: "Form 2A",
        attendance: [0, 1, 1, 1, 0],
        quizzes: [{ score: 70 }, { score: 75 }],
      },
      {
        id: 16,
        name: "Leung Tsz Ching",
        class: "Form 2B",
        attendance: [1, 1, 1, 0, 1],
        quizzes: [{ score: 95 }, { score: 98 }],
      },
    ],
  },
]);

const selectedProjectId = ref(projects.value[0].id);

const selectedProject = computed(() =>
  projects.value.find((p) => p.id === selectedProjectId.value)
);

const students = computed(() => selectedProject.value?.students || []);

const overallAttendance = computed(() => {
  let total = 0;
  let count = 0;
  students.value.forEach((student) => {
    student.attendance.forEach((day) => {
      total += day;
      count++;
    });
  });
  return count ? Math.round((total / count) * 100) : 0;
});

const formattedStudents = computed(() => {
  return students.value.map((student) => {
    const attended = student.attendance.reduce((a, b) => a + b, 0);
    const quizzesCompleted = student.quizzes.length;
    const avgScore = quizzesCompleted
      ? Math.round(
          student.quizzes.reduce((sum, q) => sum + q.score, 0) /
            quizzesCompleted
        )
      : 0;
    let engagement = "Low";
    let engagementColor = "bg-red-100 text-red-700";
    if (attended >= 4 && avgScore >= 85) {
      engagement = "High";
      engagementColor = "bg-green-100 text-green-700";
    } else if (attended >= 3 && avgScore >= 70) {
      engagement = "Medium";
      engagementColor = "bg-yellow-100 text-yellow-700";
    }
    return {
      ...student,
      attendanceDisplay: `${attended}/5`,
      quizzesCompleted,
      avgScore,
      engagement,
      engagementColor,
    };
  });
});
</script>

<template>
  <div>
    <div class="mb-4">
      <label class="font-semibold mr-2">Project:</label>
      <select v-model="selectedProjectId" class="border rounded px-2 py-1">
        <option
          v-for="project in projects"
          :key="project.id"
          :value="project.id"
        >
          {{ project.name }}
        </option>
      </select>
    </div>
    <div
      class="mb-4 text-gray-700 text-sm bg-blue-50 border border-blue-100 rounded p-3"
    >
      <p>
        <strong>Overview:</strong> This dashboard shows a summary of student
        engagement and progress for the selected project group. For each
        student, you can see their class, weekly attendance (out of 5 days),
        number of quizzes completed, average quiz score, and an engagement
        rating (color-coded). Use the project selector above to switch between
        different student groups.
      </p>
    </div>
    <div class="mb-6">
      <div class="text-lg font-semibold">
        Overall Attendance:
        <span class="text-blue-600">{{ overallAttendance }}%</span>
      </div>
    </div>
    <div class="grid gap-4 md:grid-cols-2">
      <div
        v-for="student in formattedStudents"
        :key="student.id"
        class="bg-white border border-gray-200 rounded shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between"
      >
        <div class="flex-1">
          <div class="flex items-center mb-2">
            <div class="font-bold text-lg mr-2">{{ student.name }}</div>
            <span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{{
              student.class
            }}</span>
          </div>
          <div class="flex flex-wrap gap-4 text-sm">
            <div>
              <span class="font-semibold">Attendance:</span>
              <span>{{ student.attendanceDisplay }}</span>
            </div>
            <div>
              <span class="font-semibold">Quizzes:</span>
              <span>{{ student.quizzesCompleted }}</span>
            </div>
            <div>
              <span class="font-semibold">Avg. Score:</span>
              <span>
                {{ student.avgScore }}
                <span v-if="student.quizzesCompleted">%</span>
              </span>
            </div>
            <div>
              <span class="font-semibold">Engagement:</span>
              <span :class="`px-2 py-1 rounded ${student.engagementColor}`">{{
                student.engagement
              }}</span>
            </div>
          </div>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
          <RouterLink to="/report" class="p-2 bg-blue-400 text-white rounded">
            View Details
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
