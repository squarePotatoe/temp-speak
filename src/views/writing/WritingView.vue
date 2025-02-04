<template>
  <div class="container flex flex-col mx-auto p-4">
    <div class="grid md:grid-cols-2 gap-4">
      <Task />
      <Notes />
    </div>
    

    <hr class="my-3">
    <nav class="flex justify-between">
      <div class="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
        <div @click="toggleViews" class="items-center flex underline text-2xl">
            {{ isArticleView ? 'View article' : 'Compose' }}
        </div>  
      </div>
      <div  class="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
        <div v-if="!sideBySide" @click="toggleBoth" class=" flex items-center">
          <span class="material-icons-outlined mr-2">view_agenda</span>
          Side by side
        </div>  
        <div v-else class=" flex items-center">
          <span class="material-icons-outlined mr-2" @click="">view_agenda</span>
          Toggle views
        </div>
      </div>
      <div class="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
          <span class="material-icons-outlined mr-2">file_copy</span>
            -----
          <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
      </div>
    </nav>

    <form @submit.prevent="submitForm" :class="{ 'md:grid-cols-2 gap-2' : sideBySide }" class="grid">
      <TextEditor v-model="form.content" :class="{ hidden : !isArticleView } "/>
      <Article :content="form.content" :class="{ hidden : !isEditorView }" />
    </form>
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
  content: "<h1>How about an exciting title?</h1><p>Let's start with an a 'Hook' to catch the readers attention</p>"
})

const submitForm = () => {
  form.value.content = editor.value.getHTML()
  console.log('Form submitted with content:', form.value)
  // Perform any necessary actions with the content, such as sending it to a server
}

const isArticleView = ref(true)
const isEditorView = ref(false)
const sideBySide = ref(false)

const toggleBoth = () => {
  sideBySide.value = !sideBySide.value
  isArticleView.value = true
  isEditorView.value = true
}

const toggleViews = () => {
  if (sideBySide.value) {
    isArticleView.value = false
    isEditorView.value = true
  }
  isArticleView.value = !isArticleView.value
  isEditorView.value = !isEditorView.value
}
</script>

<style>

</style>