<script setup lang="ts">
import TestComp from '@/components/TestComp.vue';
import { onMounted, ref } from 'vue';
import { store } from '@/store';
import CatFact from '@/components/CatFact.vue';

const showCatFact = ref(false);

const toggleCatFact = () => {
  showCatFact.value = !showCatFact.value;
}

</script>

<template>
  <div class="flex container bg-amber-600 mx-auto justify-center mt-4">
    <div class="grid md:grid-cols-2 m-4 w-full gap-1">
      <div class=" bg-amber-300 p-4 rounded-tl-xl">
        <h1 class=" text-4xl font-semibold ">Cat fact thing here</h1>
        <button @click="toggleCatFact" class="p-2 my-2 bg-blue-600 hover:bg-blue-500 text-white rounded">Show Cat Fact</button>
        <CatFact v-if="showCatFact"/>
      </div>
      <div class=" bg-amber-200 p-4 rounded-tr-xl">
      </div>

    </div>
  </div>
</template>
