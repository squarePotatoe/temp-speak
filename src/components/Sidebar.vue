<template>
    <div class="flex flex-col">

    <div class="bg-white rounded-br-xl rounded-bl-xl px-4 animate-slide-up" @click="closeSidebar">
        <span class="material-icons-outlined text-2xl text-gray-600">menu</span>
    </div>
    <aside :class="{ hidden : isOpen }" class="sidebar fixed lg:static w-[340px] bg-indigo-50 h-[calc(100vh-4rem)] lg:h-auto transform -translate-x-full lg:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto p-4">
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

</div>

</template>

<script setup>
import { computed, ref } from 'vue'
import { links } from '@/data.js'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)

const closeSidebar = () => {
    isOpen.value = !isOpen.value 
}

</script>