<template>

  <div class="flex-1 p-4">

    <main class="flex flex-col mb-6">

      <!-- Tasks -->
      <div class="grid md:grid-cols-4 gap-3">

        <div class="bg-indigo-50 p-4 rounded">
          <h2>Purpose of writin</h2>
        </div>

        <div class="md:col-span-2">
              <div class="flex-col stems-center ">
                <h1 class="font-bold bg-indigo-100 pl-4 striped-bg rounded-l-sm rounded-r-3xl text-4xl">Article</h1>
                <h2 class="font-medium text-2xl">Task:</h2>
                <p>
                  You are the host of ‘Teen Chat’, a YouTube channel that explores a wide range of topics from a teenage perspective. Write an article for Teen Magazine about why you started this channel and what you have learned in the process.
                </p>
              </div>
        </div>

        <!-- Tutorial video, mindmap, etc. goes here -->
        <div class="bg-indigo-50 p-3 rounded-md">
          <h2 class="text-2xl font-medium mb-2">Resources</h2>
          <div class="flex flex-col gap-4">
            <button class="bg-purple-500 hover:bg-purple-400 text-white font-medium p-2 rounded-xl ">Watch the tutorial</button>
            <button class="bg-indigo-500 hover:bg-indigo-400 text-white font-medium p-2 rounded-xl ">Mindmap</button>
          </div>
        </div>

      </div>

      <div class="flex m-4">
        <nav class="w-full">
          <button  class="btn-editor">Toggle Views</button>
          <button  class="btn-editor">Toggle Both</button>
          <button @click="toggleSidebar" class="p-2 items-center flex right-0 fixed" :class="{ 'animate-bounce' : !isHelpViewed }">
            <p :class="{ hidden : isHelpViewed}" class="text-indigo-500">View tips</p>
            <span class="material-icons-outlined text-2xl border rounded-4xl text-indigo-400 m-1">help</span>
          </button>
        </nav>
      </div>

      <div class="grid grid-cols-4">
        <!-- Left side notes -->
        <div class="col-span-1 bg-indigo-50 rounded p-4">
          <div>
            <ul>
              <li class="">Notes</li>
              <li>Notes</li>
              <li>Notes</li>
            </ul>
          </div>
        </div>

        <!-- Main content -->
        <div class="col-span-3">
        <form @submit.prevent="submitForm" class="bg-indigo-50 p-1">
          <TextEditor v-model="form.content" />
        </form>
        </div>


        <!-- Right side notes -->

        <div class="bg-indigo-200 w-96 fixed top-0 right-0 h-full p-4 transition-transform transform duration-300" :class="{ 'translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen }">
          <button @click="toggleSidebar">
            Close
          </button>
        </div>

      </div>

    </main>

  </div>

</template>

<script setup>
import { ref } from 'vue'
import TextEditor from '@/views/writing/components/TextEditor.vue';
import Article from '@/views/writing/components/Article.vue';
import Task from './components/Task.vue';
import Notes from './components/Notes.vue';
const editor = ref(null)

const form = ref({
  title: '',
  content: ""
})

const submitForm = () => {
  form.value.content = editor.value.getHTML()
  console.log('Form submitted with content:', form.value)
  // Perform any necessary actions with the content, such as sending it to a server
}

const isSidebarOpen = ref(false)
const isHelpViewed = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  isHelpViewed.value = true
}

</script>

<style>
.striped-bg {
  background: repeating-linear-gradient(
    115deg,
    #eef2ff,
    #eef2ff 10px,
    #d7f6fc 10px,
    #d4e6e9 20px
  );
}
</style>