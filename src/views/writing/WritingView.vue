<template>

  <div class="flex-1 p-4">

    <main class="flex flex-col mb-6">

      <div class="font-bold bg-indigo-50 pl-4 striped-bg rounded-l-sm rounded-r-3xl text-4xl mb-4">Article</div>


        <div class="grid grid-cols-3">

          <!-- Tutorial video, mindmap, etc. goes here -->

          <div class=" p-3 rounded-md">
            <h2 class="text-2xl font-medium mb-2">Resources</h2>
            <div class="flex flex-col gap-4">
              <button class="bg-purple-500 hover:bg-purple-400 text-white font-medium p-2 rounded-xl ">Watch the tutorial</button>
              <button class="bg-indigo-500 hover:bg-indigo-400 text-white font-medium p-2 rounded-xl ">Mindmap</button>
            </div>
          </div>

        </div>


        <div class="bg-indigo-50 p-4 rounded flex text-center justify-evenly gap-4">
          <div class="group flex flex-col relative items-center">
            <div class="flex">
              <h3 class="">
                Purpose of writing
              </h3>
              <span class="material-icons-outlined">info</span>
            </div>
            <p>
              To inform and entertain.
            </p>
            <p class="group-hover:opacity-100 transition-opacity bg-gray-500 px-1 text-sm text-gray-100 rounded-md absolute translate-y-10 opacity-0 p-2 mt-2 w-64 max-w-full text-center">
              This article is meant to inform and entertain teenagers about the host's journey in creating a YouTube channel. The article should be engaging and informative.
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

      <!-- Tasks -->
      <div class="mt-4 rounded bg-amber-50 p-4">
            <h1 class="font-medium text-2xl">Task:</h1>
            <p class="task-text">
              {{ demoTask.content }}
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
        <div class="col-span-1 bg-indigo-50 rounded p-4 overflow-y-auto max-h-[40rem]">
          <SidebarLeft />
        </div>

        <!-- Main content -->
        <div class="col-span-3 ml-4">
          <div class="flex flex-col gap-4 bg-purple-100 p-2 rounded-md">
            <form @submit.prevent="submitForm" >
              <TextEditor v-model="form.content" />
            </form>
            <div>
              <Article :content="form.content"/>
            </div>
          </div>

        </div>


        <!-- Right side notes -->

        <div class="bg-indigo-200 w-1/2 fixed right-0 bottom-0 p-4 h-full rounded-tl-xl transition-transform transform duration-300" :class="{ 'translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen }">
          <div class="flex items-center">
            <button @click="toggleSidebar" class="">
              <span class="material-icons-outlined">close</span>
            </button>
            <h2>Helpful Tips</h2>
          </div>
          <div class="overflow-y-auto h-full mt-4 p-1">
            <ul v-for="tip in sidebarTips" :key="tip.id" class="">
                <li>
                  <p>{{ tip.content }}</p>
                </li>
              </ul>
          </div>

        </div>

      </div>

    </main>

  </div>

</template>

<script setup>
import { ref } from 'vue'
import TextEditor from '@/views/writing/components/TextEditor.vue';
import Article from '@/views/writing/components/Article.vue';
import { sidebarTips, demoTask, usefulExpressions, introductionSentences, connectives } from '@/data';
import SidebarLeft from './components/SidebarLeft.vue';
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

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>