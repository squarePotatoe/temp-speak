<template>
    <div>

    <main class="flex-1 p-4">
        <div class="flex flex-col lg:flex-row gap-4 mb-6">
            <div class="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-6 animate-fade-in">
                <h2 class="text-4xl md:text-5xl text-blue-900">
                    Welcome <br><strong>John</strong>
                </h2>
                <span class="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-indigo-800">
                    {{ formattedTime }}
                </span>
            </div>

            <div class="flex-1 bg-blue-100 border border-blue-200 rounded-xl p-6 animate-fade-in">
                <h2 class="text-4xl md:text-5xl text-blue-900">
                    Inbox <br><strong>23</strong>
                </h2>
                <a href="#" class="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-blue-800 hover:bg-blue-900 transition-transform duration-300 hover:scale-105">
                    See messages
                </a>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up" style="animation-delay: 0.1s">
                <h3 class="text-xl font-bold text-indigo-800">Homework</h3>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up" style="animation-delay: 0.2s">
                <h3 class="text-xl font-bold text-indigo-800">Next lesson</h3>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up" style="animation-delay: 0.3s">
                <h3 class="text-xl font-bold text-indigo-800">Lesson Feedback</h3>
            </div>
        </div>
        <div class="flex flex-col mt-6 lg:flex-row gap-4 mb-6">
            <div class="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-6 animate-fade-in">
                <h2 class="text-4xl md:text-5xl text-blue-900">
                    Weekly summary
                </h2>
                <span class="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-indigo-800">
                    Read more
                </span>
            </div>

            <div class="flex-1 bg-blue-100 border border-blue-200 rounded-xl p-6 animate-fade-in">
                <!-- <h2 class="text-4xl md:text-5xl text-blue-900">
                    Inbox <br><strong>23</strong>
                </h2>
                <a href="#" class="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-blue-800 hover:bg-blue-900 transition-transform duration-300 hover:scale-105">
                    See messages
                </a> -->
            </div>
        </div>
    </main>
    <Features />

    </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue'
import Sidebar from '@/components/Sidebar.vue';
import TestComp from '@/components/TestComp.vue';
import { store } from '@/store';
import Features from '@/components/Features.vue';

const currentTime = ref(new Date())

const formattedTime = computed(() => {
  return new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(currentTime.value)
})

const updateTime = () => {
  currentTime.value = new Date()
}

</script>