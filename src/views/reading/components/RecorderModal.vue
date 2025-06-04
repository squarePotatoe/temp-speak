<script setup>
import { ref, watch, onMounted } from "vue";
import Swal from "sweetalert2";

const props = defineProps({
  currentTask: {
    type: Object,
  },
  isRecorderVisible: {
    type: Boolean,
    default: false,
  },
  selectedText: {
    type: Object,
  },
  isRecordingNow: {
    type: Boolean,
    default: false,
  },
  courseId: {
    type: Number,
    default: 0,
  },
});

const src1 =
  "https://edu.speak3.com/storage/material_tutorial_video/DQp3rnrqgqZ0LgKAAvtDIzZ0OXUNzbgjZRpf1m3Q.mp4";
const src2 =
  "https://edu.speak3.com/storage/material_tutorial_video/LJCyClIb7Yv61uTqHdDMdoEnHnIDCWG5mIZqgySE.mp4";

const isRecorderVisible = ref(props.isRecorderVisible);

const selectedTextArray = ref(props.selectedText);
const currentId = ref(0);
const videoRef = ref(null);

const playbackAudioURL = ref(null);
const playbackVideoURL = ref(null);
const isRecordingNow = ref(props.isRecordingNow);
const paused = ref(false);
const time = ref(0);
let mediaRecorder = null;
let timer = null;
let newMedia = null;
let mediaType = null;
const sendTimer = ref(0);
const sendStage = ref(0);
const videoPlayer = ref(null);
const audioPlayer = ref(null);
const recordings = ref([]);
const recordingType = ref(null);
const isFinished = ref(false);

const viewNextText = () => {
  if (currentId.value < selectedTextArray.value.content.length - 1) {
    currentId.value++;
  } else {
    currentId.value = 0;
  }
};

const viewPreviousText = () => {
  if (currentId.value > 0) {
    currentId.value--;
  } else {
    currentId.value = 0;
  }
};

const isAudioRecorded = ref(false);

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

const emit = defineEmits(["toggleRecorder", "submitRecording"]);

console.log("Tutolial toggle", props.isTutorialVisible);

function closeModal() {
  pauseVideo();
  emit("toggleRecorder");
}

function pauseVideo() {
  const video = document.querySelector("video");
  if (video) {
    video.pause();
  }
}

function rewindTutorial() {
  if (videoRef.value) {
    videoRef.value.currentTime = Math.max(0, videoRef.value.currentTime - 5);
  }
}

function puaseTutorial() {
  if (videoRef.value) {
    videoRef.value.pause();
  }
}

function playTutorial() {
  if (videoRef.value) {
    videoRef.value.play();
  }
}

function submitHomework() {
  Swal.fire({
    title: "Are you sure?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, submit it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "Check Teacher Chat!",
        "Your homework has been submitted",
        "success"
      );
      // Emit the audio/video blob and type to parent for chatbox
      emit("submitRecording", {
        blob: newMedia,
        type: mediaType,
      });
      console.log("Submitting homework with blob:", newMedia);
      console.log("Submitting homework with type:", mediaType);

      closeModal();
    }
  });
}

