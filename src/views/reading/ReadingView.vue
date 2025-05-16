<template>
  <div>
    <main class="flex flex-col mb-6">
      <div class="flex flex-col">
        <ArticleTemplate v-if="currentTaskId === 1" />
        <ArticleTemplate2 v-else-if="currentTaskId === 2" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Message from "../../components/Message.vue";
import MainText from "./components/ArticleTemplate.vue";
import ArticleTemplate from "./components/ArticleTemplate.vue";
import ArticleTemplate2 from "./components/ArticleTemplate2.vue";
import ChatBox from "../../components/ChatBox.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const currentTaskId = ref(1);

const isSidebarOpen = ref(false);

onMounted(() => {
  console.log("Mounted ReadingView " + route.params.id);
  currentTaskId.value = parseInt(route.params.id, 10); // Ensure number type
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>
