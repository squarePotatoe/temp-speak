<script setup>
import { ref } from "vue";

const props = defineProps({
  isTutorialVisible: {
    type: Boolean,
    default: false,
  },
  tutorialVideo: {
    type: String,
    default: "",
  },
});

const videoRef = ref(null);
const emit = defineEmits(["toggleTutorialModal"]);

console.log("Tutolial toggle", props.isTutorialVisible);

function closeModal() {
  pauseVideo();
  emit("toggleTutorialModal");
}

function rewindVideo() {
  if (videoRef.value) {
    videoRef.value.currentTime = Math.max(0, videoRef.value.currentTime - 5);
  }
}

function pauseVideo() {
  if (videoRef.value) {
    videoRef.value.pause();
  }
}

function playVideo() {
  if (videoRef.value) {
    videoRef.value.play();
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between w-full p-2 shadow">
      <span class="material-icons-outlined">smart_display</span>
      <div class="mohal-header">Teacher's Tutorial</div>
      <button
        @click="closeModal"
        class="flex justify-end items-center gap-2 p-2 border-slate-300 text-slate-700 font-semibold rounded-tr-lg rounded-bl-lg"
      >
        <span class="material-icons-outlined">close</span>
      </button>
    </div>
    <!-- <div class="flex flex-col p-4 bg-white w-full border-2 border-cyan-300 rounded-xl ">
                <div class="flex flex-col gap-2">
                    <video controls>
                        <source :src="studentHomeworkStore.todaysMaterial.videoTutorial" type="video/mp4">
                    </video>
                </div>
            </div> -->
    <div class="flex flex-col p-4 bg-white w-full rounded-b-xl">
      <div class="flex flex-col gap-2">
        <video ref="videoRef" controls>
          <source
            src="https://edu.speak3.com/storage/material_tutorial_video/DQp3rnrqgqZ0LgKAAvtDIzZ0OXUNzbgjZRpf1m3Q.mp4"
            type="video/mp4"
          />
          <!-- <source :src="lessonStore.todaysMaterial.videoTutorial" type="video/mp4"> -->
        </video>
        <div class="flex gap-2 mt-2 items-center justify-center">
          <button
            @click="rewindVideo"
            class="flex justify-center p-2 bg-blue-600 text-white font-semibold rounded-lg"
          >
            <span class="material-icons-outlined">replay_5</span>
            Rewind 5s
          </button>
          <button
            @click="pauseVideo"
            class="flex justify-center p-2 bg-yellow-600 text-white font-semibold rounded-lg"
          >
            <span class="material-icons-outlined">pause</span>
            Pause
          </button>
          <button
            @click="playVideo"
            class="flex justify-center p-2 bg-green-600 text-white font-semibold rounded-lg"
          >
            <span class="material-icons-outlined">play_arrow</span>
            Play
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
