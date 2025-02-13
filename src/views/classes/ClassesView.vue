<template>
  <div>
    <h1 class="text-3xl font-semibold text-gray-800">Next class</h1>

    <div class="flex flex-col gap-4 p-4">
      <ClassCard
        title="The Evolution of Skysurfing"
        img="src/assets/skysurfing.png"
        description="In this lesson, we will explore the evolution of skysurfing from its inception to the present day."
        teacher="John Doe"
        date="15 October 2025, Wednesday"
        time="Start 18:00 End 19:00"
      />
    </div>

    <h1 class="text-3xl font-semibold text-gray-800">Upcoming classes</h1>
    <div class="flex flex-col gap-4 p-4">
      <div v-for=" entries in articlePlaceholders" :key="entries.id">
        <ClassCard
          :title="entries.title"
          :img="entries.img"
          :description="entries.description"
          :teacher="entries.teacher"
          :date="entries.date"
          :time="entries.time"
        />
        
      </div>

    </div>
  </div>
</template>

<script setup>
import ClassCard from './components/ClassCard.vue'
import { articlePlaceholders } from '@/data'
</script>

<style>
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
