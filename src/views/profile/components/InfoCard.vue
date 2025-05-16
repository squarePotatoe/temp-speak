<script setup></script>

<template>
  <div class="flex flex-col">
    <div class="text-sm font-semibold text-gray-500">
      <slot name="header"></slot>
    </div>
    <div class="items-center flex">
      <p class="text-sm text-gray-700">
        <slot name="content"></slot>
      </p>
    </div>
  </div>
</template>
