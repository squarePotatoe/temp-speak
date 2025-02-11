<template>
    <div >

        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div class="md:flex">
                <div class="md:shrink-0">
                    <img class="h-48 w-full object-cover md:h-full md:w-48" src="/src/assets/skysurfing.png">
                </div>
                <div class="p-8">
                    <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        Article Writing
                    </div>
                    <RouterLink to="/writing" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                        History of skysurfing
                    </RouterLink>
                    <p class="mt-2 text-slate-500">
                        In this lesson we'll be writing an article about the history of skysurfing.
                    </p>
                    <p class="mt-4">
                        Teacher: <span class="text-indigo-500">John Doe</span>
                    </p>
                    <p>
                        Date: <span class="text-indigo-500">10 September 2025, Friday</span>
                    </p>
                    <p>
                        Time: <span class="text-indigo-500">Start 20:00 End 21:00</span>
                    </p>
                    <!-- <button class="bg-indigo-200 p-2 rounded text-white mt-4">
                        <p class="text-sm text-gray-800">Zoom link</p>
                    </button> -->
                </div>
                <div class="flex items-end p-4">
                    <RouterLink to="/writing"  class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
                        View
                    </RouterLink>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

</script>