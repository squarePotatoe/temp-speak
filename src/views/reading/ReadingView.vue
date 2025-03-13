<template>
    <div>
      <main class="flex flex-col mb-6">

        <div class="flex flex-col">

        <!-- <div class="flex gap-2 w-fit absolute top-22 right-2 animate-pulse">
            <button class="rounded p-2 bg-indigo-600 text-lg text-white font-semibold" @click="toggleSidebar">Teacher Chat</button>
        </div> -->

        <ArticleTemplate />

        <!-- <div class="bg-cyan-700 w-1/2 fixed right-0 bottom-0 p-2 top-4 h-fit rounded-tl-xl rounded-bl-xl transition-transform transform duration-300" :class="{ 'translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen }">
        <div class="flex items-center text-white">
            <button @click="toggleSidebar" class="flex items-center justify-center my-2">
            <span class="material-icons-outlined">close</span>
            <h2>Chat</h2>
            </button>
        </div>
        <ChatBox />
        </div> -->
            
        </div>

    </main>
  </div>
</template>
  
<script setup>
import { ref } from 'vue'
import Message from './components/Message.vue'
import MainText from './components/ArticleTemplate.vue'
import ArticleTemplate from './components/ArticleTemplate.vue'
import ChatBox from './components/ChatBox.vue'

const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>