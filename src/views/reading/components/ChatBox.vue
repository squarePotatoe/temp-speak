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
    }
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