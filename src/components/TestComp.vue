<template>
    <h1>This is a test {{ props.text }}</h1>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    text: String
})

</script>