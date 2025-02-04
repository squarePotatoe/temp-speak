<template>
    <div class="flex container ">
        <div v-if="data">
        <h1 class=" text-3xl">Cat fact: </h1>
        <p class="mt-2">{{ data.fact }}</p>
        </div> 
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script setup >
import { ref,onMounted } from 'vue'
import axios from 'axios'
const data = ref(null);

const fetchData = async () => {
  try {
    const response = await axios.get('https://catfact.ninja/fact')
    data.value = response.data
  } catch (error) {
    console.error('There was a problem with the axios operation:', error)
  }
}

onMounted(() => {
  fetchData()
})

</script>