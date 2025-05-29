<script setup>
import { ref, onMounted } from "vue";
import Message from "./Message.vue";
import skysurfing from "@/assets/skysurfing.png";

const props = defineProps({
  courseId: {
    type: Number,
  },
});

// For demo purposes only
const messagesCourse1 = ref([
  {
    id: 0,
    sender: "admin",
    date: "2025-02-01",
  },
  {
    id: 1,
    message: "Hello! \nI hope you are as excited as I am to start this lesson!",
    sender: "teacher",
    name: "Trish",
  },
  {
    id: 2,
    message: "Hi! \nI am excited to start this lesson!",
    sender: "student",
    name: "Angel",
    audio:
      "https://edu.speak3.com/storage/homework_media/2025_03/fqWWHKVEv2Yqz0IkRX6YvnOd2Nmt9aSg3hu80Xsm.mp3",
  },
  {
    id: 3,
    message: `
Hello there,

Thank you for your reading.
You do make me laugh. when you say little extra things - like "Oh, no!" Keep doing that, it's lovely.
You have read this with confidence.

I can hear you pausing at tricky words. Try to practice this so you can read fluently.

Please practice -
31st (thirty) (first)
ever
beloved (pronounced) (be) (love) (ed)
aging (age)(ing)
expected (ex) (peck)(ted)
few (f) (you)
curled (kerr) (Id)
This is a good reading and will sound beautiful once you have these words.
As always, well done, Angel,
Trish
      
      `,
    sender: "teacher",
    name: "Trish",
    audio:
      "https://edu.speak3.com/storage/homework_feedback/sxxCukvF8cCjrGcVmVYIX4nKqrZEigJmSLbUAU7S.mp3",
  },
  {
    id: 4,
    message: "Thank you! \nI will practice those words.",
    sender: "student",
    name: "Angel",
  },
  {
    id: 5,
    sender: "admin",
    date: "2025-02-02",
  },
]);

const messagesCourse2 = ref([
  {
    id: 0,
    sender: "admin",
    date: "2025-02-01",
  },
  {
    id: 1,
    message: "Hello! \nI hope you are as excited as I am to start this lesson!",
    sender: "teacher",
    name: "Abi Ali",
  },
  {
    id: 2,
    message: "Hi! \nI am excited to start this lesson!",
    sender: "student",
    name: "Samuel",
    audio:
      "https://edu.speak3.com/storage/homework_media/2024_06/wMOw0aGEO3SWGYx3RSJVlZw6KNsO21pkoGZ7dBSY.mp4",
  },
  {
    id: 3,
    message: `
Thank you for your reading, Samuel.

You have read this with confidence and fluency. I can hear you pausing at tricky words. Try to practice this so you can read fluently.
Please practice the following words:

helps us - make sure you get the S sound at the end of helps
bumps - sound out the P

Practice this sentence:
We use our tongue to make different sounds when we speak.

Can you think of another word for small?

      
      `,
    sender: "teacher",
    name: "Abi Ali",
    audio:
      "https://edu.speak3.com/storage/homework_feedback/icX4Hl2lbqT7vJRb0Or309Ijpw02JJx3NZv4aCeH.mp3",
  },
  {
    id: 4,
    message: "Thank you! \nI will practice those words.",
    sender: "student",
    name: "Angel",
  },
  {
    id: 5,
    sender: "admin",
    date: "2025-02-02",
  },
]);

const newMessage = ref("");

const predefinedReplies = [
  "That sounds interesting!",
  "Can you tell me more?",
  "What do you think about it?",
  "What are your thoughts on this?",
];

const messages = ref(
  props.courseId === 1 ? messagesCourse1.value : messagesCourse2.value
);

function addMessage() {
  if (newMessage.value.trim() !== "") {
    messages.value.push({
      id: messages.value.length + 1,
      message: newMessage.value,
      sender: "student",
    });
    newMessage.value = "";
    generateReplies();
  }
}

// for demo purposes only
function generateReplies() {
  const reply =
    predefinedReplies[Math.floor(Math.random() * predefinedReplies.length)];
  messages.value.push({
    id: messages.value.length + 1,
    message: reply,
    sender: "teacher",
  });
}

function addMessageFromRecorder(url, type) {
  const msg = {
    id: messages.value.length + 1,
    sender: "student",
    name: "You",
  };
  if (type === "audio") {
    msg.audio = url;
    msg.message = "Submitted an audio recording.";
  } else if (type === "video") {
    msg.video = url;
    msg.message = "Submitted a video recording.";
  }
  messages.value.push(msg);
}

defineExpose({
  addMessageFromRecorder,
});

const chatContainer = ref(null);

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

onMounted(() => {
  scrollToBottom();
});
</script>

<template>
  <div>
    <div class="grid bg-slate-50 w-full shadow-2xl">
      <div
        class="flex flex-col overflow-auto p-4 h-[calc(100vh-200px)] md:h-[400px]"
        ref="chatContainer"
      >
        <Message
          v-for="message in messages"
          :key="message.id"
          :message="message.message"
          :sender="message.sender"
          :name="message.name"
          :img="message.img"
          :audio="message.audio"
          :video="message.video"
        />
      </div>

      <div class="rounded-b-lg shadow bg-slate-100 flex w-full p-4">
        <textarea
          type="text"
          class="w-full p-2 flex-wrap border-1 border-slate-100 rounded-l-lg bg-white active:outline-none focus:outline-none h-12"
          placeholder="Type your message here"
          v-model="newMessage"
        ></textarea>
        <button
          class="bg-sky-500 text-white font-semibold p-2 rounded-r-lg"
          @click="addMessage"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>
