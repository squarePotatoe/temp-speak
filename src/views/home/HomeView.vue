<template>
  <div>
    <main class="container relative justify-between h-[calc(100vh-74px)] max-w-6xl px-10 mx-auto xl:px-0 mt-5">
      <div class="flex flex-col mt-6 lg:flex-row gap-4 mb-6">
        <div
          class="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-6 animate-fade-in"
        >
          <h2 class="text-4xl md:text-5xl text-blue-900">
            Welcome <br /><strong> back </strong>
          </h2>
          <span
            class="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-indigo-800"
          >
            {{ formattedTime }}
          </span>
        </div>

        <div
          class="flex-1 bg-blue-100 border border-blue-200 rounded-xl p-6 animate-fade-in"
        >
          <h2 class="text-4xl md:text-5xl text-blue-900">
            Inbox <br /><strong>23</strong>
          </h2>
          <a
            href="#"
            class="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-blue-800 hover:bg-blue-900 transition-transform duration-300 hover:scale-105"
          >
            See messages
          </a>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <RouterLink to="/classes" class="home-card animate-slide-up">
          <h3 class="text-xl font-bold text-indigo-800">My Classes</h3>
          <hr class="text-gray-300 my-2" />
          <div class="flex flex-col justify-center gap-2 mt-2">
            <div>

              <p class="text-lg font-semibold text-gray-600">
                Stay updated with your schedule
              </p>
              <p class="text-sm text-gray-600">Next class: Space Travel</p>
              <p class="text-sm text-gray-600">Teacher: John Doe</p>
              <p class="text-sm text-gray-600">Date: 22 October 2025</p>
              <p class="text-sm text-gray-600">Time: 19:00 - 20:00</p>
            </div>
          </div>
        </RouterLink>
        <RouterLink
          to="/writing"
          class="home-card animate-slide-up relative"
          style="animation-delay: 0.2s"
        >
          <span class="h-2 absolute bg-cyan-500 rounded-full right-4 animate-ping duration-300 p-1"></span>
          <h3 class="text-xl font-bold text-indigo-800">Next lesson</h3>
          <hr class="text-gray-300 my-2" />
          <div class="flex flex-col justify-center gap-2 mt-2">
            <div>
               <h2 class="text-lg font-semibold text-purple-700">
                {{ nextLesson.title }}
              </h2>


              <p class="text-sm font-semibold text-gray-600">
                {{ nextLesson.description }}
              </p>
              <p class="text-sm text-gray-600">John Doe</p>
            </div>
            <p class="tag max-w-fit">{{ nextLesson.course }}</p>
          </div>
        </RouterLink>
        <RouterLink
          to="/classes"
          class="home-card animate-slide-up"
          style="animation-delay: 0.3s"
        >
          <h3 class="text-xl font-bold text-indigo-800">My Calendar</h3>
        </RouterLink>
      </div>

      <div class="flex flex-col mt-6 lg:flex-row gap-4 mb-6">
        <div
          class="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-6 animate-fade-in"
        >
          <h2 class="text-4xl md:text-5xl text-blue-900">Weekly summary</h2>
          <span
            class="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-indigo-800"
          >
            Read more
          </span>
        </div>

        <div
          class="flex-1 bg-blue-100 border border-blue-200 rounded-xl p-6 animate-fade-in"
        >
          <h2 class="text-4xl md:text-5xl text-blue-900">
                    <br><strong></strong>
                </h2>
                <a href="#" class="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-blue-800 hover:bg-blue-900 transition-transform duration-300 hover:scale-105">
                    Coming soon
                </a>
        </div>
      </div>
    </main>
    <!-- <Features /> -->
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { textFormatDemo } from '@/data'

const nextLesson = textFormatDemo.find(item => item.id === 1)

const currentTime = ref(new Date())

const formattedTime = computed(() => {
  return new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(currentTime.value)
})

const updateTime = () => {
  currentTime.value = new Date()
}

onMounted(() => {
  const interval = setInterval(updateTime, 1000)
  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>
