<template>
    <div >
        <div class="mb-4">
            <h2>{{ props.title }}</h2>
            <p>{{ props.content }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    modelValue: String
  },
    content: {
        type: String,
        modelValue: String
    }
})

</script>