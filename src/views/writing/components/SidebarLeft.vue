<template>
  <div>
    <div class="flex flex-col gap-4">
      <h2 class="mb-2">Useful Expressions</h2>
      <p class="text-sm">Use these expressions to start your {{ textType }}.</p>
      <div>
        <ul
          v-for="(expression, index) in usefulExpressions"
          :key="index"
          class="bg-white rounded p-1"
        >
          <li class="text-sm">
            <p>{{ expression }}</p>
          </li>
        </ul>
      </div>
      <p class="text-sm">Don't forget the connectors!</p>
      <div>
        <ul v-for="expression in connectives" class="bg-white rounded p-1">
          <li class="text-sm">
            <p>{{ expression.content }}</p>
          </li>
        </ul>
      </div>
      <p>Use <strong>connectives</strong> and <strong>conjunctions</strong></p>

      <!-- Additive connectives -->
      <div class="group flex flex-col relative hover:cursor-pointer">
        <div class="flex justify-between">
          <p class="text-sm">Aditive connectives</p>
          <span class="material-icons-outlined">info</span>
        </div>
        <div
          class="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-white rounded-md absolute translate-y-10 opacity-0 p-2 mt-2 w-64 max-w-full z-10 pointer-events-none"
        >
          <ul v-for="connective in additiveConnectives" class="rounded p-1">
            <li class="text-sm">
              <p>{{ connective.content }}</p>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <!-- Additive connectives -->
      <div class="group flex flex-col relative hover:cursor-pointer">
        <div class="flex justify-between">
          <p class="text-sm">Contrast connectives</p>
          <span class="material-icons-outlined">info</span>
        </div>
        <div
          class="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-white rounded-md absolute translate-y-10 opacity-0 p-2 mt-2 w-64 max-w-full z-10 pointer-events-none"
        >
          <ul v-for="connective in contrastiveConnectives" class="rounded p-1">
            <li class="text-sm">
              <p>{{ connective.content }}</p>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <!-- Additive connectives -->
      <div class="group flex flex-col relative hover:cursor-pointer">
        <div class="flex justify-between">
          <p class="text-sm">Casual connectives</p>
          <span class="material-icons-outlined">info</span>
        </div>
        <div class="group-hover:opacity-100 transition-opacity bg-gray-800 px-1
        text-sm text-white rounded-md absolute translate-y-10 opacity-0 p-2 mt-2
        w-64 max-w-full z-10 pointer-events-none" >
        <ul v-for="connective in causalConnectives" class="rounded p-1">
          <li class="text-sm">
            <p>{{ connective.content }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </div>
  
</template>

<script setup>
import {
  introductionSentences,
  connectives,
  additiveConnectives,
  contrastiveConnectives,
  causalConnectives,
  textFormatDemo,
  // usefulExpressions
} from '@/data'

const currentTask = textFormatDemo.find(item => item.id === 1)
const { textType, usefulExpressions } = currentTask
</script>
