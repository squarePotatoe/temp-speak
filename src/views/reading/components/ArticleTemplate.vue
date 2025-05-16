<script setup>
import { ref, onMounted } from "vue";
import ChatBox from "../../../components/ChatBox.vue";
import { readingDemo, readingVocab } from "@/data";
import VocabularyItem from "./VocabularyItem.vue";
import VocabularyCard from "./VocabularyCard.vue";
import TutorialModal from "./TutorialModule.vue";
import RecorderModal from "./RecorderModal.vue";

const props = defineProps({
  currentTaskId: {
    type: Number,
    default: 1,
  },
});

const currentTask = readingDemo.find((item) => item.id === 1);
const hasManyContent = currentTask.content.length > 2;

const currentVocab = readingVocab.find((item) => item.id === currentTask.id);

const isTutorialVisible = ref(false);

const isRecordingNow = ref(false);

function toggleTutorial() {
  isTutorialVisible.value = !isTutorialVisible.value;
}

const isReadingVisible = ref(false);
const isRecorderVisible = ref(false);

function toggleReading() {
  isReadingVisible.value = !isReadingVisible.value;
}

const selectedText = ref("");

function toggleRecorder() {
  isRecorderVisible.value = !isRecorderVisible.value;
  console.log("Recorder toggled" + isRecorderVisible.value);
}

const isSidebarOpen = ref(false);
const isLoading = ref(false);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

const chatBoxRef = ref(null);

function handleSubmitRecording({ blob, type }) {
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  console.log("HandleSubmitRecording1:", url);

  // Add the message to the chatbox via ref
  if (chatBoxRef.value && chatBoxRef.value.addMessageFromRecorder) {
    chatBoxRef.value.addMessageFromRecorder(url, type);
    console.log(" HandleSubmitRecording Recording submitted:", url);
  } else {
    console.error("ChatBox ref is not set or method does not exist");
  }
}

onMounted(() => {
  isLoading.value = true;
  try {
    selectedText.value = currentTask;
    console.log("Selected text:", selectedText.value);
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching data:", error);
    isLoading.value = false;
  }
});
</script>

