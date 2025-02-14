<template>
    <div>
        <div class="flex flex-col max-h-[calc(100vh-6rem)]">
            <div class="flex flex-col overflow-y-auto shadow-md">
                <div v-for="item in checklistItems" :key="item.id">
                        <GuideItem :header="item.header" :content="item.content" :example="item.example" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { checklistItems } from '@/data';
import GuideItem from './GuideItem.vue';
</script>