<template>

  <div >

    <main class="flex flex-col mb-6 ">

    <Header class="w-full p-4 h-full rounded-tl-xl transition-transform transform duration-100 " :class="{ 'translate-y-0': !isHeaderOpen, '-translate-y-full fixed -z-10': isHeaderOpen }" />

      <!-- View toggle navbar -->
      <div class="flex m-4">
        <nav class="w-full flex gap-2">
          <!-- <button @click="toggleSidebar" class="items-center right-0 fixed mr-2 z-10" :class="{ 'animate-bounce' : !isHelpViewed }">
            <p :class="{ hidden : isHelpViewed}" class="text-indigo-500 text-xl">View tips</p>
            <span class="material-icons-outlined border rounded-4xl text-indigo-400 m-1">help</span>
          </button> -->
          <button @click="toggleViews" class="bg-indigo-500 rounded hover:bg-indigo-400 text-white font-medium p-2">View {{ enabledView }}</button>
          <button @click="toggleSideBySide" class="bg-indigo-500 hover:bg-indigo-400 rounded text-white font-medium p-2">{{ sideBySide }}</button>
          <button @click="toggleHeader" class="bg-amber-400 rounded p-2 hover:bg-amber-300 font-medium">{{ headerButton }}</button>
          <div :class="{ hidden : !isHeaderOpen }"  class="group flex flex-col relative items-center">
            <button class=" bg-indigo-500 hover:bg-indigo-400 rounded text-white font-medium p-2">Task</button>
            <p
              class=" group-hover:opacity-100 transition-opacity bg-gray-700 p-2 text-white border-2 border-gray-600 rounded-md absolute translate-y-10 opacity-0 mt-2 w-[34rem] z-10 pointer-events-none"
            >
              {{ task }}
            </p>
          </div>
        </nav>

        <div class="flex gap-2">
          <span class="relative flex size-3 mr-1"> 
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-800 opacity-75"></span>
            <span class="relative inline-flex size-3 rounded-full bg-sky-500"></span>
          </span>
          <button @click="toggleSidebar" class="bg-green-500 rounded text-white font-medium p-2">Guide</button>
          <!-- <button @click="toggleHints" class="bg-orange-500 rounded text-white font-medium p-2">Checklist</button> -->
        </div>
      </div>

      <!-- Main content -->
      <div class="grid grid-cols-4">
        <!-- Left side notes -->
        <div class="col-span-1 bg-indigo-50 rounded p-4 overflow-y-auto max-h-[40rem] shadow-md">
          <SidebarLeft />
          <div>
            
          </div>
        </div>

        <!-- Togglable content -->
        <!-- Article only -->
        <div class="col-span-3 ml-4" v-if="isViewArticle">
          <Article :articleHeight="articleHeight" />
        </div>

        <!-- Editor only -->
        <div class="col-span-3 ml-4" v-else-if="isViewEditor">
          <form @submit.prevent="submitForm">
            <TextEditor v-model="form.content" />
          </form>
        </div>

        <!-- Side by side -->
        <div class="col-span-3 ml-4" v-else-if="isSideBySide">
          <div class="flex flex-col">
            <Article :articleHeight="'10rem'" />
            <form @submit.prevent="submitForm">
              <TextEditor v-model="form.content" />
            </form>
          </div>
        </div>
        <!-- Right side notes -->

        <div class="bg-cyan-100 w-1/2 lg:w-1/3 fixed right-0 bottom-0 p-2 top-2 h-fit rounded-tl-xl rounded-bl-xl transition-transform transform duration-300" :class="{ 'translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen }">
          <div class="flex items-center">
            <button @click="toggleSidebar" class="flex items-center justify-center my-2">
              <span class="material-icons-outlined">close</span>
              <h2>Guide</h2>
            </button>
          </div>
          <Tips />
        </div>

        <!-- <div class="bg-purple-200 w-1/2 lg:w-1/3 fixed right-0 bottom-0 p-2 top-2 h-fit rounded-tl-xl rounded-bl-xl transition-transform transform duration-300" :class="{ 'translate-x-full': !isHintsOpen, 'translate-x-0': isHintsOpen }">
          <div class="flex items-center">
            <button @click="toggleHints" class="flex items-center justify-center my-2">
              <span class="material-icons-outlined">close</span>
              <h2>Writing checklist </h2>
            </button>
          </div>
          <Guide />
        </div> -->


      </div>

    </main>

  </div>

</template>

<script setup>
import { ref } from 'vue'
import TextEditor from '@/views/writing/components/TextEditor.vue';
import Article from '@/views/writing/components/Article.vue';
import { demoTask, textFormatDemo } from '@/data';
import SidebarLeft from './components/SidebarLeft.vue';
import Tips from './components/Tips.vue';
import Header from './components/Header.vue';
import Guide from './components/Guide.vue';
const editor = ref(null)
const enabledView = ref('Editor')
const sideBySide = ref('Article / Editor')

const currentTask = textFormatDemo.find(item => item.id === 1)
const { task, } = currentTask

const isViewArticle = ref(true)
const isViewEditor = ref(false)

const isSideBySide = ref(false)

const articleHeight = ref('40rem')

const toggleSideBySide = () => {
  isSideBySide.value = !isSideBySide.value
  if (isSideBySide.value) {
    isViewArticle.value = false
    isViewEditor.value = false
    sideBySide.value = 'Article'
  } else {
    isViewArticle.value = true
    isViewEditor.value = false
    sideBySide.value = 'Article / Editor'
  }
}

const toggleViews = () => {
  if (isSideBySide.value) {
    isSideBySide.value = false
    isViewArticle.value = false
    isViewEditor.value = true
  }
  isViewArticle.value = !isViewArticle.value 
  isViewEditor.value = !isViewEditor.value
  enabledView.value = isViewArticle.value ? 'Editor' : 'Article'
  sideBySide.value = 'Article / Editor'
}


const form = ref({
  title: '',
  content: /*html*/``
})

const submitForm = () => {
  form.value.content = editor.value.getHTML()
  console.log('Form submitted with content:', form.value)
  // Perform any necessary actions with the content, such as sending it to a server
}

const isSidebarOpen = ref(false)
const isHelpViewed = ref(false)

const isHeaderOpen = ref(false)
const headerButton = ref('Focus mode')

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  isHelpViewed.value = true
}

const toggleHeader = () => {
  isHeaderOpen.value = !isHeaderOpen.value
  headerButton.value = isHeaderOpen.value ? 'Exit focus mode' : 'Focus mode'
}

const isHintsOpen = ref(false)

const toggleHints = () => {
  isHintsOpen.value = !isHintsOpen.value
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
 
ul li {
  list-style-type: disc;
  margin-left: 1rem;
}

ol li {
  list-style-type: decimal;
  margin-left: 1rem;
}

.task-text {
  font-size: 1.25rem;
}


.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

h6 {
  color: #656565
} 

</style>