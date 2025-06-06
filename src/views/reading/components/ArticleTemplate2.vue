<script setup>
import { ref, onMounted } from "vue";
import ChatBox from "../../../components/ChatBox.vue";
import { readingDemo, readingVocab } from "@/data";
import VocabularyItem from "./VocabularyItem.vue";
import VocabularyCard from "./VocabularyCard.vue";
import TutorialModal from "./TutorialModule.vue";
import RecorderModal from "./RecorderModal.vue";
import tongueMap from "@/assets/tongue-map.jpeg";

const props = defineProps({
  currentTaskId: {
    type: Number,
    default: 1,
  },
});

const chatBoxRef = ref(null);
const isLoading = ref(false);

const currentTask = readingDemo.find((item) => item.id === 2);
const hasManyContent = currentTask.content.length > 2;

const currentVocab = readingVocab.find((item) => item.id === currentTask.id);

const isTutorialVisible = ref(false);

function toggleTutorial() {
  isTutorialVisible.value = !isTutorialVisible.value;
}

const isReadingVisible = ref(false);

function toggleReading() {
  isReadingVisible.value = !isReadingVisible.value;
}

function toggleRecorder() {
  isRecorderVisible.value = !isRecorderVisible.value;
  console.log("Recorder toggled" + isRecorderVisible.value);
}

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

const isRecorderVisible = ref(false);
const isAudioRecorded = ref(false);

const selectedText = ref("");

function recordAudio() {
  // Simulate audio recording
  setTimeout(() => {
    isAudioRecorded.value = true;
  }, 1000);
}

function replayAudio() {
  alert("Replaying audio");
}

function reRecordAudio() {
  isAudioRecorded.value = false;
  recordAudio();
}

function submitAudio() {
  alert("Audio submitted");
  isAudioRecorded.value = false;
  isRecorderVisible.value = false;
}

function recordVideo() {
  alert("Recording video");
}

