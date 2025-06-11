<template>

  <div >

    <main class="flex flex-col mb-6 ">

    <Header class="w-full p-4 h-full rounded-tl-xl transition-transform transform duration-100 " :class="{ 'translate-y-0': !isHeaderOpen, '-translate-y-full fixed -z-10': isHeaderOpen }" />

      <!-- View toggle navbar -->
      <div class="flex m-4">
        <nav class="w-full flex gap-2">
          <button @click="toggleModelAnswer" class="bg-indigo-500 rounded hover:bg-indigo-400 text-white font-medium p-2">Model Answer</button>
          <button @click="toggleWritingView" class="bg-indigo-500 hover:bg-indigo-400 rounded text-white font-medium p-2">Write here</button>
          <div :class="{ hidden : !isHeaderOpen }"  class="group flex flex-col relative items-center">
            <button class=" bg-indigo-500 hover:bg-indigo-400 rounded text-white font-medium p-2">Task</button>
            <p
              class=" group-hover:opacity-100 transition-opacity bg-gray-700 p-2 text-white border-2 border-gray-600 rounded-md absolute translate-y-10 opacity-0 mt-2 w-[34rem] z-10 pointer-events-none"
            >
              {{ task }}
            <ul v-for="(item, index) in instructions" :key="index" class="pt-2">
              <li>{{ item }}</li>
            </ul>
            </p>

          </div>
          <button class="bg-amber-500 rounded hover:bg-amber-400 text-white font-medium p-2">View Feedback</button>

        </nav>

        <div class="flex w-full justify-end items-center gap-2">
          <button @click="toggleHeader" class="bg-amber-400 rounded p-2 hover:bg-amber-300 font-medium">{{ headerButton }}</button>
        <div class="flex gap-1">
          <span class="relative flex size-3 mr-1"> 
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-800 opacity-75"></span>
            <span class="relative inline-flex size-3 rounded-full bg-sky-500"></span>
          </span>
          <button @click="toggleSidebar" class="bg-green-500 rounded text-white font-medium p-2">Checklist</button>
        </div>
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
          <Email :articleHeight="articleHeight" />
        </div>

        <!-- Editor only -->
        <div class="col-span-3 ml-4" v-else-if="isViewEditor">
          <div class="flex flex-col">
          <div class="flex flex-col rounded-t-xl">

            <div class="flex flex-col rounded-t-xl">

<div class="flex items-center gap-4 my-2">

  <div class="flex-1">
    
    <div class="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl shadow-lg p-6 flex flex-col items-center min-h-[180px]">
      <div class="text-xl font-bold text-indigo-800 flex items-center gap-2 mb-2">
        <span class="material-icons text-indigo-400">lightbulb</span>
        Writing Tips
      </div>
      <div class="flex items-center gap-2 mb-2">
        <button
          @click="prevTip"
          :disabled="currentTipIndex === 0"
          class="p-2 rounded-full bg-amber-100 hover:bg-amber-200 disabled:opacity-50 shadow transition flex items-center justify-center"
          aria-label="Previous tip"
        >
          <span class="material-icons text-indigo-500">chevron_left</span>
        </button>
              <span class="material-icons text-yellow-400">star</span>
              <span class="text-base font-semibold text-indigo-700">
                Tip {{ currentTipIndex + 1 }} of {{ writingEmailTips.length }}
              </span>
                <button
                  @click="nextTip"
                  :disabled="currentTipIndex === writingEmailTips.length - 1"
                  class="p-2 rounded-full bg-green-100 hover:bg-green-200 disabled:opacity-50 shadow transition flex items-center justify-center"
                  aria-label="Next tip"
                >
                  <span class="material-icons text-indigo-500">chevron_right</span>
                </button>
      </div>
      <div class="text-lg text-gray-900 text-center font-medium mb-3">
        {{ writingEmailTips[currentTipIndex].content }}
      </div>
      <div class="w-full flex flex-col items-center">
        <div class="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-2 rounded text-yellow-900 text-center italic flex items-center gap-2">
          <span class="material-icons text-yellow-500">emoji_objects</span>
          <span class="font-semibold">Example:</span>
          <span class="ml-2">{{ writingEmailTips[currentTipIndex].example }}</span>
        </div>
      </div>
    </div>
  </div>
  

