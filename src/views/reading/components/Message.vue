<template>
    <div >
        <div class="flex w-full relative">
            <div class="flex bg-amber-50 p-2 rounded mb-2 max-w-2/3" :class="sender === 'student' ? 'ml-auto bg-indigo-50' : 'mr-auto'">
            <p class="text-slate-700">
                {{ props.message }}
            </p>
        </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    message: String,
    sender: String
})
</script>