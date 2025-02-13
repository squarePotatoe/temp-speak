<template>
  <div>
    <div
      class="font-bold bg-indigo-50 pl-4 striped-bg rounded-l-sm rounded-r-3xl text-4xl mb-4"
    >
      Article
    </div>

    <div class="grid grid-cols-3">
      <!-- Tutorial video, mindmap, etc. goes here -->

      <div class="p-3 rounded-md">
        <h2 class="text-2xl font-medium mb-2">Resources</h2>
        <div class="flex flex-col gap-4">
          <button
            class="bg-purple-500 hover:bg-purple-400 text-white font-medium p-2 rounded-xl"
          >
            Watch the tutorial
          </button>
          <button
            class="bg-indigo-500 hover:bg-indigo-400 text-white font-medium p-2 rounded-xl"
          >
            Mindmap
          </button>
        </div>
      </div>

      <div class="p-3 rounded-md"></div>

      <div class="p-3 rounded-md">
        <h2 class="text-2xl font-medium mb-2">Online class</h2>
        <div class="flex flex-col gap-4">
          <button
            class="bg-indigo-500 hover:bg-indigo-400 text-white font-medium p-2 rounded-xl disabled"
          >
            Zoom Link
          </button>
        </div>
      </div>
    </div>

    <div class="bg-indigo-50 p-4 rounded flex text-center justify-evenly gap-4">
      <div class="group flex flex-col relative items-center">
        <div class="flex">
          <h3 class="">Purpose of writing</h3>
          <span class="material-icons-outlined">info</span>
        </div>
        <p>To inform and entertain.</p>
        <p
          class="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-white rounded-md absolute translate-y-10 opacity-0 p-2 mt-2 w-64 max-w-full z-10 pointer-events-none"
        >
          This article is meant to inform and entertain teenagers about the
          host's journey in creating a YouTube channel. The article should be
          engaging and informative.
        </p>
      </div>

      <div class="">
        <h3>Style</h3>
        <p>Informal</p>
      </div>
      <div class="">
        <h3>Target audience</h3>
        <p>Teenagers.</p>
      </div>
    </div>

    <div class="md:col-span-1">
      <div class="flex-col stems-center"></div>
    </div>

    <!-- Tasks -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { demoTask } from '@/data'

const isContentVisible = ref(true)

const toggleContent = () => {
  isContentVisible.value = !isContentVisible.value
}
</script>

<style scoped></style>
