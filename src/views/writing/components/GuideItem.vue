<template>
    <div>
        <div class="flex p-2 rounded mb-2" :class="{ 'bg-green-100': isDone, 'bg-white': !isDone }">
            <div class="flex flex-col gap-1 items-start">
                <div class="flex items-center">
                    <h3 :class="{ 'line-through': isDone }">{{ props.header }}</h3>
                    <span v-if="isDone" class="material-icons text-green-500 ml-2">check_circle</span>
                </div>
                <p class="text-sm" :class="{ 'line-through': isDone }">
                    <strong>What is it: </strong>
                    {{ props.content }}
                </p>
                <!-- <p :class="{ 'line-through': isDone }" class="text-sm">
                    <strong>Example:</strong>
                    {{ props.example }}
                </p> -->
                <label class="flex items-center border-1 border-sky-700 rounded p-1 bg-indigo-600">
                    <input type="checkbox" v-model="isDone" />
                    <span class="mx-2 text-white font-medium">done</span>
                </label>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
    header: {
        type: String,
        modelValue: String,
    },
    content: {
        type: String,
        modelValue: String,
    },
    example: {
        type: String,
        modelValue: String,
    },
})

const isDone = ref(false)

</script>