<template>
    <div>
      <main class="flex flex-col mb-6">

        <div class="flex flex-col w-full ">
          <!-- <div class="flex flex-col col-span-1 bg-cyan-50">vocab</div> -->

          <ArticleTemplate />
  
          <!-- <div class="flex flex-col col-span-3 bg-slate-200 p-4">
            <div class="relative rounded-t-lg border-1 border-slate-100 flex flex-col h-ful w-full p-4 overflow-y-auto">
              <Message
                v-for="message in messages"
                :key="message.id"
                :message="message.message"
                :sender="message.sender"
              />
            </div>
  
            <div class="rounded-b-lg border-1 border-slate-100 flex w-full p-4">
              <input
                type="text"
                class="w-full p-2 border-1 border-slate-100 rounded-l-lg bg-white"
                placeholder="Type your message here"
                v-model="newMessage"
              />
              <button
                class="bg-sky-500 text-white font-semibold p-2 rounded-r-lg"
                @click="addMessage"
              >
                Send
              </button>
            </div>
          </div> -->
        </div>

        <!-- <div class="grid md:grid-cols-3 bg-indigo-50">
          <div class="col-span-1 bg-yellow-50">col</div>
          <div class="col-span-1 bg-green-50">col</div>
          <div class="col-span-1 bg-red-50">col</div>
        </div>

        <div class="flex gap-4 my-4 justify-evenly items-center">
            <button class="p-2 rounded bg-red-200">
                <span class="">Something</span>
            </button>
        </div> -->
  
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Message from './components/Message.vue'
import MainText from './components/ArticleTemplate.vue'
import ArticleTemplate from './components/ArticleTemplate.vue'

  
  const messages = ref([
    { id: 1, message: 'Hello, how are you?', sender: 'student' },
    { id: 2, message: 'I am fine, thank you.', sender: 'teacher' },
    { id: 3, message: 'What are you doing?', sender: 'student' },
    { id: 4, message: 'I am reading a book.', sender: 'teacher' },
    { id: 5, message: 'What book are you reading?', sender: 'student' },
    { id: 6, message: 'I am reading a book about programming.', sender: 'teacher' },
    { id: 7, message: 'What programming language are you learning?', sender: 'student' },
    { id: 8, message: 'I am learning JavaScript.', sender: 'teacher' },
    { id: 9, message: 'JavaScript is a great language.', sender: 'student' },
    { id: 10, message: 'Yes, it is.', sender: 'teacher' },
  ])
  
  const newMessage = ref('')
  
  function addMessage() {
    if (newMessage.value.trim() !== '') {
      messages.value.push({
        id: messages.value.length + 1,
        message: newMessage.value,
        sender: 'student',
      })
      newMessage.value = ''
    }
  }
  </script>