async function startRecording(type) {
  isRecordingNow.value = true;
  recordingType.value = type;
  mediaType = type;
  let stream;
  console.log("Starting recording with type:", type);

  try {
    if (type === "video") {
      console.log("Requesting video and audio permissions");
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      console.log("Stream obtained:", stream);

      const preview = document.getElementById("preview");
      if (preview) {
        console.log("Setting stream to preview element");
        preview.srcObject = stream;
        preview.captureStream =
          preview.captureStream || preview.mozCaptureStream;
      } else {
        console.error("Preview element not found");
      }
    } else {
      console.log("Requesting audio permissions");
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    }

    let options;
    if (type === "video") {
      if (MediaRecorder.isTypeSupported("video/webm; codecs=vp9")) {
        options = { mimeType: "video/webm; codecs=vp9" };
      } else if (MediaRecorder.isTypeSupported("video/webm")) {
        options = { mimeType: "video/webm" };
      } else if (MediaRecorder.isTypeSupported("video/mp4")) {
        options = { mimeType: "video/mp4", videoBitsPerSecond: 100000 };
      } else {
        console.error("No suitable MIME type found for video recording.");
      }
    } else {
      if (MediaRecorder.isTypeSupported("audio/webm")) {
        options = { mimeType: "audio/webm" };
      } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
        options = { mimeType: "audio/mp4" };
      } else {
        console.error("No suitable MIME type found for audio recording.");
      }
    }

    const recordedChunks = [];
    mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener("dataavailable", (e) => {
      console.log("Data available event triggered:", e);
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
        console.log("Recorded chunk added:", e.data);
      } else {
        console.warn("Data available event triggered but no data.");
      }
    });

    mediaRecorder.addEventListener("stop", () => {
      console.log("MediaRecorder stopped.");
      setTimeout(() => {
        if (recordedChunks.length > 0) {
          const newMediaBlob = new Blob(recordedChunks, {
            type: options.mimeType,
          });
        } else {
          console.error("No recorded chunks available to create media Blob.");
          Swal.fire({
            icon: "error",
            title: "Recording Failed",
            text: "No media data was recorded. Please try again.",
          });
        }
      }, 500); // Delay to ensure `dataavailable` has completed
    });

    mediaRecorder.start();

    timer = setInterval(() => {
      time.value++;
      if (time.value > 360) {
        stopRecording();
      }
    }, 1000);
  } catch (error) {
    console.error("Error accessing media devices:", error);
    Swal.fire({
      icon: "error",
      title: "Permission Denied",
      text: "Please allow access to your microphone and camera to record.",
    });
    isRecordingNow.value = false;
  }
}

async function pauseRecording() {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.pause();
    paused.value = true;
    clearInterval(timer);
  } else if (mediaRecorder && mediaRecorder.state === "paused") {
    mediaRecorder.resume();
    paused.value = false;
    timer = setInterval(() => {
      time.value++;
      if (time.value > 360) {
        stopRecording();
      }
    }, 1000);
  }
}

async function stopRecording() {
  if (time.value < 4) {
    Swal.fire({
      toast: true,
      position: "top-end",
      buttons: true,
      timer: 3000,
      timerProgressBar: true,
      icon: "error",
      title: "Too short",
      text: "Should be at least 3 seconds",
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    return false;
  }

  clearInterval(timer);
  isRecordingNow.value = false;
  paused.value = false;
  time.value = 0;

  console.log("Stopping MediaRecorder...");
  const recordedChunks = [];

  isFinished.value = true;

  // Wrap the stop process in a Promise to wait for the `dataavailable` event
  // So the recorded chunks are available before stopping the stream
  // This is necessary because `dataavailable` may not be triggered if `stop` is called immediately after `start`
  await new Promise((resolve) => {
    mediaRecorder.addEventListener("dataavailable", (e) => {
      console.log("Data available event triggered:", e);
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
        console.log("Recorded chunk added:", e.data);
      } else {
        console.warn("Data available event triggered but no data.");
      }
    });

    mediaRecorder.addEventListener("stop", () => {
      console.log("MediaRecorder stopped.");
      resolve();
    });
    mediaRecorder.stop();
  });

  console.log("Recorded Chunks:", recordedChunks);

  if (recordedChunks.length > 0) {
    newMedia = new Blob(recordedChunks, {
      type: mediaType === "video" ? "video/webm" : "audio/webm",
    });
    console.log("New Media Blob:", newMedia);

    const mediaURL = URL.createObjectURL(newMedia);
    if (mediaType === "video") {
      playbackVideoURL.value = mediaURL;
    } else {
      playbackAudioURL.value = mediaURL;
    }
  } else {
    console.error("No recorded chunks available to create media Blob.");
    Swal.fire({
      icon: "error",
      title: "Recording Failed",
      text: "No media data was recorded. Please try again.",
    });
  }

  if (mediaRecorder.stream) {
    mediaRecorder.stream.getTracks().forEach((track) => {
      console.log(`Stopping track: ${track.kind}`);
      track.stop();
    });
  }
}

function cancelRecording() {
  if (isRecordingNow.value || isFinished.value) {
    Swal.fire({
      icon: "warning",
      title: "Cancel Recording",
      text: "This will cancel the recording and you will lose your progress.",
      buttons: true,
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        cancelRecordingConfirmed();
      } else {
        return;
      }
    });
  }
}

