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

onMounted(() => {
  console.log("Recorder modal mounted" + props.currentTask.content.length);
});
</script>

<template>
  <div class="flex flex-col overflow-auto">
    <div class="flex w-full justify-end text-white">
      <button
        class="flex justify-end items-center gap-2 p-2 bg-amber-600 text-white font-semibold rounded-tr-lg rounded-bl-lg"
        @click="closeModal"
      >
        <h2>Close Recorder</h2>
        <span class="material-icons-outlined">close</span>
      </button>
    </div>
    <div v-if="isFinished" class="mt-4 p-4 bg-gray-100 rounded-lg w-full">
      <div class="grid grid-cols-2 w-full gap-2">
        <div>
          <h3 class="text-lg font-semibold mb-2">Review Your Recording:</h3>
          <!-- Video Playback -->
          <video
            v-if="mediaType === 'video'"
            ref="videoPlayer"
            class="w-full max-w-md rounded-lg"
            controls
            :src="playbackVideoURL"
          ></video>

          <!-- Audio Playback -->
          <audio
            v-else-if="mediaType === 'audio'"
            ref="audioPlayer"
            class="w-full max-w-md"
            controls
            :src="playbackAudioURL"
          ></audio>
        </div>

        <div
          class="flex flex-col md:flex-row gap-2 mt-2 h-full items-center justify-center"
        >
          <button
            @click="listenBeforeSend()"
            class="p-2 bg-blue-600 text-white font-semibold rounded-lg"
          >
            <span class="material-icons-outlined">play_circle</span>
            Listen
          </button>
          <button
            @click="submitHomework()"
            class="p-2 bg-green-600 text-white font-semibold rounded-lg"
          >
            <span class="material-icons-outlined">send</span>
            Submit
          </button>
          <button
            @click="cancelRecording()"
            class="p-2 bg-red-600 text-white font-semibold rounded-lg"
          >
            <span class="material-icons-outlined">cancel</span>
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col py-2">
      <video class="h-32 md:h-fit" ref="videoRef" controls>
        <source :src="courseId === 1 ? src1 : src2" type="video/mp4" />
        <!-- <source :src="lessonStore.todaysMaterial.videoTutorial" type="video/mp4"> -->
      </video>
      <div class="flex gap-2 items-center justify-center pt-2">
        <button
          @click="rewindTutorial"
          class="flex justify-center p-2 bg-blue-600 text-white font-semibold rounded-lg"
        >
          <span class="material-icons-outlined">replay_5</span>
          Rewind 5s
        </button>
        <button
          @click="puaseTutorial"
          class="flex justify-center p-2 bg-yellow-600 text-white font-semibold rounded-lg"
        >
          <span class="material-icons-outlined">pause</span>
          Pause
        </button>
        <button
          @click="playTutorial"
          class="flex justify-center p-2 bg-green-600 text-white font-semibold rounded-lg"
        >
          <span class="material-icons-outlined">play_arrow</span>
          Play
        </button>
      </div>
    </div>

    <div
      class="flex flex-col p-4 bg-white w-full border-2 border-cyan-300 rounded-xl"
    >
      <div class="flex flex-col gap-2">
        <div class="flex flex-col items-center gap-2">
          <div class="flex flex-col items-center" v-if="isRecordingNow">
            <video
              v-if="mediaType === 'video'"
              id="preview"
              class="max-h-48 rounded"
              autoplay
              muted
            ></video>
            <div class="col-span-1 flex gap-2">
              <span class="text-red-700 font-medium text-sm md:text-xl"
                >Recording Time: {{ Math.floor(time / 60) }}:{{
                  String(time % 60).padStart(2, "0")
                }}</span
              >
            </div>
            <div class="flex gap-2">
              <button
                @click="cancelRecording"
                class="flex items-center gap-2 p-2 h-fit bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg"
              >
                <span class="material-icons-outlined">stop</span>
                <span class="text-sm">Cancel</span>
              </button>
              <button
                @click="pauseRecording"
                class="flex items-center gap-2 p-2 h-fit text-white font-semibold rounded-lg bg-yellow-500 hover:bg-yellow-600"
              >
                <span v-if="!paused" class="material-icons-outlined"
                  >pause</span
                >
                <span v-else class="material-icons-outlined">play_arrow</span>
                <span class="text-sm">{{ !paused ? "Pause" : "Resume" }}</span>
              </button>
              <button
                @click="stopRecording"
                class="flex items-center gap-2 p-2 h-fit bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
              >
                <span class="material-icons-outlined">stop</span>
                <span class="text-sm">Finish</span>
              </button>
            </div>
          </div>
          <div
            class="flex flex-col relative border-2 rounded-xl border-cyan-100 p-2"
          >
            <div
              class="absolute top-0 left-0 px-2 border rounded-br-2xl bg-sky-500 text-white"
            >
              {{ currentId + 1 }}
            </div>
            <p class="p-4" v-html="selectedText.content[currentId].content"></p>
          </div>
        </div>
        <div class="flex gap-2 order-2 md:order-1">
          <div
            v-if="!isRecordingNow && !isFinished"
            class="flex flex-col gap-2 pt-2 items-center justify-center w-full"
          >
            <button
              @click="startRecording('audio')"
              class="flex items-center gap-2 p-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
            >
              <span class="material-icons-outlined">mic</span>
              <span class="text-sm">Record Audio</span>
            </button>
            <button
              @click="startRecording('video')"
              class="flex items-center gap-2 p-2 bg-purple-600 hover:bg-purlpe-700 text-white font-semibold rounded-lg"
            >
              <span class="material-icons-outlined">videocam</span>
              <span class="text-sm">Record Video</span>
            </button>
          </div>

          <div class="flex w-full items-center justify-center gap-2">
            <button
              v-if="currentId != 0"
              @click="viewPreviousText"
              class="flex items-center gap-2 p-2 bg-yellow-400 text-white font-semibold rounded-lg"
            >
              <span class="material-icons-outlined">arrow_left</span>
              <span class="text-sm">Previous Paragraph</span></button
            ><button
              v-if="currentId != props.currentTask.content.length - 1"
              @click="viewNextText"
              class="flex items-center gap-2 p-2 bg-green-400 text-white font-semibold rounded-lg"
            >
              <span class="text-sm">Next Paragraph</span>
              <span class="material-icons-outlined">arrow_right</span>
            </button>
          </div>
        </div>
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
    </div>
  </div>
</template>
