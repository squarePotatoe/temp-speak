<template>
    <div >
        <div class="flex w-full relative">
            <div class="flex bg-amber-200 p-2 rounded mb-2 max-w-2/3" :class="sender === 'student' ? 'ml-auto bg-indigo-200' : 'mr-auto'">
            <p class="text-slate-700 whitespace-pre-wrap">
                {{ props.message }}
            </p>
            </div>

        </div>
        <div v-if="props.img != null" class="flex">
            <img :src="props.img" alt="" class="h-36 rounded">
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    message: String,
    sender: String,
    img: String
})
</script>