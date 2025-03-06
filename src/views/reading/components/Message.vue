<template>
    <div >
        <div class="flex w-full relative">
            <div class="flex bg-amber-100 border-1 border-rose-100 p-2 rounded mb-2 max-w-2/3" :class="sender === 'student' ? 'ml-auto bg-indigo-200' : 'mr-auto'">
            <p class="text-slate-700 whitespace-pre-wrap">
                {{ props.message }}
            </p>
            </div>

        </div>
        <div v-if="props.img != null" class="flex">
            <img :src="props.img" alt="" class="h-36 rounded">
        </div>
        <div v-if="props.audio != null" class="flex w-full rounded mb-2 max-w-2/3 " :class="sender === 'student' ? 'ml-auto justify-end ' : 'mr-auto'">
            <audio :src="props.audio" controls></audio>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    message: String,
    sender: String,
    img: String,
    audio: String
})
</script>