<template>
  <div>
    <div class="text-lg text-slate-800 w-full">
      <!-- Header section -->
      <div class="flex flex-col max-w-4xl p-2 rounded-lg">
        <div
          class="text-6xl font-sans text-slate-700 w-full text-center my-4 p-2 rounded-xl"
        >
          {{ currentTask.title }}
        </div>
        <div
          class="flex flex-col gap-2 p-4 bg-gradient-to-br from-sky-100 via-blue-50 to-white border-2 border-sky-300 rounded-2xl shadow-md"
        >
          {{ currentTask.description }}
        </div>
      </div>

      <!-- Main text section -->

      <div class="flex flex-col md:grid md:grid-cols-3">
        <!-- First column -->
        <div class="flex flex-col pb-2">
          <div
            class="flex flex-col gap-4 p-4 bg-gradient-to-br from-sky-100 via-blue-50 to-white border-2 border-sky-300 rounded-2xl mx-2 shadow-md"
          >
            <button
              @click="toggleTutorial"
              class="flex items-center gap-2 p-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow transition"
            >
              <span class="material-icons-outlined text-2xl">play_circle</span>
              <span>Watch teacher's tutorial</span>
            </button>
            <div class="flex gap-2 animate-pulse">
              <button
                class="flex items-center gap-2 p-3 w-full bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl shadow transition"
                @click="toggleSidebar"
              >
                <span class="material-icons-outlined text-2xl">chat</span>
                Teacher Chat
              </button>
            </div>
            <div class="flex gap-2 animate-pulse">
              <button
                class="flex items-center gap-2 p-3 w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow transition"
                @click="toggleRecorder(0)"
              >
                <span class="material-icons-outlined text-2xl">mic</span>
                Record reading
              </button>
            </div>
          </div>
          <VocabularyCard>
            <VocabularyItem
              v-for="item in currentVocab.vocab"
              :key="item.id"
              :word="item.word"
              :definition="item.definition"
              :example="item.example"
              :image="item.img"
            />
          </VocabularyCard>
          <div class="px-2">
            <img
              :src="currentTask.image"
              alt="Article image"
              class="w-full h-full object-cover rounded-2xl border-4 border-sky-300 shadow-lg"
            />
          </div>
        </div>

        <!-- Tutorial modal -->
        <div
          class="bg-slate-100 border-slate-400 md:w-2/3 lg:w-1/3 fixed z-90 flex flex-col justify-end items-end left-0 bottom-0 top-20 h-fit rounded-tr-xl rounded-br-xl transition-transform transform duration-300"
          :class="{
            '-translate-x-full': !isTutorialVisible,
            'translate-x-0': isTutorialVisible,
          }"
        >
          <TutorialModal
            :isTutorialVisible="isTutorialVisible"
            :courseId="1"
            @toggleTutorialModal="toggleTutorial"
          />
        </div>

        <!-- Recorder modal -->
        <div
          v-if="isRecorderVisible"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        >
          <div
            class="bg-cyan-200 w-full max-w-lg md:w-1/2 rounded-xl shadow-2xl p-0 m-4"
          >
            <RecorderModal
              v-if="!isLoading"
              :isRecorderVisible="isRecorderVisible"
              :currentTask="currentTask"
              :selectedText="selectedText"
              :courseId="1"
              @toggleRecorder="toggleRecorder"
              @submitRecording="handleSubmitRecording"
            />
          </div>
        </div>

        <div
          class="bg-slate-100 z-90 fixed w-full lg:w-2/5 md:1/3 right-0 bottom-0 top-4 h-[400px] rounded-t-xl transition-transform transform duration-300"
          :class="{
            'translate-x-full': !isSidebarOpen,
            'translate-x-0 md:-translate-x-4': isSidebarOpen,
          }"
        >
          <div class="flex justify-between p-2 items-center">
            <span class="material-icons-outlined text-slate-700">chat</span>
            <div class="modal-header">Teacher chat</div>
            <button
              @click="toggleSidebar"
              class="flex items-center justify-center m-2"
            >
              <span class="material-icons-outlined text-slate-700">close</span>
            </button>
          </div>
          <div class="bg-blue-900 rounded-b-xl h-full">
            <ChatBox ref="chatBoxRef" :courseId="1" />
          </div>
        </div>

        <!-- Second column -->

        <div class="flex flex-col col-span-2 gap-6">
          <div class="flex flex-col">
            <h2
              class="flex items-center gap-2 text-3xl font-bold text-sky-800 p-3 bg-gradient-to-r from-sky-200 to-blue-100 w-fit rounded-t-2xl shadow-md mx-2"
            >
              <span class="material-icons text-sky-400 text-3xl"
                >menu_book</span
              >
              {{ currentTask.content[0].header }}
            </h2>
            <div
              class="relative flex flex-col p-6 bg-white border-2 border-sky-300 rounded-b-2xl rounded-tr-2xl mx-2 shadow-lg"
            >
              <div
                class="absolute top-0 left-0 px-2 border rounded-br-2xl bg-sky-500 text-white"
              >
                1
              </div>

              <span class="text-xl text-slate-700 font-medium leading-relaxed">
                {{ currentTask.content[0].content }}
              </span>
              <button
                @click="toggleRecorder(0)"
                class="absolute flex bottom-4 right-4 p-2 items-center gap-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full text-white font-semibold shadow hover:scale-105 transition"
              >
                <span class="material-icons-outlined text-lg">mic</span>
                Record
              </button>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="flex flex-col">
              <h2
                class="flex items-center gap-2 text-2xl font-bold text-sky-800 p-3 bg-gradient-to-r from-sky-200 to-blue-100 w-fit rounded-t-2xl shadow-md mx-2"
              >
                <span class="material-icons text-sky-400 text-2xl"
                  >auto_stories</span
                >
                {{ currentTask.content[1].header }}
              </h2>
              <div
                class="relative flex flex-col p-6 bg-white border-2 border-sky-300 rounded-b-2xl rounded-tr-2xl mx-2 shadow-lg"
              >
                <div
                  class="absolute top-0 left-0 px-2 border rounded-br-2xl bg-sky-500 text-white"
                >
                  2
                </div>
                <span
                  class="text-xl text-slate-700 font-medium leading-relaxed"
                >
                  {{ currentTask.content[1].content }}
                </span>
                <button
                  @click="toggleRecorder(1)"
                  class="absolute flex bottom-4 right-4 p-2 items-center gap-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full text-white font-semibold shadow hover:scale-105 transition"
                >
                  <span class="material-icons-outlined text-lg">mic</span>
                  Record
                </button>
              </div>
            </div>
            <div class="flex px-2">
              <div class="flex flex-col py-2 animate-slide-up w-full">
                <div
                  class="flex items-center gap-2 text-xl font-bold text-white p-3 bg-gradient-to-r from-emerald-600 to-emerald-400 w-fit rounded-t-2xl shadow-md"
                >
                  <span class="material-icons text-yellow-200 text-2xl"
                    >emoji_objects</span
                  >
                  <h2>An idiom to remember</h2>
                </div>
                <div
                  class="col-span-1 flex flex-col text-left h-full justify-center rounded-b-2xl rounded-tr-2xl p-6 bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-400 text-white shadow-lg"
                >
                  <div class="border-2 rounded-xl border-white p-4">
                    <div class="text-lg font-semibold italic">
                      "{{ currentTask.idiom.expression }}"
                    </div>
                    <div class="text-base mt-2">
                      {{ currentTask.idiom.meaning }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Spacer -->
          <div class="flex flex-col mx-2"></div>
          <div class="flex flex-col gap-4 md:flex-row">
            <div
              class="relative flex flex-col p-6 bg-white border-2 border-cyan-300 rounded-2xl mx-2 shadow-lg flex-1"
            >
              <div
                class="absolute top-0 left-0 px-2 border rounded-br-2xl rounded-tl-2xl bg-sky-500 text-white"
              >
                3
              </div>
              <span class="text-xl text-slate-700 font-medium leading-relaxed">
                {{ currentTask.content[3].content }}
              </span>
              <button
                @click="toggleRecorder(3)"
                class="absolute flex bottom-4 right-4 p-2 items-center gap-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full text-white font-semibold shadow hover:scale-105 transition"
              >
                <span class="material-icons-outlined text-lg">mic</span>
                Record
              </button>
            </div>
            <div
              class="relative flex flex-col p-6 bg-white border-2 border-cyan-300 rounded-2xl mx-2 shadow-lg flex-1"
            >
              <div
                class="absolute top-0 left-0 px-2 border rounded-br-2xl rounded-tl-2xl bg-sky-500 text-white"
              >
                4
              </div>
              <span class="text-xl text-slate-700 font-medium leading-relaxed">
                {{ currentTask.content[4].content }}
              </span>
              <button
                @click="toggleRecorder(4)"
                class="absolute flex bottom-4 right-4 p-2 items-center gap-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full text-white font-semibold shadow hover:scale-105 transition"
              >
                <span class="material-icons-outlined text-lg">mic</span>
                Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
