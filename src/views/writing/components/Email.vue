<template>
  <div>
    <article
      :style="{ height: articleHeight }"
      class="overflow-y-auto mx-auto p-4 shadow rounded-t bg-white text-gray-700 flex flex-col gap-2"
    >
      <h1 class="text-2xl font-semibold">{{ subject }}</h1>
      <p class="text-gray-600">{{ textType.description }}</p>
      <p class="text-gray-500">{{ textType.example }}</p>
      <div class="flex flex-col gap-4 text-xl">
        <!-- Title section  -->
        <div :class="activeTip === 0 ? 'bg-amber-100' : ''">
          Discovering the Magic of the Internet
        </div>
        <!-- Introduction section  -->
        <div>
          <span
            :class="activeTip === 3 || activeTip === 1 ? 'bg-amber-100' : ''"
          >
            <span :class="expressionsTab === 1 ? 'underline' : ''"
              >Are you one of those people who</span
            >
            can’t go a day without checking your phone for internet
            access?</span
          >
          Let me take you back to when this incredible tool was just emerging.
          It has transformed our lives in ways we never imagined.
          <span :class="activeTip === 4 ? 'bg-amber-100' : ''"
            >The World Wide Web truly is magical, making it easy to find
            information and connect with people.</span
          >
          Once limited to computers, now it has woven itself into every aspect
          of our daily lives, and
          <span :class="activeTip === 2 ? 'bg-amber-100' : ''">
            I love it!
          </span>
        </div>
        <!-- Body Section  -->
        <div class="flex flex-col gap-2">
          <p>
            <span :class="activeTip === 2 ? 'bg-amber-100' : ''"
              ><span :class="expressionsTab === 2 ? 'underline' : ''"
                >This month, we explore</span
              ></span
            >
            one of the cool things about the World Wide Web: you can look up
            anything you want and get the answer straight away.
            <span :class="activeTip === 7 ? 'bg-amber-100' : ''"
              >Isn’t that fantastic?
            </span>
            <span :class="expressionsTab === 4 ? 'underline' : ''"
              >Here's what you need to know</span
            >: for example, imagine you are arguing with your friends about how
            to do something. Easy solution! Go online and find the answer.
          </p>
          <p>
            <span :class="activeTip === 4 ? 'bg-amber-100' : ''">
              <span :class="expressionsTab === 3 ? 'underline' : ''"
                >Apart from that</span
              ></span
            >,
            <span :class="activeTip === 5 ? 'bg-amber-100' : ''">
              one of the best aspects of the internet is the ability to learn a
              wide range of subjects at little to no cost!
              <span :class="expressionsTab === 5 ? 'underline' : ''"
                >If you ask me</span
              >, my go-to website is
              <span class="text-blue-600">www.udemy.com</span>, where
              individuals can sign up to both teach and learn about diverse
              topics
            </span>
            such as music, web design, app development, history, and much more.
          </p>
          <p :class="activeTip === 6 ? 'bg-amber-100' : ''">
            {{ textType.structure[6].content }}
          </p>
          <p>
            As we look ahead, experts agree that the internet offers countless
            advantages. Personally, I believe the most valuable things are the
            ease of finding information and the opportunity for online learning.
            What about you? What do you enjoy most about it?
          </p>
        </div>
        <!-- Closing section  -->
        <div></div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { textTypesExamples } from "@/data";

const textType = textTypesExamples.find((item) => item.id === 1);
const { subject, salutation, body, closing, signature } = textType.structure;

const props = defineProps({
  articleHeight: {
    type: String,
    default: "40rem",
  },
  activeTip: {
    type: String,
  },
  expressionsTab: {
    type: String,
  },
});
</script>
