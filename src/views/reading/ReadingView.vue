<template>
    <div>
      <main class="flex flex-col mb-6">

        <div class="flex flex-col">

        <ArticleTemplate />
            
        </div>

    </main>
  </div>
</template>
  
<script setup>
import { ref } from 'vue'
import Message from '../../components/Message.vue'
import MainText from './components/ArticleTemplate.vue'
import ArticleTemplate from './components/ArticleTemplate.vue'
import ChatBox from '../../components/ChatBox.vue'

const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>