const isSidebarOpen = ref(false);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
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
      <div class="flex md:flex-col max-w-4xl p-2 rounded-lg">
        <div
          class="text-6xl font-sans text-slate-700 w-full text-center my-4 p-2 rounded-xl"
        >
          {{ currentTask.title }}
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
          <div class="flex flex-col gap-1">
            <div class="px-2">
              <img
                :src="tongueMap"
                alt="Article image"
                class="w-full h-full object-cover rounded-2xl border-4 border-sky-300 shadow-lg"
              />
            </div>
            <div class="px-2">
              <img
                :src="currentTask.image"
                alt="Article image"
                class="w-full h-full object-cover rounded-2xl border-4 border-sky-300 shadow-lg"
              />
            </div>
          </div>
        </div>

        <!-- Tutorial modal -->
        <div
          class="bg-slate-100 border-slate-400 rounded md:w-2/3 lg:w-1/3 fixed z-90 flex flex-col justify-end items-end left-0 bottom-0 top-20 h-fit rounded-tr-xl rounded-br-xl transition-transform transform duration-300"
          :class="{
            '-translate-x-full': !isTutorialVisible,
            'translate-x-0': isTutorialVisible,
          }"
        >
          <TutorialModal
            :isTutorialVisible="isTutorialVisible"
            :courseId="2"
            @toggleTutorialModal="toggleTutorial"
            :startTime="1"
          />
        </div>

        <!-- Recorder modal -->
        <div
          v-if="isRecorderVisible"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        >
          <div class="bg-cyan-200 relative">
            <RecorderModal
              v-if="!isLoading"
              :isRecorderVisible="isRecorderVisible"
              :currentTask="currentTask"
              :selectedText="selectedText"
              :courseId="2"
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
            <ChatBox ref="chatBoxRef" :courseId="2" />
          </div>
        </div>

        <!-- Second column -->

        <div class="flex flex-col col-span-2 gap-8">
          <!-- Section 1: Main Reading Card -->
          <div class="flex flex-col md:flex-row gap-6 items-stretch">
            <div
              class="flex-1 flex flex-col justify-between bg-white/90 rounded-3xl shadow-xl border-4 border-pink-200 p-8 min-h-[220px] relative"
            >
              <div class="flex items-center gap-3">
                <span class="material-icons text-pink-400 text-4xl"
                  >menu_book</span
                >
                <div
                  class="text-2xl font-extrabold text-pink-700 drop-shadow-sm"
                >
                  {{ currentTask.content[0].header }}
                </div>
              </div>
              <div
                class="text-xl text-slate-700 leading-relaxed font-medium mb-4"
              >
                {{ currentTask.content[0].content }}
              </div>
            </div>
            <!-- Images area, more prominent for kids -->
            <div
              class="flex md:flex-col gap-4 justify-center items-center md:w-48"
            >
              <img
                :src="currentTask.content[0].img"
                alt="Related visual 1"
                class="w-40 h-40 object-cover rounded-2xl border-4 border-indigo-300 shadow-lg bg-white"
              />
              <img
                :src="currentTask.content[1].img"
                alt="Related visual 2"
                class="w-40 h-40 object-cover rounded-2xl border-4 border-pink-300 shadow-lg bg-white"
              />
            </div>
          </div>

          <!-- Section 2 and Idiom: Two cards side by side -->
          <div class="grid md:grid-cols-2 gap-8">
            <div
              class="flex flex-col bg-white/90 rounded-3xl shadow-xl border-4 border-indigo-200 p-8 relative min-h-[180px]"
            >
              <div class="flex items-center gap-3 mb-4">
                <span class="material-icons text-indigo-400 text-3xl"
                  >auto_stories</span
                >
                <h2 class="text-3xl font-bold text-indigo-700">
                  {{ currentTask.content[1].header }}
                </h2>
              </div>
              <div class="text-xl text-slate-700 font-medium mb-4">
                {{ currentTask.content[1].content }}
              </div>
            </div>
            <div
              class="flex flex-col bg-gradient-to-br from-emerald-200 via-emerald-100 to-white rounded-3xl shadow-xl border-4 border-emerald-300 p-8"
            >
              <div class="flex items-center gap-3 mb-4">
                <span class="material-icons text-emerald-500 text-3xl"
                  >emoji_objects</span
                >
                <h2 class="text-2xl font-extrabold text-emerald-800">
                  An idiom to remember
                </h2>
              </div>
              <div class="flex flex-col items-center">
                <div
                  class="border-4 rounded-2xl border-white p-6 bg-emerald-700 bg-opacity-80 w-full text-center"
                >
                  <div class="text-2xl font-bold italic text-white mb-2">
                    "{{ currentTask.idiom.expression }}"
                  </div>
                  <div class="text-lg text-white">
                    {{ currentTask.idiom.meaning }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 3: More Reading Cards -->
          <div class="flex flex-col md:flex-row gap-8">
            <div
              class="relative flex flex-col bg-white/90 border-4 border-cyan-300 rounded-3xl shadow-xl p-8 min-h-[140px] flex-1"
            >
              <div class="flex items-center gap-2 mb-2">
                <span class="material-icons text-cyan-400 text-2xl"
                  >record_voice_over</span
                >
                <span class="text-xl font-bold text-cyan-700"
                  >Try reading this!</span
                >
              </div>
              <div class="text-xl text-slate-700 font-medium mb-4">
                {{ currentTask.content[2].content }}
              </div>
            </div>
          </div>
          <div class="flex flex-col md:flex-row gap-8">
            <div
              class="relative flex flex-col bg-white/90 border-4 border-cyan-300 rounded-3xl shadow-xl p-8 min-h-[140px] flex-1"
            >
              <div class="flex items-center gap-2 mb-2">
                <span class="material-icons text-cyan-400 text-2xl"
                  >record_voice_over</span
                >
                <span class="text-xl font-bold text-cyan-700"
                  >Try reading this!</span
                >
              </div>
              <div class="text-xl text-slate-700 font-medium mb-4">
                {{ currentTask.content[3].content }}
              </div>
            </div>
            <div
              class="relative flex flex-col bg-white/90 border-4 border-cyan-300 rounded-3xl shadow-xl p-8 min-h-[140px] flex-1"
            >
              <div class="flex items-center gap-2 mb-2">
                <span class="material-icons text-cyan-400 text-2xl"
                  >record_voice_over</span
                >
                <span class="text-xl font-bold text-cyan-700"
                  >Try reading this!</span
                >
              </div>
              <div class="text-xl text-slate-700 font-medium mb-4">
                {{ currentTask.content[4].content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
