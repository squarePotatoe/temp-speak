<template>
  
  <div>
    <div class="flex flex-col gap-4">
      <h2 class="mb-2">Useful Expressions</h2>
      <p class="text-sm">
        Use these expressions to start your article.
      </p>
      <div>
        <ul v-for="expression in introductionSentences" class="bg-white rounded p-1">
          <li class="text-sm">
            <p>{{ expression.content }}</p>
          </li>
        </ul>
      </div>
      <p class="text-sm">
        Don't forget the connectors!
      </p>
        <div>
        <ul v-for="expression in connectives" class="bg-white rounded p-1">
          <li class="text-sm">
            <p>{{ expression.content }}</p>
          </li>
        </ul>
        </div>
        <div>
        <ul v-for="expression in connectives" class="bg-white rounded p-1">
          <li class="text-sm">
            <p>{{ expression.content }}</p>
          </li>
        </ul>
        </div>
        <div>
        <ul v-for="expression in connectives" class="bg-white rounded p-1">
          <li class="text-sm">
            <p>{{ expression.content }}</p>
          </li>
        </ul>
        </div>
        <div>
        <ul v-for="expression in connectives" class="bg-white rounded p-1">
          <li class="text-sm">
            <p>{{ expression.content }}</p>
          </li>
        </ul>
        </div>
    </div>
  </div>
</template>

<script setup>
import { introductionSentences, connectives } from '@/data';
</script>