<template>
    <div>
        <div class="text-lg text-slate-800 w-full">
            <!-- Header section -->
        <div class="flex md:flex-col max-w-4xl p-2 rounded-lg ">
            <div class="text-6xl font-sans text-slate-700 w-full text-center mt-4 bg-amber-50 p-2 rounded-xl">
                {{ currentTask.title }}
            </div>
            <div class="text-xl text-slate-600 p-4 bg-white">
                {{ currentTask.description }}
            </div>
        </div>
            
        <!-- Main text section -->

        <div class="grid grid-cols-3">
            <!-- First column -->
            <div class="flex flex-col">
                <div class="flex flex-col py-2">
                    <div class=" ml-2 text-xl font-bold text-white p-2 bg-emerald-800 w-fit rounded-t-lg">
                        <h2 >An idiom to remember</h2>
                    </div>
                    <div class="col-span-1 flex flex-col text-left h-full justify-center rounded-xl p-4 bg-emerald-500 text-white">
                        <div class="border-2 rounded-xl border-white p-2">
                            <div class="text-lg font-semibold">"{{currentTask.idiom.expression}}"</div>
                            <div>{{ currentTask.idiom.meaning }}</div>
                        </div>
                    </div>
                </div>
                <div class="flex p-4 sm:order-2 lg:order-1">
                    <img :src="currentTask.image" alt="Article image" class="w-full h-full object-cover rounded-2xl">
                </div>
            </div>

            <!-- Second column -->

            <div class="flex flex-col col-span-2 gap-2">
                <div class="flex flex-col">
                <h2 class="text-2xl font-semibold text-white p-2 bg-sky-600 w-fit rounded-t-lg mx-2">
                    {{ currentTask.content[0].header }}
                </h2>
                <div class="flex flex-col p-4 bg-white border-2 border-cyan-400 rounded-b-xl rounded-tr-xl mx-2">
                    {{ currentTask.content[0].content }}
                </div>  
                </div>

                <div class="grid grid-cols-2">
                    <div class="flex flex-col p-4 bg-white border-2 border-cyan-400 rounded-xl mx-2">
                        {{ currentTask.content[1].content }}
                    </div>
                    <div class="flex">
                        <div class="flex flex-col">  
                            <h2 class="text-2xl font-semibold text-white p-2 bg-sky-600 w-fit rounded-t-lg">Vocabulary</h2>
                            <div class="flex flex-wrap p-4 gap-2 h-fit bg-sky-300 rounded-b-xl rounded-tr-xl border-2 border-sky-600">
                                <VocabularyItem v-for="item in currentVocab.vocab" :key="item.id" :word="item.word" :definition="item.definition" :example="item.example" :image="item.img"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col mx-2"></div>
                    <div class="flex">
                        <div class="flex flex-col p-4 bg-white border-2 border-cyan-400 rounded-xl mx-2">
                                {{ currentTask.content[2].content }}
                        </div>
                        <div class="flex flex-col p-4 bg-white border-2 border-cyan-400 rounded-xl mx-2">
                                {{ currentTask.content[3].content }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { readingDemo, readingVocab } from '@/data'
import VocabularyItem from './VocabularyItem.vue'

const currentTask = readingDemo.find(item => item.id === 1)
const hasManyContent = currentTask.content.length > 2

const currentVocab = readingVocab.find(item => item.id === currentTask.id)

console.log(currentVocab)
</script>