function cancelRecordingConfirmed() {
  if (mediaRecorder) {
    mediaRecorder.stream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  clearInterval(timer);
  isRecordingNow.value = false;
  paused.value = false;
  time.value = 0;
  playbackAudioURL.value = null;
  playbackVideoURL.value = null;
  selectedText.value = materialArray.value[selectedParagraphIndex.value] || "";
  selectedParagraphIndex.value = null;
  isFinished.value = false;
  newMedia = null;
  mediaType = null;
  recordings.value[selectedParagraphIndex.value] = {
    type: null,
    media: null,
    recorded: false,
  };
  console.log("Recording cancelled and resources released.");
}

const isLargerViewEnabled = ref(true);

function enableLargerView() {
  isLargerViewEnabled.value = !isLargerViewEnabled.value;
}

function listenBeforeSend() {
  if (mediaType === "audio" && playbackAudioURL.value) {
    const audioElement = audioPlayer.value;
    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.play();
    }
  }

  if (mediaType === "video" && playbackVideoURL.value) {
    const videoElement = videoPlayer.value;
    if (videoElement) {
      videoElement.currentTime = 0;
      videoElement.play();
    }
  }

  sendTimer.value = 11; // Coundwond timer to make the student listen to the recording before sending
  sendStage.value = 1; // Here the student is listening to the recording
  countdownSendTimer();
}

function countdownSendTimer() {
  const interval = setInterval(() => {
    if (sendTimer.value > 0) {
      sendTimer.value--;
    } else {
      clearInterval(interval);
      sendStage.value = 0;
    }
  }, 1000);
}

const isLoading = ref(false);

onMounted(() => {
  console.log("Recorder modal mounted" + props.currentTask.content.length);
});
</script>

