<template>
  
    <aside :class="sidebarClasses" class="sidebar absolute lg:static w-[240px] h-[calc(100vh-4rem)] lg:h-auto transform -translate-x-full lg:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto p-4">

            <div class="bg-white rounded-xl shadow-lg mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div  class="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
                <RouterLink to="/" class="text-gray-600 hover:text-indigo-800 flex w-full">
                    <span class="material-icons-outlined mr-2">dashboard</span>
                    Home 
                    <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
                </RouterLink>
            </div>
            <div class="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
                <RouterLink to="/writing" class="text-gray-600 hover:text-indigo-800 flex w-full">
                    <span class="material-icons-outlined mr-2">tune</span>
                    My class
                    <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
                </RouterLink>
            </div>
            <div class="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
                <RouterLink to="/writing" class="text-gray-600 hover:text-indigo-800 flex w-full">
                    <span class="material-icons-outlined mr-2">file_copy</span>
                    Study history
                    <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
                </RouterLink>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div class="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
                <span class="material-icons-outlined mr-2">face</span>
                Profile
                <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
            </div>
            <div class="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
                <span class="material-icons-outlined mr-2">settings</span>
                Settings
                <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
            </div>
            <div class="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
                <span class="material-icons-outlined mr-2">power_settings_new</span>
                Log out
                <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
            </div>
        </div>


    </aside>

</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { links } from '@/data.js'

const props = defineProps({
    open: Boolean
})

const isOpen = ref(false)

watch(() => props.open, (value) => {
    isOpen.value = value
})

const sidebarClasses = computed(() => {
    return {
        'tranlate-x-full': !isOpen.value,
        'translate-x-0': isOpen.value
    }
})

</script>