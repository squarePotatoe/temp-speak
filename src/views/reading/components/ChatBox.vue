<template>
    <div>
        <div class="flex flex-col col-span-3 bg-slate-50 rounded-lg">
            <div class="relative rounded-t-lg border-1 border-slate-100 flex flex-col h-120 overflow-auto  p-4">
              <Message
                v-for="message in messages"
                :key="message.id"
                :message="message.message"
                :sender="message.sender"
                :img="message.img"
                :audio="message.audio"
              />
            </div>
  
            <div class="rounded-b-lg border-1 border-slate-300 bg-slate-300 flex w-full p-4">
              <textarea
                type="text"
                class="w-full p-2 flex-wrap border-1 border-slate-100 rounded-l-lg bg-white active:outline-none focus:outline-none h-12"
                placeholder="Type your message here"
                v-model="newMessage"
              ></textarea>
              <button
                class="bg-sky-500 text-white font-semibold p-2 rounded-r-lg "
                @click="addMessage"
              >
                Send
              </button>
            </div>
          </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Message from './Message.vue'
import skysurfing from '@/assets/skysurfing.png'
  
const messages = ref([
  {
      id: 1,
      message: 'Hello! \nI hope you are as excited as I am to start this lesson!',
      sender: 'teacher',
      img: skysurfing
  },
  {
      id: 2,
      message: 'Hi! \nI am excited to start this lesson!',
      sender: 'student',
      audio: 'https://edu.speak3.com/storage/homework_media/2025_03/fqWWHKVEv2Yqz0IkRX6YvnOd2Nmt9aSg3hu80Xsm.mp3',
  },
  {
      id: 3,
      message: `
Hi, Angel,

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
      sender: 'teacher',
      audio: 'https://edu.speak3.com/storage/homework_feedback/sxxCukvF8cCjrGcVmVYIX4nKqrZEigJmSLbUAU7S.mp3',

  },
  

])

const newMessage = ref('')

const predefinedReplies = [
  'That sounds interesting!',
  'Can you tell me more?',
  'What do you think about it?',
  'What are your thoughts on this?',
  ]

  function addMessage() {
if (newMessage.value.trim() !== '') {
  messages.value.push({
    id: messages.value.length + 1,
    message: newMessage.value,
    sender: 'student',
  })
  newMessage.value = ''
  generateReplies()
}
}

function generateReplies() {
const reply = predefinedReplies[Math.floor(Math.random() * predefinedReplies.length)]
messages.value.push({
  id: messages.value.length + 1,
  message: reply,
  sender: 'teacher',
})
}
</script>