<template>
    <div>
        <div class="text-lg text-slate-800 w-full">
            <!-- Header section -->
        <div class="flex md:flex-col max-w-4xl p-2 rounded-lg ">
            <div class="text-6xl font-sans text-slate-700 w-full text-center my-4 p-2 rounded-xl">
                {{ currentTask.title }}
            </div>
            <!-- <div class="text-xl text-slate-600 p-4 ">
                {{ currentTask.description }}
            </div> -->
        </div>
            
        <!-- Main text section -->

        <div class="grid lg:grid-cols-3">
            <!-- First column -->
            <div class="flex flex-col pb-2">
                <div class="flex flex-col gap-2 p-4 bg-white border-2 border-sky-400 rounded-xl mx-2">
                    <button @click="toggleTutorial" class="flex items-center gap-2 p-2 bg-sky-600 text-white font-semibold rounded-lg">
                        <span class="material-icons-outlined">play_circle</span>
                        <span>Watch teachers tutorial</span>
                    </button>
                    <div class="flex gap-2 animate-pulse">
                        <button class="flex items-center gap-2 p-2 w-full  bg-purple-600 text-white font-semibold rounded-lg" @click="toggleSidebar">
                            <span class="material-icons-outlined">play_circle</span>
                            Teacher Chat
                        </button>
                    </div>
                </div> 
                <div class="flex flex-col p-2">  
                    <h2 class="text-2xl font-semibold text-white p-2 bg-sky-600 w-fit rounded-t-lg">Vocabulary</h2>
                    <div class="flex flex-col p-4 gap-2 h-fit bg-sky-300 rounded-b-xl rounded-tr-xl border-2 border-sky-600">
                        <VocabularyItem v-for="item in currentVocab.vocab" :key="item.id" :word="item.word" :definition="item.definition" :example="item.example" :image="item.img"/>
                    </div>
                </div>
                <div class="px-2">
                    <img :src="currentTask.image" alt="Article image" class="w-full h-full object-cover rounded-2xl">
                </div>
            </div>

            <!-- Tutorial modal -->
            <div class="bg-cyan-200  lg:w-1/3 fixed z-90 flex flex-col justify-end items-end left-0 bottom-0 top-20 h-fit rounded-tr-xl rounded-br-xl transition-transform transform duration-300 gap-2" :class="{ '-translate-x-full': !isTutorialVisible, '-translate-x-0': isTutorialVisible }">
                <div class="flex text-white">
                    <button class="flex justify-end items-center gap-2 p-2 bg-sky-600 text-white font-semibold rounded-tr-lg rounded-bl-lg" @click="toggleTutorial">
                        <h2>Teacher's Tutorial</h2>
                        <span class="material-icons-outlined">close</span>
                    </button>
                </div>
                <div class="flex flex-col p-4 bg-white w-full border-2 border-cyan-300 rounded-xl ">
                    <div class="flex flex-col gap-2">
                        <video controls>
                            <source src="https://edu.speak3.com/storage/material_tutorial_video/DQp3rnrqgqZ0LgKAAvtDIzZ0OXUNzbgjZRpf1m3Q.mp4" type="video/mp4">
                        </video>
                    </div>
                </div>
            </div>

            <!-- Recorder modal -->
            <div class="bg-cyan-200 w-full lg:w-1/3 fixed flex flex-col justify-end items-end left-0 bottom-0 h-fit rounded-t-xl transition-transform transform duration-300 gap-2 z-10" :class="{ 'translate-y-full ': !isRecorderVisible, 'translate-x-0': isRecorderVisible }">
                <div class="flex text-white">
                    <button class="flex justify-end items-center gap-2 p-2 bg-sky-600 text-white font-semibold rounded-tr-lg rounded-bl-lg" @click="toggleRecorder">
                        <h2>Recorder</h2>
                        <span class="material-icons-outlined">close</span>
                    </button>
                </div>
                <div class="flex flex-col p-4 bg-white w-full border-2 border-cyan-300 rounded-xl ">
                    <div class="flex gap-2">

                        <div class="flex flex-col gap-2">
                            <button @click="recordAudio" class="flex items-center gap-2 p-2 bg-blue-600 text-white font-semibold rounded-lg">
                                <span class="material-icons-outlined">mic</span>
                                <span class="text-sm">Record Audio</span>
                            </button>
                            <button @click="recordVideo" class="flex items-center gap-2 p-2 bg-green-600 text-white font-semibold rounded-lg">
                                <span class="material-icons-outlined">videocam</span>
                                <span class="text-sm">Record Video</span>
                            </button>
                        </div>
                        <img src="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" alt="Recording avatar" class="w-36 h-36 " >
                    </div>
                </div>
            </div>

            <div class="bg-cyan-700 z-10  fixed right-0 bottom-0 p-2 top-4 h-fit rounded-tl-xl rounded-bl-xl transition-transform transform duration-300" :class="{ 'translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen }">
                <div class="flex items-center text-white">
                    <button @click="toggleSidebar" class="flex items-center justify-center my-2">
                    <span class="material-icons-outlined">close</span>
                    <h2>Chat</h2>
                    </button>
                </div>
                <ChatBox />
            </div>

            <!-- Second column -->

            <div class="flex flex-col col-span-2 gap-2">
                <div class="flex flex-col">
                <h2 class="text-2xl font-semibold text-white p-2 bg-sky-600 w-fit rounded-t-lg mx-2">
                    {{ currentTask.content[0].header }}
                </h2>
                <div class="relative flex flex-col p-4 bg-white border-2 border-sky-400 rounded-b-xl rounded-tr-xl mx-2">
                    {{ currentTask.content[0].content }}
                    <button @click="toggleRecorder" class="absolute flex bottom-0 right-0 p-1 pl-2 items-center bg-green-600 rounded-tl-xl rounded-br-xl text-white">
                        Record <span class="material-icons-outlined">mic</span>
                    </button>
                </div> 
                
                </div>

                <div class="grid grid-cols-2">
                <div class="flex flex-col">
                <h2 class="text-2xl font-semibold text-white p-2 bg-sky-600 w-fit rounded-t-lg mx-2">
                    {{ currentTask.content[1].header }}
                </h2>
                <div class="relative flex flex-col p-4 bg-white border-2 border-sky-400 rounded-b-xl rounded-tr-xl mx-2">
                    {{ currentTask.content[2].content }}
                    <button @click="toggleRecorder" class="absolute flex bottom-0 right-0 p-1 pl-2 items-center bg-green-600 rounded-tl-xl rounded-br-xl text-white">
                        Record <span class="material-icons-outlined">mic</span>
                    </button>
                </div>  
                </div>
                    <div class="flex px-2">
                        <div class="flex flex-col py-2 animate-slide-up">
                            <div class=" text-xl font-bold text-white p-2 bg-emerald-800 w-fit rounded-t-lg">
                                <h2 >An idiom to remember</h2>
                            </div>
                            <div class="col-span-1 flex flex-col text-left h-full justify-center rounded-b-xl rounded-tr-xl p-4 bg-emerald-700 text-white">
                                <div class="border-2 rounded-xl border-white p-2">
                                    <div class="text-lg font-semibold">"{{currentTask.idiom.expression}}"</div>
                                    <div class="text-sm">{{ currentTask.idiom.meaning }}</div>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
                <div class="flex flex-col mx-2">
                </div>
                    <div class="flex">
                        <div class="relative flex flex-col p-4 bg-white border-2 border-cyan-400 rounded-xl mx-2">
                                {{ currentTask.content[3].content }}
                                <button @click="toggleRecorder" class="absolute flex bottom-0 right-0 p-1 pl-2 items-center bg-green-600 rounded-tl-xl rounded-br-xl text-white">
                        Record <span class="material-icons-outlined">mic</span>
                    </button>
                        </div>
                        <div class="relative flex flex-col p-4 bg-white border-2 border-cyan-400 rounded-xl mx-2">
                                {{ currentTask.content[4].content }}
                                <button @click="toggleRecorder" class="absolute flex bottom-0 right-0 p-1 pl-2 items-center bg-green-600 rounded-tl-xl rounded-br-xl text-white">
                        Record <span class="material-icons-outlined">mic</span>
                    </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import ChatBox from './ChatBox.vue'
import { readingDemo, readingVocab } from '@/data'
import VocabularyItem from './VocabularyItem.vue'

const currentTask = readingDemo.find(item => item.id === 1)
const hasManyContent = currentTask.content.length > 2

const currentVocab = readingVocab.find(item => item.id === currentTask.id)

const isTutorialVisible = ref(false)

function toggleTutorial() {
    isTutorialVisible.value = !isTutorialVisible.value
}

const isReadingVisible = ref(false)

function toggleReading() {
    isReadingVisible.value = !isReadingVisible.value
}

const isRecorderVisible = ref(false)

function toggleRecorder() {
    isRecorderVisible.value = !isRecorderVisible.value
}


const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>