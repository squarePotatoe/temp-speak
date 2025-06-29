<script setup>
import { ref, computed } from "vue";
import scan from "@/assets/scan.png";

const projects = ref([
  {
    id: 1,
    name: "Grammar Brilliance",
    textTypes: ["Reports", "Letters", "Articles"],
    commonErrors: ["Verb tenses", "Subject-verb agreement", "Prepositions"],
    students: [
      {
        id: 1,
        name: "Alice Johnson",
        class: "Form 1A",
        attendance: [1, 1, 0, 1, 1],
        quizzes: [
          { score: 80, type: "vocabulary" },
          { score: 90, type: "vocabulary" },
          { score: 100, type: "vocabulary" },
        ],
        spellingDictation: [{ score: 85 }, { score: 92 }],
        comprehension: { reports: 80, letters: 85, articles: 90 },
        preAssessment: 70,
        studentFeedback: "Found vocabulary quizzes very helpful",
      },
      {
        id: 2,
        name: "Bob Smith",
        class: "Form 1A",
        attendance: [1, 0, 1, 0, 0],
        quizzes: [
          { score: 40, type: "vocabulary" },
          { score: 55, type: "vocabulary" },
        ],
        spellingDictation: [{ score: 35 }, { score: 45 }],
        comprehension: { reports: 45, letters: 50, articles: 40 },
        preAssessment: 45,
        studentFeedback: "Needs more practice with vocabulary",
      },
      {
        id: 3,
        name: "Charlie Lee",
        class: "Form 1B",
        attendance: [0, 1, 1, 1, 0],
        quizzes: [
          { score: 60, type: "vocabulary" },
          { score: 75, type: "vocabulary" },
          { score: 80, type: "vocabulary" },
          { score: 90, type: "vocabulary" },
        ],
        spellingDictation: [{ score: 70 }, { score: 75 }, { score: 82 }],
        comprehension: { reports: 75, letters: 80, articles: 85 },
        preAssessment: 55,
        studentFeedback: "Enjoys reading different text types",
      },
      {
        id: 4,
        name: "Diana Evans",
        class: "Form 1B",
        attendance: [1, 1, 1, 1, 1],
        quizzes: [
          { score: 95, type: "vocabulary" },
          { score: 100, type: "vocabulary" },
          { score: 98, type: "vocabulary" },
          { score: 92, type: "vocabulary" },
          { score: 97, type: "vocabulary" },
        ],
        spellingDictation: [{ score: 98 }, { score: 96 }, { score: 100 }],
        comprehension: { reports: 95, letters: 98, articles: 92 },
        preAssessment: 85,
        studentFeedback: "Excellent engagement, ready for advanced tasks",
      },
      {
        id: 5,
        name: "Chan Ho Yin",
        class: "Form 1A",
        attendance: [1, 1, 1, 0, 1],
        quizzes: [
          { score: 88, type: "vocabulary" },
          { score: 92, type: "vocabulary" },
        ],
        spellingDictation: [{ score: 85 }, { score: 90 }],
        comprehension: { reports: 85, letters: 90, articles: 88 },
        preAssessment: 75,
        studentFeedback: "Good progress, enjoys interactive activities",
      },
      {
        id: 6,
        name: "Wong Mei Ling",
        class: "Form 1A",
        attendance: [1, 1, 1, 1, 0],
        quizzes: [
          { score: 75, type: "vocabulary" },
          { score: 80, type: "vocabulary" },
          { score: 85, type: "vocabulary" },
        ],
        spellingDictation: [{ score: 78 }, { score: 82 }],
        comprehension: { reports: 80, letters: 85, articles: 75 },
        preAssessment: 65,
        studentFeedback: "Steady improvement, needs encouragement",
      },
      {
        id: 7,
        name: "Lee Ka Man",
        class: "Form 1B",
        attendance: [0, 1, 1, 1, 0],
        quizzes: [
          { score: 90, type: "vocabulary" },
          { score: 93, type: "vocabulary" },
        ],
        spellingDictation: [{ score: 88 }, { score: 91 }],
        comprehension: { reports: 90, letters: 93, articles: 87 },
        preAssessment: 80,
        studentFeedback: "Strong performance despite attendance issues",
      },
      {
        id: 8,
        name: "Ng Tsz Lok",
        class: "Form 1B",
        attendance: [1, 0, 1, 1, 1],
        quizzes: [
          { score: 78, type: "vocabulary" },
          { score: 82, type: "vocabulary" },
          { score: 85, type: "vocabulary" },
        ],
        spellingDictation: [{ score: 75 }, { score: 80 }],
        comprehension: { reports: 78, letters: 82, articles: 80 },
        preAssessment: 70,
        studentFeedback: "Shows consistent improvement",
      },
      {
        id: 9,
        name: "Cheung Wing Sze",
        class: "Form 1A",
        attendance: [1, 1, 1, 1, 1],
        quizzes: [
          { score: 99, type: "vocabulary" },
          { score: 97, type: "vocabulary" },
          { score: 95, type: "vocabulary" },
        ],
        spellingDictation: [{ score: 98 }, { score: 99 }, { score: 97 }],
        comprehension: { reports: 97, letters: 99, articles: 95 },
        preAssessment: 88,
        studentFeedback: "Exceptional student, mentor potential",
      },
      {
        id: 10,
        name: "Lam Hoi Ching",
        class: "Form 1B",
        attendance: [1, 0, 0, 1, 0],
        quizzes: [
          { score: 55, type: "vocabulary" },
          { score: 88, type: "vocabulary" },
        ],
        spellingDictation: [{ score: 50 }],
        comprehension: { reports: 60, letters: 65, articles: 55 },
        preAssessment: 50,
        studentFeedback: "Irregular attendance affecting progress",
      },
    ],
  },
  {
    id: 2,
    name: "Vocabulary Building",
    textTypes: ["Essays", "Stories", "News Articles"],
    commonErrors: ["Vocabulary usage", "Word formation", "Context clues"],
    students: [
      {
        id: 11,
        name: "Chan Ho Yin",
        class: "Form 2A",
        attendance: [1, 1, 1, 1, 0],
        quizzes: [
          { score: 88, type: "vocabulary" },
          { score: 92, type: "vocabulary" },
        ],
        spellingDictation: [{ score: 85 }, { score: 90 }],
        comprehension: { essays: 85, stories: 90, news: 88 },
        preAssessment: 75,
        studentFeedback: "Enjoys vocabulary challenges",
      },
      {
        id: 12,
        name: "Wong Mei Ling",
        class: "Form 2B",
        attendance: [1, 1, 0, 1, 1],
        quizzes: [
          { score: 75, type: "vocabulary" },
          { score: 80, type: "vocabulary" },
          { score: 85, type: "vocabulary" },
        ],
        spellingDictation: [{ score: 78 }, { score: 82 }],
        comprehension: { essays: 80, stories: 85, news: 75 },
        preAssessment: 65,
        studentFeedback: "Prefers story-based learning",
      },
      {
        id: 13,
        name: "Lau Chun Kit",
        class: "Form 2A",
        attendance: [1, 1, 1, 1, 1],
        quizzes: [
          { score: 90, type: "vocabulary" },
          { score: 91, type: "vocabulary" },
          { score: 93, type: "vocabulary" },
        ],
        spellingDictation: [{ score: 88 }, { score: 92 }, { score: 95 }],
        comprehension: { essays: 90, stories: 93, news: 89 },
        preAssessment: 80,
        studentFeedback: "Consistent high performer",
      },
      {
        id: 14,
        name: "Yip Wing Yan",
        class: "Form 2B",
        attendance: [1, 0, 1, 1, 1],
        quizzes: [
          { score: 80, type: "vocabulary" },
          { score: 85, type: "vocabulary" },
        ],
        spellingDictation: [{ score: 82 }, { score: 85 }],
        comprehension: { essays: 80, stories: 85, news: 78 },
        preAssessment: 70,
        studentFeedback: "Good analytical skills",
      },
      {
        id: 15,
        name: "Ho Ka Wai",
        class: "Form 2A",
        attendance: [0, 1, 1, 1, 0],
        quizzes: [
          { score: 70, type: "vocabulary" },
          { score: 75, type: "vocabulary" },
        ],
        spellingDictation: [{ score: 68 }, { score: 72 }],
        comprehension: { essays: 70, stories: 75, news: 68 },
        preAssessment: 60,
        studentFeedback: "Needs more confidence building",
      },
      {
        id: 16,
        name: "Leung Tsz Ching",
        class: "Form 2B",
        attendance: [1, 1, 1, 0, 1],
        quizzes: [
          { score: 95, type: "vocabulary" },
          { score: 98, type: "vocabulary" },
        ],
        spellingDictation: [{ score: 96 }, { score: 98 }],
        comprehension: { essays: 95, stories: 98, news: 93 },
        preAssessment: 85,
        studentFeedback: "Outstanding performance across all areas",
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

const totalAvailableQuizzes = computed(() => {
  return 5;
});

const overallQuizCompletion = computed(() => {
  let total = 0;
  students.value.forEach((student) => {
    total += student.quizzes.length;
  });
  return total;
});

const overallAvgScore = computed(() => {
  let totalScore = 0;
  let quizCount = 0;
  students.value.forEach((student) => {
    student.quizzes.forEach((q) => {
      totalScore += q.score;
      quizCount++;
    });
  });
  return quizCount ? Math.round(totalScore / quizCount) : 0;
});

// New comprehensive analytics
const spellingDictationAvg = computed(() => {
  let totalScore = 0;
  let count = 0;
  students.value.forEach((student) => {
    if (student.spellingDictation) {
      student.spellingDictation.forEach((test) => {
        totalScore += test.score;
        count++;
      });
    }
  });
  return count ? Math.round(totalScore / count) : 0;
});

const comprehensionByTextType = computed(() => {
  const textTypes = selectedProject.value?.textTypes || [];
  const results = {};

  textTypes.forEach((type) => {
    const key = type.toLowerCase().replace(/\s+/g, "");
    let total = 0;
    let count = 0;

    students.value.forEach((student) => {
      if (student.comprehension && student.comprehension[key]) {
        total += student.comprehension[key];
        count++;
      }
    });

    results[type] = count ? Math.round(total / count) : 0;
  });

  return results;
});

const studentProficiencyGroups = computed(() => {
  const sortedStudents = [...formattedStudents.value].sort(
    (a, b) => b.avgScore - a.avgScore
  );
  const total = sortedStudents.length;
  const strongCount = Math.ceil(total * 0.3);
  const weakCount = Math.ceil(total * 0.3);

  return {
    strong: sortedStudents.slice(0, strongCount),
    weak: sortedStudents.slice(-weakCount),
    medium: sortedStudents.slice(strongCount, total - weakCount),
  };
});

const overallGrowth = computed(() => {
  let totalGrowth = 0;
  let count = 0;

  students.value.forEach((student) => {
    if (student.preAssessment && student.quizzes.length > 0) {
      const currentAvg =
        student.quizzes.reduce((sum, q) => sum + q.score, 0) /
        student.quizzes.length;
      const growth = currentAvg - student.preAssessment;
      totalGrowth += growth;
      count++;
    }
  });

  return count ? Math.round(totalGrowth / count) : 0;
});

const participationTrends = computed(() => {
  const consistent = students.value.filter(
    (s) => s.attendance.reduce((a, b) => a + b, 0) >= 4
  );
  const irregular = students.value.filter(
    (s) => s.attendance.reduce((a, b) => a + b, 0) <= 2
  );

  return {
    consistent: consistent.length,
    irregular: irregular.length,
    total: students.value.length,
  };
});

const studentFeedbackSummary = computed(() => {
  const positive = students.value.filter(
    (s) =>
      s.studentFeedback &&
      (s.studentFeedback.includes("helpful") ||
        s.studentFeedback.includes("enjoy") ||
        s.studentFeedback.includes("excellent") ||
        s.studentFeedback.includes("good"))
  ).length;

  return {
    positive,
    total: students.value.length,
    percentage: students.value.length
      ? Math.round((positive / students.value.length) * 100)
      : 0,
  };
});

const showScanModal = ref(false);

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

    // Calculate spelling dictation average
    const spellingAvg = student.spellingDictation?.length
      ? Math.round(
          student.spellingDictation.reduce((sum, test) => sum + test.score, 0) /
            student.spellingDictation.length
        )
      : 0;

    // Calculate comprehension average
    const comprehensionScores = student.comprehension
      ? Object.values(student.comprehension)
      : [];
    const comprehensionAvg = comprehensionScores.length
      ? Math.round(
          comprehensionScores.reduce((sum, score) => sum + score, 0) /
            comprehensionScores.length
        )
      : 0;

    // Calculate growth
    const growth = student.preAssessment ? avgScore - student.preAssessment : 0;

    let engagement = "Low";
    let engagementColor = "bg-red-100 text-red-700";
    if (attended >= 4 && avgScore >= 85) {
      engagement = "High";
      engagementColor = "bg-green-100 text-green-700";
    } else if (attended >= 3 && avgScore >= 70) {
      engagement = "Medium";
      engagementColor = "bg-yellow-100 text-yellow-700";
    }

    // Attendance color logic
    let attendanceColor = "bg-red-50 text-red-900";
    if (attended === 5) {
      attendanceColor = "bg-green-50 text-green-900";
    } else if (attended >= 3) {
      attendanceColor = "bg-blue-50 text-blue-900";
    }

    return {
      ...student,
      attendanceDisplay: `${attended}/5`,
      quizzesCompleted,
      avgScore,
      spellingAvg,
      comprehensionAvg,
      growth,
      engagement,
      engagementColor,
      attendanceColor,
    };
  });
});
</script>

<template>
  <div>
    <div class="mb-4 flex items-center justify-between">
      <div>
        <label class="font-semibold mr-2">Project:</label>
        <select
          v-model="selectedProjectId"
          class="border rounded px-2 py-1 bg-indigo-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option
            class="text-black bg-slate-200 hover:bg-slate-500"
            v-for="project in projects"
            :key="project.id"
            :value="project.id"
          >
            {{ project.name }}
          </option>
        </select>
      </div>

      <div>
        <div
          @click="showScanModal = true"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Report Spreadsheet
        </div>
      </div>
    </div>
    <!-- filepath: c:\xampp\htdocs\temp-speak\src\views\project\components\StudentsTable.vue -->
    <div
      v-if="showScanModal"
      class="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-80"
    >
      <div class="relative w-full h-full flex items-center justify-center">
        <img
          :src="scan"
          alt="Report Spreadsheet"
          class="max-w-full max-h-full rounded-lg shadow-2xl"
        />
        <button
          @click="showScanModal = false"
          class="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 text-black rounded-full p-2 shadow-lg"
        >
          <span class="material-icons text-2xl">close</span>
        </button>
      </div>
    </div>
    <div
      class="mb-4 text-gray-700 text-sm bg-blue-50 border border-blue-100 rounded p-3"
    >
      <p>
        <strong>Overview:</strong> This comprehensive dashboard provides
        detailed analytics on student engagement, academic performance, and
        proficiency categorization for data-driven educational decisions.
        Teachers can track attendance patterns, quiz performance, spelling
        dictation results, text comprehension by type, and student growth
        metrics to identify intervention needs and celebrate successes.
      </p>
    </div>

    <!-- Comprehensive Analytics Dashboard -->
    <div class="grid gap-6 mb-6">
      <!-- 1. Attendance & Engagement Section -->
      <div class="bg-white border border-gray-200 rounded-lg shadow p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
          📊 Attendance & Engagement
        </h3>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-blue-50 p-4 rounded">
            <div class="text-sm text-gray-600">Attendance Rate</div>
            <div class="text-2xl font-bold text-blue-600">
              {{ overallAttendance }}%
            </div>
            <div class="text-xs text-gray-500">Based on 5 days = 100%</div>
          </div>
          <div class="bg-green-50 p-4 rounded">
            <div class="text-sm text-gray-600">Sessions Completed</div>
            <div class="text-2xl font-bold text-green-600">
              {{ overallQuizCompletion }}/{{
                totalAvailableQuizzes * students.length
              }}
            </div>
            <div class="text-xs text-gray-500">Total sessions per week</div>
          </div>
          <div class="bg-purple-50 p-4 rounded">
            <div class="text-sm text-gray-600">Participation Trends</div>
            <div class="text-sm">
              <span class="text-green-700 font-semibold">{{
                participationTrends.consistent
              }}</span>
              consistent attendees |
              <span class="text-red-700 font-semibold">{{
                participationTrends.irregular
              }}</span>
              frequently absent
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Academic Performance Section -->
      <div class="bg-white border border-gray-200 rounded-lg shadow p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
          📚 Academic Performance
        </h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h4 class="font-semibold text-gray-700 mb-2">
              Vocabulary Quiz Results
            </h4>
            <div class="bg-purple-50 p-3 rounded">
              <div class="text-lg font-bold text-purple-600">
                {{ overallAvgScore }}%
              </div>
              <div class="text-sm text-gray-600">Average Score</div>
              <div class="text-xs mt-1">
                <strong>Top 30%:</strong>
                {{
                  studentProficiencyGroups.strong.map((s) => s.name).join(", ")
                }}
              </div>
            </div>
          </div>
          <div>
            <h4 class="font-semibold text-gray-700 mb-2">
              Spelling Dictation Results
            </h4>
            <div class="bg-orange-50 p-3 rounded">
              <div class="text-lg font-bold text-orange-600">
                {{ spellingDictationAvg }}%
              </div>
              <div class="text-sm text-gray-600">Average Score</div>
              <div class="text-xs mt-1">
                <strong>Common Errors:</strong>
                <span
                  v-for="(error, index) in selectedProject.commonErrors"
                  :key="index"
                >
                  {{ error
                  }}<span v-if="index < selectedProject.commonErrors.length - 1"
                    >,
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 class="font-semibold text-gray-700 mb-2">
              Text Types & Comprehension
            </h4>
            <div class="bg-teal-50 p-3 rounded">
              <div
                v-for="(score, textType) in comprehensionByTextType"
                :key="textType"
                class="text-sm"
              >
                <strong>{{ textType }}:</strong> {{ score }}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Student Proficiency Categorization -->
      <div class="bg-white border border-gray-200 rounded-lg shadow p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
          🎯 Student Proficiency Categorization
        </h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-green-50 border border-green-200 rounded p-4">
            <h4 class="font-semibold text-green-800 mb-2">
              💪 Strong Students (Top 30%)
            </h4>
            <div class="text-sm text-gray-600 mb-2">
              <strong>Criteria:</strong> >85% avg. quiz scores, high attendance
            </div>
            <div class="space-y-1">
              <div
                v-for="student in studentProficiencyGroups.strong"
                :key="student.id"
                class="text-sm"
              >
                <strong>{{ student.name }}</strong> - {{ student.avgScore }}%
                avg, {{ student.attendanceDisplay }} attendance
              </div>
            </div>
            <div class="text-xs text-green-700 mt-2">
              <strong>Suggested Follow-up:</strong> Advanced exercises,
              enrichment tasks, peer mentoring opportunities
            </div>
          </div>
          <div class="bg-red-50 border border-red-200 rounded p-4">
            <h4 class="font-semibold text-red-800 mb-2">
              📈 Students Needing Support (Bottom 30%)
            </h4>
            <div class="text-sm text-gray-600 mb-2">
              <strong>Criteria:</strong> <60% avg. scores, low attendance
            </div>
            <div class="space-y-1">
              <div
                v-for="student in studentProficiencyGroups.weak"
                :key="student.id"
                class="text-sm"
              >
                <strong>{{ student.name }}</strong> - {{ student.avgScore }}%
                avg, {{ student.attendanceDisplay }} attendance
              </div>
            </div>
            <div class="text-xs text-red-700 mt-2">
              <strong>Suggested Follow-up:</strong> Remedial sessions, targeted
              vocabulary drills, parent communication
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Teacher Recommendations -->
      <div class="bg-white border border-gray-200 rounded-lg shadow p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
          👩‍🏫 Teacher Recommendations
        </h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold text-gray-700 mb-2">
              🎯 Areas Needing Focus
            </h4>
            <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li v-if="spellingDictationAvg < 75">
                Spelling accuracy improvement
              </li>
              <li v-if="overallAttendance < 80">Attendance consistency</li>
              <li>Text-type analysis skills</li>
              <li v-for="error in selectedProject.commonErrors" :key="error">
                {{ error }}
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-gray-700 mb-2">
              🛠️ Proposed Interventions
            </h4>
            <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Peer tutoring pairs (strong with weak students)</li>
              <li>Extra practice materials for struggling students</li>
              <li>Parent communication for attendance issues</li>
              <li>Differentiated instruction based on proficiency levels</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 5. Additional Useful Metrics -->
      <div class="bg-white border border-gray-200 rounded-lg shadow p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
          📈 Additional Insights
        </h3>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-indigo-50 p-4 rounded">
            <h4 class="font-semibold text-indigo-800 mb-2">Growth Analysis</h4>
            <div class="text-2xl font-bold text-indigo-600">
              +{{ overallGrowth }}%
            </div>
            <div class="text-sm text-gray-600">
              Average improvement from pre-assessment
            </div>
          </div>
          <div class="bg-yellow-50 p-4 rounded">
            <h4 class="font-semibold text-yellow-800 mb-2">Student Feedback</h4>
            <div class="text-2xl font-bold text-yellow-600">
              {{ studentFeedbackSummary.percentage }}%
            </div>
            <div class="text-sm text-gray-600">
              Found activities helpful/engaging
            </div>
          </div>
          <div class="bg-gray-50 p-4 rounded">
            <h4 class="font-semibold text-gray-800 mb-2">
              Resource Effectiveness
            </h4>
            <div class="text-sm text-gray-600">
              <div>📚 Vocabulary quizzes: High impact</div>
              <div>📝 Spelling dictation: Moderate impact</div>
              <div>📖 Text comprehension: High impact</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Individual Student Cards -->
    <div class="mb-4">
      <h3 class="text-xl font-bold text-gray-800 mb-4">
        📋 Individual Student Details
      </h3>
    </div>
    <div class="grid gap-4 md:grid-cols-2">
      <div
        v-for="student in formattedStudents"
        :key="student.id"
        class="bg-white border border-gray-200 rounded shadow p-4"
      >
        <div class="flex-1">
          <div class="flex justify-between pb-2">
            <div class="flex flex-col md:flex-row items-start md:items-center">
              <div class="font-bold text-lg mr-2">{{ student.name }}</div>
              <span
                class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded flex items-center"
              >
                {{ student.class }}
              </span>
            </div>
            <div class="flex flex-col md:flex-row items-end md:items-center">
              <span class="font-semibold text-gray-700 text-sm mr-1"
                >Engagement</span
              >
              <span
                :class="`px-2 py-1 rounded text-xs ${student.engagementColor}`"
              >
                {{ student.engagement }}
              </span>
            </div>
          </div>

          <!-- Main metrics row -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-3">
            <!-- Attendance -->
            <div
              class="flex flex-col items-center px-2 py-2 rounded"
              :class="student.attendanceColor"
            >
              <span class="font-semibold text-xs">Attendance</span>
              <span class="text-lg font-bold">{{
                student.attendanceDisplay
              }}</span>
            </div>

            <!-- Vocabulary Quizzes -->
            <div
              class="flex flex-col items-center px-2 py-2 rounded bg-purple-50 border border-purple-200"
            >
              <span class="font-semibold text-xs text-purple-700"
                >Vocab Quiz</span
              >
              <span class="text-lg font-bold text-purple-900"
                >{{ student.avgScore }}%</span
              >
              <span class="text-xs text-gray-500"
                >({{ student.quizzesCompleted }} taken)</span
              >
            </div>

            <!-- Spelling Dictation -->
            <div
              class="flex flex-col items-center px-2 py-2 rounded bg-orange-50 border border-orange-200"
            >
              <span class="font-semibold text-xs text-orange-700"
                >Spelling</span
              >
              <span class="text-lg font-bold text-orange-900"
                >{{ student.spellingAvg }}%</span
              >
              <span class="text-xs text-gray-500"
                >({{ student.spellingDictation?.length || 0 }} tests)</span
              >
            </div>

            <!-- Comprehension -->
            <div
              class="flex flex-col items-center px-2 py-2 rounded bg-teal-50 border border-teal-200"
            >
              <span class="font-semibold text-xs text-teal-700">Reading</span>
              <span class="text-lg font-bold text-teal-900"
                >{{ student.comprehensionAvg }}%</span
              >
              <span class="text-xs text-gray-500">avg comprehension</span>
            </div>
          </div>

          <!-- Growth and Feedback -->
          <div class="bg-gray-50 rounded p-3 mb-3">
            <div class="flex justify-between items-center mb-2">
              <div class="text-sm">
                <span class="font-semibold text-gray-700">Growth:</span>
                <span
                  :class="
                    student.growth >= 0 ? 'text-green-600' : 'text-red-600'
                  "
                  class="font-bold"
                >
                  {{ student.growth >= 0 ? "+" : "" }}{{ student.growth }}%
                </span>
                <span class="text-xs text-gray-500">from pre-assessment</span>
              </div>
              <div class="text-sm">
                <span class="font-semibold text-gray-700">Pre-test:</span>
                <span class="text-gray-600">{{ student.preAssessment }}%</span>
              </div>
            </div>
            <div class="text-xs text-gray-600 italic">
              "{{ student.studentFeedback }}"
            </div>
          </div>

          <!-- Action buttons -->
          <div class="flex justify-between items-center">
            <RouterLink
              to="/report"
              class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
            >
              View Details
            </RouterLink>
            <div class="flex gap-2">
              <button
                v-if="
                  student.avgScore < 60 ||
                  student.attendance.reduce((a, b) => a + b, 0) < 3
                "
                class="px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition-colors"
              >
                📞 Contact Parent
              </button>
              <button
                v-if="
                  student.avgScore >= 85 &&
                  student.attendance.reduce((a, b) => a + b, 0) >= 4
                "
                class="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition-colors"
              >
                🌟 Enrichment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Why Schools Find This Useful -->
    <div
      class="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6"
    >
      <h3 class="text-xl font-bold text-gray-800 mb-4">
        🏫 Why Schools Find This Dashboard Valuable
      </h3>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <h4 class="font-semibold text-blue-800 mb-2">
            📊 Data-Driven Decisions
          </h4>
          <p class="text-sm text-gray-600">
            Clear metrics help allocate resources effectively, such as providing
            extra help for struggling students and advanced materials for high
            performers.
          </p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <h4 class="font-semibold text-green-800 mb-2">🎯 Accountability</h4>
          <p class="text-sm text-gray-600">
            Tracks both student progress and program effectiveness, providing
            evidence-based outcomes for administrators and parents.
          </p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <h4 class="font-semibold text-purple-800 mb-2">
            ⚡ Actionable Insights
          </h4>
          <p class="text-sm text-gray-600">
            Teachers save time with pre-identified student groups, suggested
            interventions, and automated follow-up recommendations.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
