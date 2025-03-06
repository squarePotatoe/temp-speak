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

        <div class="grid grid-cols-3">
            <!-- First column -->
            <div class="flex flex-col">
                <div class="flex flex-col">  
                    <h2 class="text-2xl font-semibold text-white p-2 bg-sky-600 w-fit rounded-t-lg">Vocabulary</h2>
                    <div class="flex flex-wrap p-4 gap-2 h-fit bg-sky-300 rounded-b-xl rounded-tr-xl border-2 border-sky-600">
                        <VocabularyItem v-for="item in currentVocab.vocab" :key="item.id" :word="item.word" :definition="item.definition" :example="item.example" :image="item.img"/>
                    </div>
                </div>               
                <div class="flex p-4">
                    <img :src="currentTask.image" alt="Article image" class="w-full h-full object-cover rounded-2xl">
                </div>
                <div class="flex flex-col p-4 bg-white border-2 border-sky-400 rounded-xl mx-2">
                    <div class="flex flex-col gap-2">
                        <button @click="toggleTutorial" class="flex items-center gap-2 p-2 bg-sky-600 text-white font-semibold rounded-lg">
                            <span class="material-icons-outlined">play_circle</span>
                            <span>Watch teachers tutorial</span>
                        </button>
                    </div>  
                </div>
            </div>

            <!-- Tutorial modal -->
            <div class="bg-cyan-200 w-1/2 lg:w-1/3 fixed flex flex-col justify-end items-end left-0 bottom-0 top-20 h-fit rounded-tr-xl rounded-br-xl transition-transform transform duration-300 gap-2" :class="{ '-translate-x-full': !isTutorialVisible, '-translate-x-0': isTutorialVisible }">
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

            <!-- Reading submition modal -->
            <div class="bg-purple-700 w-1/2 md:w-fit fixed flex flex-col justify-end items-end left-0 bottom-0 h-fit rounded-tr-xl rounded-br-xl transition-transform transform duration-300 gap-2 border-t-2 border-r-2 border-yellow-600" :class="{ 'translate-y-full': !isReadingVisible, 'translate-y-0': isReadingVisible }">
                <div class="flex text-white">
                    <button class="flex justify-end items-center gap-2 p-2 bg-yellow-600 text-white font-semibold rounded-tr-lg rounded-bl-lg" @click="toggleReading">
                        <h2>My recording</h2>
                        <span class="material-icons-outlined">close</span>
                    </button>
                </div>
                <div class="flex">

                <div class="flex flex-col p-4 bg-white w-full border-2 border-yellow-300 rounded-xl gap-4">
                    <div class="flex flex-col">
                    <h2>Record Paragraph one</h2>
                    <div class="flex gap-2">
                        <div>
                        <button @click="recordAudio" class="flex items-center gap-2 p-2 bg-blue-600 text-white font-semibold rounded-lg">
                            <span class="material-icons-outlined">mic</span>
                            <span>Record Audio</span>
                        </button>
                    </div>
                    <div>
                        <button @click="recordVideo" class="flex items-center gap-2 p-2 bg-green-600 text-white font-semibold rounded-lg">
                            <span class="material-icons-outlined">videocam</span>
                            <span>Record Video</span>
                        </button>
                    </div>
                    </div>
                    </div>
                    <hr>
                    <div class="flex flex-col">
                    <h2>Record Paragraph two</h2>
                    <div class="flex gap-2">
                        <div>
                        <button @click="recordAudio" class="flex items-center gap-2 p-2 bg-blue-600 text-white font-semibold rounded-lg">
                            <span class="material-icons-outlined">mic</span>
                            <span>Record Audio</span>
                        </button>
                    </div>
                    <div>
                        <button @click="recordVideo" class="flex items-center gap-2 p-2 bg-green-600 text-white font-semibold rounded-lg">
                            <span class="material-icons-outlined">videocam</span>
                            <span>Record Video</span>
                        </button>
                    </div>
                    </div>
                    </div>
                    <hr>

                    <div class="flex flex-col">
                    <h2>Record Paragraph three</h2>
                    <div class="flex gap-2">
                        <div>
                        <button @click="recordAudio" class="flex items-center gap-2 p-2 bg-blue-600 text-white font-semibold rounded-lg">
                            <span class="material-icons-outlined">mic</span>
                            <span>Record Audio</span>
                        </button>
                    </div>
                    <div>
                        <button @click="recordVideo" class="flex items-center gap-2 p-2 bg-green-600 text-white font-semibold rounded-lg">
                            <span class="material-icons-outlined">videocam</span>
                            <span>Record Video</span>
                        </button>
                    </div>
                    </div>
                    </div>
                    <hr>

                    <div class="flex flex-col">
                    <h2>Record Paragraph four</h2>
                    <div class="flex gap-2">
                        <div>
                        <button @click="recordAudio" class="flex items-center gap-2 p-2 bg-blue-600 text-white font-semibold rounded-lg">
                            <span class="material-icons-outlined">mic</span>
                            <span>Record Audio</span>
                        </button>
                    </div>
                    <div>
                        <button @click="recordVideo" class="flex items-center gap-2 p-2 bg-green-600 text-white font-semibold rounded-lg">
                            <span class="material-icons-outlined">videocam</span>
                            <span>Record Video</span>
                        </button>
                    </div>
                    </div>
                    </div>

                </div>

                
            </div>

            </div>

            <div class="bg-cyan-200 w-1/2 lg:w-1/3 fixed flex flex-col justify-end items-end left-0 bottom-0 h-fit rounded-t-xl transition-transform transform duration-300 gap-2 z-10" :class="{ 'translate-y-full': !isRecorderVisible, 'translate-x-0': isRecorderVisible }">
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
                                <span>Record Audio</span>
                            </button>
                            <button @click="recordVideo" class="flex items-center gap-2 p-2 bg-green-600 text-white font-semibold rounded-lg">
                                <span class="material-icons-outlined">videocam</span>
                                <span>Record Video</span>
                            </button>
                        </div>
                        <img src="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" alt="Recording avatar" class="w-72 h-72 " >
                    </div>
                </div>
            </div>

            <!-- Second column -->

            <div class="flex flex-col col-span-2 gap-2">
                <div class="flex flex-col">
                <h2 class="text-2xl font-semibold text-white p-2 bg-sky-600 w-fit rounded-t-lg mx-2">
                    {{ currentTask.content[0].header }}
                </h2>
                <div class="relative flex flex-col p-4 bg-white border-2 border-sky-400 rounded-b-xl rounded-tr-xl mx-2">
                    {{ currentTask.content[0].content }}
                    <button @click="toggleRecorder" class="absolute flex -bottom-5 -right-5 p-1 items-center bg-green-600 rounded-full text-white">
                        <span class="material-icons-outlined">play_circle</span>
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
                    <button @click="toggleRecorder" class="absolute flex -bottom-5 -right-5 p-1 items-center bg-green-600 rounded-full text-white">
                        <span class="material-icons-outlined">play_circle</span>
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
                                <button @click="toggleRecorder" class="absolute flex -bottom-5 -right-5 p-1 items-center bg-green-600 rounded-full text-white">
                        <span class="material-icons-outlined">play_circle</span>
                    </button>
                        </div>
                        <div class="relative flex flex-col p-4 bg-white border-2 border-cyan-400 rounded-xl mx-2">
                                {{ currentTask.content[4].content }}
                                <button @click="toggleRecorder" class="absolute flex -bottom-5 -right-5 p-1 items-center bg-green-600 rounded-full text-white">
                        <span class="material-icons-outlined">play_circle</span>
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

</script>