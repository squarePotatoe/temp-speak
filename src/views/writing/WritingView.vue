<template>

  <div class="flex-1 p-4">

    <main class="flex flex-col mb-6">

      <div class="font-bold bg-indigo-50 pl-4 striped-bg rounded-l-sm rounded-r-3xl text-4xl mb-4">Article</div>

      <div class="grid md:grid-cols-4 gap-3">

        <div class="bg-indigo-50 p-4 rounded flex flex-col gap-4">
          <div class="">
            <h3>Purpose of writing</h3>
            <p>
              To inform and entertain.
            </p>
          </div>
          <div class="">
            <h3>Style</h3>
            <p>
              Informal
            </p>
          </div>
          <div class="">
            <h3>Target audience</h3>
            <p>
              Teenagers.
            </p>
          </div>

        </div>

        <div class="md:col-span-1">
          <div class="flex-col stems-center ">

          </div>
        </div>

        <!-- Tutorial video, mindmap, etc. goes here -->
        <div class=" p-3 rounded-md">
          <h2 class="text-2xl font-medium mb-2">Resources</h2>
          <div class="flex flex-col gap-4">
            <button class="bg-purple-500 hover:bg-purple-400 text-white font-medium p-2 rounded-xl ">Watch the tutorial</button>
            <button class="bg-indigo-500 hover:bg-indigo-400 text-white font-medium p-2 rounded-xl ">Mindmap</button>
          </div>
        </div>

      </div>

      <!-- Tasks -->
      <div class="mt-4 rounded bg-amber-50 p-4">
            <h1 class="font-medium text-2xl">Task:</h1>
            <p class="task-text">
              You are the host of ‘Teen Chat’, a YouTube channel that explores a wide range of topics from a teenage perspective. Write an article for Teen Magazine about why you started this channel and what you have learned in the process.
            </p>
      </div>

      <div class="flex m-4">
        <nav class="w-full flex">
          <button @click="toggleSidebar" class="items-center right-0 fixed mr-2 z-10" :class="{ 'animate-bounce' : !isHelpViewed }">
            <p :class="{ hidden : isHelpViewed}" class="text-indigo-500 text-xl">View tips</p>
            <span class="material-icons-outlined border rounded-4xl text-indigo-400 m-1">help</span>
          </button>
          <button  class="btn-editor">Toggle Views</button>
          <button  class="btn-editor">Toggle Both</button>

        </nav>
      </div>

      <div class="grid grid-cols-4">
        <!-- Left side notes -->
        <div class="col-span-1 bg-indigo-50 rounded p-4">
          <div>
            <div >
              <h2 class="mb-2">Useful Expressions</h2>
              <ul class="bg-white rounded p-2">
                <li>
                  <p>Firstly, I would like to say that...</p>
                </li>
                <li>
                  <p>
                    I started the channel because...
                  </p>
                </li>
                <li>
                  <p>
                    I have learned that...
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Main content -->
        <div class="col-span-3">
        <form @submit.prevent="submitForm" class="bg-indigo-50 p-1">
          <TextEditor v-model="form.content" />
        </form>
        </div>


        <!-- Right side notes -->

        <div class="bg-indigo-200 w-96 fixed right-0 bottom-0 p-4 h-96 rounded-tl-xl transition-transform transform duration-300" :class="{ 'translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen }">
          <div>
            <button @click="toggleSidebar" class="">
              <span class="material-icons-outlined">close</span>
            </button>
          </div>
          <ul class="overflow-auto h-full">
            <li>
              <h2>Helpful Tips</h2>
              <ul>
                <li>
                  <p>Use the 'Useful Expressions' to help you get started.</p>
                </li>
                <li>
                  <p>Remember to use the 'Task' as a guide for your writing.</p>
                </li>
                <li>
                  <p>Use the 'Resources' to help you with your writing.</p>
                </li>
                                <li>
                  <p>Use the 'Useful Expressions' to help you get started.</p>
                </li>
                <li>
                  <p>Remember to use the 'Task' as a guide for your writing.</p>
                </li>
                <li>
                  <p>Use the 'Resources' to help you with your writing.</p>
                </li>
                                <li>
                  <p>Use the 'Useful Expressions' to help you get started.</p>
                </li>
                <li>
                  <p>Remember to use the 'Task' as a guide for your writing.</p>
                </li>
                <li>
                  <p>Use the 'Resources' to help you with your writing.</p>
                </li>
                                <li>
                  <p>Use the 'Useful Expressions' to help you get started.</p>
                </li>
                <li>
                  <p>Remember to use the 'Task' as a guide for your writing.</p>
                </li>
                <li>
                  <p>Use the 'Resources' to help you with your writing.</p>
                </li>
                                <li>
                  <p>Use the 'Useful Expressions' to help you get started.</p>
                </li>
                <li>
                  <p>Remember to use the 'Task' as a guide for your writing.</p>
                </li>
                <li>
                  <p>Use the 'Resources' to help you with your writing.</p>
                </li>
                                <li>
                  <p>Use the 'Useful Expressions' to help you get started.</p>
                </li>
                <li>
                  <p>Remember to use the 'Task' as a guide for your writing.</p>
                </li>
                <li>
                  <p>Use the 'Resources' to help you with your writing.</p>
                </li>
                                <li>
                  <p>Use the 'Useful Expressions' to help you get started.</p>
                </li>
                <li>
                  <p>Remember to use the 'Task' as a guide for your writing.</p>
                </li>
                <li>
                  <p>Use the 'Resources' to help you with your writing.</p>
                </li>
              </ul>
            </li>
          </ul>
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
    #ffffff,
    #eef2ff 10px,
    #b9eff9 10px,
    #eff5f7 20px
  );
}

li {
  list-style-type: disc;
  margin-left: 1rem;
}
.task-text {
  font-size: 1.25rem;
}
</style>