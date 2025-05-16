<script setup></script>

<template>
  <div class="flex flex-col p-2">
    <h2
      class="flex items-center gap-2 text-3xl font-extrabold text-white p-3 bg-gradient-to-r from-sky-500 to-blue-400 w-fit rounded-t-2xl shadow-lg"
    >
      <span class="material-icons text-yellow-300 text-4xl">auto_awesome</span>
      Vocabulary
    </h2>
    <div
      class="flex flex-col p-2 gap-1 h-fit bg-gradient-to-br from-blue-100 rounded-b-2xl rounded-tr-2xl border-4 border-sky-400 shadow-xl"
    >
      <slot></slot>
    </div>
  </div>
</template>
