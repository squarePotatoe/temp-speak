<template>
    <div>

        <div class="flex flex-col gap-4 p-4">
            <h1 >Next Class</h1>
            <ClassCard />

            <h1 >Upcoming Classes</h1>
            <ClassCard />
            <ClassCard />
            <ClassCard />

            <h1>Previous classes</h1>

            <ClassCard />
            <ClassCard />
        </div>

    </div>
    
</template>

<script setup>
import ClassCard from './components/ClassCard.vue';

</script>

<style>
.disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>