</div>

            </div>
          </div>

          <form @submit.prevent="submitForm">
            <TextEditor v-model="form.content" />
          </form>
          </div>

        </div>

        <!-- Side by side -->
        <!-- <div class="col-span-3 ml-4" v-else-if="isSideBySide">
          <div class="flex flex-col">
            <form @submit.prevent="submitForm">
              <TextEditor v-model="form.content" />
            </form>
          </div>
        </div> -->
        <!-- Right side notes -->

        <div class="bg-orange-100 w-1/2 lg:w-1/3 fixed right-0 bottom-0 p-2 top-4 h-fit rounded-tl-xl rounded-bl-xl transition-transform transform duration-300" :class="{ 'translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen }">
          <div class="flex items-center">
            <button @click="toggleSidebar" class="flex items-center justify-center my-2">
              <span class="material-icons-outlined">close</span>
              <h2>Guide</h2>
            </button>
          </div>
          <Tips />
        </div>
      </div>

    </main>

  </div>

</template>

<script setup>
import { ref } from 'vue'
import TextEditor from '@/views/writing/components/TextEditor.vue';
import Email from './components/Email.vue';
import { demoTask, textFormatDemo, writingEmailTips } from '@/data';
import SidebarLeft from './components/SidebarLeft.vue';
import Tips from './components/Tips.vue';
import Header from './components/Header.vue';


const editor = ref(null)
const enabledView = ref('Editor')
const sideBySide = ref('Write here')

const emailTips = writingEmailTips

const currentTask = textFormatDemo.find(item => item.id === 1)
const { task, instructions} = currentTask

const isViewArticle = ref(true)
const isViewEditor = ref(false)

const isSideBySide = ref(false)

const isViewReview = ref(false)

const articleHeight = ref('40rem')

const currentTipIndex = ref(0);

function prevTip() {
  if (currentTipIndex.value > 0) currentTipIndex.value--;
}
function nextTip() {
  if (currentTipIndex.value < writingEmailTips.length - 1) currentTipIndex.value++;
}

const toggleSideBySide = () => {
  isSideBySide.value = !isSideBySide.value
  if (isSideBySide.value) {
    isViewArticle.value = false
    isViewEditor.value = false
    sideBySide.value = 'Example'
  } else {
    isViewArticle.value = true
    isViewEditor.value = false
    sideBySide.value = 'Write here'
  }
}

const toggleViews = () => {
  isViewArticle.value = true
  // if (isSideBySide.value) {
  //   isSideBySide.value = false
  //   isViewArticle.value = false
  //   isViewEditor.value = true
  // }
  // isViewArticle.value = !isViewArticle.value 
  // isViewEditor.value = !isViewEditor.value
  // enabledView.value = isViewArticle.value ? 'Editor' : 'Example'
  // sideBySide.value = 'Write here'
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

const toggleModelAnswer = () => {
  if (isViewReview.value) {
    isViewArticle.value = false
    isViewEditor.value = false
  } else {
    isViewArticle.value = true
    isViewEditor.value = false
  }
}

const toggleWritingView = () => {
  if (!isViewEditor.value) {
    isViewEditor.value = true
    isViewArticle.value = false
  } 
}

const isSidebarOpen = ref(false)
const isHelpViewed = ref(false)

const isHeaderOpen = ref(false)
const headerButton = ref('Hide task details')

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  isHelpViewed.value = true
}

const toggleHeader = () => {
  isHeaderOpen.value = !isHeaderOpen.value
  headerButton.value = isHeaderOpen.value ? 'Show task details' : 'Hide task details'
}

const toggleReview = () => {
  isViewReview.value = !isViewReview.value
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