<template>
  <div class="flex flex-col overflow-auto bg-gray-50">
    <!-- Header -->
    <div
      class="flex w-full justify-between items-center p-3 bg-amber-600 rounded-t-xl shadow text-white"
    >
      <div class="flex items-center gap-2">
        <span class="material-icons-outlined text-xl md:text-2xl">mic</span>
        <h2 class="text-lg md:text-2xl font-bold">Reading Recorder</h2>
      </div>
      <button
        class="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold"
        @click="closeModal"
      >
        <span class="material-icons-outlined">close</span>
        <span class="hidden md:inline">Close</span>
      </button>
    </div>

    <!-- Main Content -->
    <div
      class="flex flex-col gap-3 md:gap-6 p-2 md:p-4 flex-1"
      :class="{
        'max-w-3xl mx-auto': !isLargerViewEnabled,
        'max-w-6xl md:flex-row mx-auto': isLargerViewEnabled,
      }"
    >
      <!-- Paragraph Card -->
      <div
        class="flex flex-col items-center justify-between bg-white rounded-xl shadow-lg p-3 md:p-6 w-full min-h-[220px]"
      >
        <div class="flex flex-col w-full items-center">
          <div class="flex items-center gap-2 mb-2">
            <span class="material-icons-outlined text-cyan-600">menu_book</span>
            <span class="text-cyan-700 font-semibold text-base md:text-lg"
              >Paragraph {{ currentId + 1 }} of
              {{ selectedText?.content?.length || 0 }}
            </span>
          </div>
          <div
            class="w-full bg-cyan-50 border border-cyan-200 rounded-lg p-3 md:p-4 text-base text-gray-800 min-h-[80px] max-h-40 md:max-h-full overflow-auto"
            :class="fontSize ? 'text-lg' : 'text-base'"
          >
            <span v-html="selectedText.content[currentId].content"></span>
          </div>
        </div>
        <!-- Navigation -->
        <div class="flex gap-2 md:gap-4 mt-4">
          <button
            v-if="currentId != 0"
            @click="viewPreviousText"
            class="flex items-center gap-2 px-3 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg text-sm md:text-base"
          >
            <span class="material-icons-outlined">arrow_left</span>
            Previous
          </button>
          <div class="flex-1"></div>
          <button
            v-if="currentId != props.currentTask.content.length - 1"
            @click="viewNextText"
            class="flex items-center gap-2 px-3 py-2 bg-green-400 hover:bg-green-500 text-white font-semibold rounded-lg text-sm md:text-base"
          >
            Next
            <span class="material-icons-outlined">arrow_right</span>
          </button>
        </div>
      </div>

      <!-- Recorder Area -->
      <div
        class="flex flex-col bg-white rounded-xl shadow-lg p-3 min-h-[220px]"
      >
        <!-- Review Area -->
        <div
          v-if="isFinished"
          class="flex flex-col items-center gap-3 md:gap-4"
        >
          <h3 class="text-base md:text-lg font-semibold mb-1 text-gray-700">
            Review Your Recording
          </h3>
          <div class="w-full flex flex-col items-center gap-2">
            <video
              v-if="mediaType === 'video'"
              ref="videoPlayer"
              class="w-full max-w-xs md:max-w-md rounded-lg border"
              controls
              :src="playbackVideoURL"
            ></video>
            <audio
              v-else-if="mediaType === 'audio'"
              ref="audioPlayer"
              class="w-full max-w-xs md:max-w-md"
              controls
              :src="playbackAudioURL"
            ></audio>
          </div>
          <div
            class="flex flex-col md:flex-row gap-2 md:gap-4 mt-2 w-full justify-center"
          >
            <button
              @click="listenBeforeSend()"
              class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            >
              <span class="material-icons-outlined">play_circle</span>
              Listen
            </button>
            <button
              @click="submitHomework()"
              class="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
            >
              <span class="material-icons-outlined">send</span>
              Submit
            </button>
            <button
              @click="cancelRecording()"
              class="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"
            >
              <span class="material-icons-outlined">cancel</span>
              Cancel
            </button>
          </div>
        </div>

        <!-- Recording Area -->
        <div v-else>
          <!-- Video Recording Split View -->
          <div
            v-if="isRecordingNow && mediaType === 'video'"
            class="flex flex-col md:flex-row gap-2 md:gap-4 items-center"
          >
            <!-- Student Camera Preview -->
            <div class="flex-1 flex flex-col items-center mb-2 md:mb-0">
              <span
                class="text-gray-700 font-semibold mb-1 text-sm md:text-base"
                >Your Camera</span
              >
              <video
                id="preview"
                class="w-full max-w-xs md:max-w-xs rounded-lg border-2 border-cyan-400 shadow"
                autoplay
                muted
              ></video>
            </div>
            <!-- Teacher Tutorial Video -->
            <div
              v-if="!isRecordingNow"
              class="flex-1 flex flex-col items-center"
            >
              <span
                class="text-gray-700 font-semibold mb-1 text-sm md:text-base"
                >Teacher's Tutorial</span
              >
              <video
                class="w-full max-w-xs md:max-w-xs rounded-lg border shadow"
                ref="videoRef"
                controls
              >
                <source :src="courseId === 1 ? src1 : src2" type="video/mp4" />
              </video>
              <div class="flex gap-1 md:gap-2 mt-2">
                <button
                  @click="rewindTutorial"
                  class="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-xs md:text-sm"
                >
                  <span class="material-icons-outlined">replay_5</span>
                  -5s
                </button>
                <button
                  @click="puaseTutorial"
                  class="flex items-center gap-1 px-2 py-1 bg-yellow-600 text-white rounded text-xs md:text-sm"
                >
                  <span class="material-icons-outlined">pause</span>
                  Pause
                </button>
                <button
                  @click="playTutorial"
                  class="flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded text-xs md:text-sm"
                >
                  <span class="material-icons-outlined">play_arrow</span>
                  Play
                </button>
              </div>
            </div>
          </div>

          <!-- Audio Recording Area -->
          <div
            v-else-if="isRecordingNow && mediaType === 'audio'"
            class="flex flex-col md:flex-row gap-3 items-center"
          >
            <div class="flex-1 flex flex-col items-center">
              <span
                class="material-icons-outlined text-5xl md:text-6xl text-red-500 animate-pulse"
                >mic</span
              >
              <span class="text-red-700 font-medium text-base md:text-lg mt-2">
                Recording Time: {{ Math.floor(time / 60) }}:{{
                  String(time % 60).padStart(2, "0")
                }}
              </span>
            </div>
            <div
              v-if="!isRecordingNow"
              class="flex-1 flex flex-col items-center mt-4 md:mt-0"
            >
              <span
                class="text-gray-700 font-semibold mb-1 text-sm md:text-base"
                >Teacher's Tutorial</span
              >
              <video
                class="w-full max-w-xs md:max-w-xs rounded-lg border shadow"
                ref="videoRef"
                controls
              >
                <source :src="courseId === 1 ? src1 : src2" type="video/mp4" />
              </video>
              <div class="flex gap-1 md:gap-2 mt-2">
                <button
                  @click="rewindTutorial"
                  class="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-xs md:text-sm"
                >
                  <span class="material-icons-outlined">replay_5</span>
                  -5s
                </button>
                <button
                  @click="puaseTutorial"
                  class="flex items-center gap-1 px-2 py-1 bg-yellow-600 text-white rounded text-xs md:text-sm"
                >
                  <span class="material-icons-outlined">pause</span>
                  Pause
                </button>
                <button
                  @click="playTutorial"
                  class="flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded text-xs md:text-sm"
                >
                  <span class="material-icons-outlined">play_arrow</span>
                  Play
                </button>
              </div>
            </div>
          </div>

          <!-- Tutorial Video Only (when not recording) -->
          <div v-else class="flex flex-col items-center">
            <span class="text-gray-700 font-semibold mb-1 text-sm md:text-base"
              >Teacher's Tutorial</span
            >
            <video
              class="w-full max-w-xs md:max-w-md rounded-lg border shadow"
              ref="videoRef"
              controls
            >
              <source :src="courseId === 1 ? src1 : src2" type="video/mp4" />
            </video>
            <div class="flex gap-1 md:gap-2 mt-2">
              <button
                @click="rewindTutorial"
                class="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-xs md:text-sm"
              >
                <span class="material-icons-outlined">replay_5</span>
                -5s
              </button>
              <button
                @click="puaseTutorial"
                class="flex items-center gap-1 px-2 py-1 bg-yellow-600 text-white rounded text-xs md:text-sm"
              >
                <span class="material-icons-outlined">pause</span>
                Pause
              </button>
              <button
                @click="playTutorial"
                class="flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded text-xs md:text-sm"
              >
                <span class="material-icons-outlined">play_arrow</span>
                Play
              </button>
            </div>
          </div>

          <!-- Recording Controls -->
          <div
            v-if="isRecordingNow"
            class="flex gap-2 md:gap-4 mt-4 justify-center"
          >
            <button
              @click="cancelRecording"
              class="flex items-center gap-2 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg text-sm md:text-base"
            >
              <span class="material-icons-outlined">stop</span>
              Cancel
            </button>
            <button
              @click="pauseRecording"
              class="flex items-center gap-2 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg text-sm md:text-base"
            >
              <span v-if="!paused" class="material-icons-outlined">pause</span>
              <span v-else class="material-icons-outlined">play_arrow</span>
              {{ !paused ? "Pause" : "Resume" }}
            </button>
            <button
              @click="stopRecording"
              class="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg text-sm md:text-base"
            >
              <span class="material-icons-outlined">stop</span>
              Finish
            </button>
          </div>

          <!-- Start Recording Controls -->
          <div
            v-if="!isRecordingNow && !isFinished"
            class="flex flex-col md:flex-row gap-2 md:gap-4 mt-6 justify-center"
          >
            <button
              @click="startRecording('audio')"
              class="flex items-center gap-2 px-5 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg text-base md:text-lg"
            >
              <span class="material-icons-outlined text-xl md:text-2xl"
                >mic</span
              >
              Record Audio
            </button>
            <button
              @click="startRecording('video')"
              class="flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg text-base md:text-lg"
            >
              <span class="material-icons-outlined text-xl md:text-2xl"
                >videocam</span
              >
              Record Video
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Audio Recorded Modal (unchanged) -->
    <div
      v-if="isAudioRecorded"
      class="fixed inset-0 flex items-center justify-center bg-green-50 bg-opacity-50 z-50"
    >
      <div class="bg-white p-4 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Well done!</h2>
        <div class="flex gap-2">
          <button
            @click="replayAudio"
            class="bg-blue-600 text-white font-semibold p-2 rounded-lg"
          >
            Replay
          </button>
          <button
            @click="reRecordAudio"
            class="bg-yellow-600 text-white font-semibold p-2 rounded-lg"
          >
            Re-record
          </button>
          <button
            @click="submitAudio"
            class="bg-green-600 text-white font-semibold p-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
