<template>
  <div>
  <div class="w-full bg-slate-100 shadow-md rounded-lg max-w-4xl px-2 mt-4 min-h-[calc(100vh-74px)]">
    <div class="flex flex-col">
      <h1 class="font-semibold text-gray-800 my-4">Next class</h1>

      <div class="p-2">
        <ClassCard
          title="The Evolution of Skysurfing"
          img="src/assets/skysurfing.png"
          description="In this lesson, we will explore the evolution of skysurfing from its inception to the present day."
          teacher="John Doe"
          date="15 October 2025, Wednesday"
          time="Start 18:00 End 19:00"
          type="writing"
        />
      </div>
    </div>


    <h1 class="font-semibold text-gray-800 my-4">My courses</h1>
    <div class="grid md:grid-cols-3 gap-4 p-4">
      <div v-for=" entries in courses" :key="entries.id">
        <CoursesCard 
          :title="entries.title"
          :img="entries.img"
          :courseType="entries.courseType"
          :description="entries.description"
        />
      </div>
      <div class="flex flex-col justify-center items-center bg-gray-100 shadow">
          <div class="bg-gray-200 rounded-lg shadow-lg overflow-hidden items-center flex flex-col justify-center max-w-lg w-full h-full">
            <div>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>

            </div>
            <p class="text-slate-500">browse courses</p>
          </div>
      </div>
    </div>

    <div class="flex justify-center items-center">
      <button>discover more <span>>>></span></button>
    </div>

</div>
</div>
</template>

<script setup>
import ClassCard from './components/ClassCard.vue'
import CoursesCard from './components/CoursesCard.vue'
import { articlePlaceholders, courses } from '@/data'
</script>

<style>

</style>
