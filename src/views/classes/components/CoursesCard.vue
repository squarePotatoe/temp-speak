<template>
    <div>
        <div class="flex flex-col justify-center items-center bg-gray-100">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full">
                <img :src="img" alt="Mountain" class="w-full h-42 object-cover">
                <div class="p-2">
                    <h2 class="text-2xl font-bold text-gray-800 mb-2"></h2>
                    <p class="text-gray-700 leading-tight mb-4">
                        {{ description }}
                    </p>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center">
                            <span class="tag">{{ courseType }}</span>
                        </div>
                        <!-- <span class="text-gray-600">2 hours ago</span> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { courses } from '@/data';

const props = defineProps({
    title: String,
    courseType: String,
    img: String,
    description: String,
});

console.log(props);
</script>