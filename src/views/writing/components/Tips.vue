<template>
  <div>
    <div class="flex flex-col max-h-[calc(100vh-6rem)]">
      <div class="my-2"></div>

      <div class="my-2 text-sm">
        <h2 class="text-lg font-semibold">How to structure an Article</h2>
        <p class="">
          Refer to the following tips to improve your writing skills and create
          engaging content.
        </p>
        <p>Follow these steps to structure your article effectively:</p>
      </div>

      <div class="flex flex-col overflow-y-auto shadow-md">
        <div class="bg-white p-2 rounded-md">
          <Tip
            title="Headline"
            content="A catchy title that grabs attention and reflects the main topic."
          />
        </div>

        <div class="bg-white p-2 rounded-md mt-1">
          <Tip
            title="Lead"
            content="An engaging opening paragraph that introduces the topic and hooks the reader."
          />
        </div>

        <div class="bg-white p-2 rounded-md mt-1">
          <Tip
            title="Introduction"
            content="Provide background information on the topic. Explain why it is relevant or important."
          />
        </div>

        <div class="bg-white p-2 rounded-md mt-1">
          <Tip title="Body paragraphs" content="" />
          <Tip
            title="Body 1: Key Point or Theme"
            content="Discuss the first major point. Include anecdotes, quotes, or statistics to support it."
          />
          <Tip
            title="Body 2: Additional Perspectives"
            content="Explore different angles or viewpoints related to the topic.
                Provide examples or interviews with relevant individuals.
                "
          />
          <Tip
            title="Body 3: Impact or Significance"
            content="Discuss the broader implications of the topic.
                Explain how it affects the community or society at large.
                "
          />
        </div>

        <div class="bg-white p-2 rounded-md mt-1">
          <Tip title="Conclusion" content="" />
          <Tip title="" content="Summarize the main points." />
          <Tip
            title=""
            content="Reflect on the future or suggest possible solutions or actions."
          />
          <Tip
            title=""
            content="End with a strong closing statement that leaves an impression."
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Tip from './Tip.vue'
</script>
