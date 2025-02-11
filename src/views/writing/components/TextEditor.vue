<template>
  <div>
    <div v-if="editor" class="editor-container bg-white rounded border border-amber-50 shadow-md">
      <div class="toolbar grid grid-cols-5 md:grid-cols-6 gap-1 bg-purple-500 p-2 rounded-t">
        <button class="btn-editor" type="button" @click="toggleBold" :class="{ 'btn-editor-active': editor.isActive('bold') }">
          <i class="fas fa-bold"></i>
        </button>
        <button class="btn-editor" type="button" @click="toggleItalic" :class="{ 'btn-editor-active': editor.isActive('italic') }">
          <i class="fas fa-italic"></i>
        </button>
        <button class="btn-editor" type="button" @click="toggleUnderline" :class="{ 'btn-editor-active': editor.isActive('underline') }">
          <i class="fas fa-underline"></i>
        </button>
        <button class="btn-editor" type="button" @click="toggleStrike" :class="{ 'btn-editor-active': editor.isActive('strike') }">
          <i class="fas fa-strikethrough"></i>
        </button>
        <button class="btn-editor" type="button" @click="toggleBulletList" :class="{ 'btn-editor-active': editor.isActive('bulletList') }">
          <i class="fas fa-list-ul"></i>
        </button>
        <button class="btn-editor" type="button" @click="toggleOrderedList" :class="{ 'btn-editor-active': editor.isActive('orderedList') }">
          <i class="fas fa-list-ol"></i>
        </button>
        <button class="btn-editor" type="button" @click="toggleBlockquote" :class="{ 'btn-editor-active': editor.isActive('blockquote') }">
          <i class="fas fa-quote-right"></i>
        </button>
        <button class="btn-editor" type="button" @click="toggleHeading(1)" :class="{ 'btn-editor-active': editor.isActive('heading', { level: 1 }) }">
          <i class="fas fa-heading"></i><span class="heading-level">1</span>
        </button>
        <button class="btn-editor" type="button" @click="toggleHeading(2)" :class="{ 'btn-editor-active': editor.isActive('heading', { level: 2 }) }">
          <i class="fas fa-heading"></i><span class="heading-level">2</span>
        </button>
      </div>
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'

const form = ref({
  title: '',
  content: ''
})

const props = defineProps({
  modelValue: {
    type: String,
    modelValue: String
  },
})

const emit = defineEmits(['update:modelValue'])

const editor = ref(null)

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    onUpdate: ({ editor }) => {
      emit('update:modelValue', editor.getHTML())
    },
    extensions: [
      StarterKit,
      Underline,
    ],
    editorProps: {
      attributes: {
        class: 'border-gray-400 p-4 min-h-[25rem] rounded-b-xl max-h-[30rem] overflow-y-auto p-4 outline-none prose',
      },
    },
  })
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

const toggleBold = () => {
  editor.value.chain().focus().toggleBold().run()
}

const toggleItalic = () => {
  editor.value.chain().focus().toggleItalic().run()
}

const toggleUnderline = () => {
  editor.value.chain().focus().toggleUnderline().run()
}

const toggleStrike = () => {
  editor.value.chain().focus().toggleStrike().run()
}

const toggleBulletList = () => {
  editor.value.chain().focus().toggleBulletList().run()
}

const toggleOrderedList = () => {
  editor.value.chain().focus().toggleOrderedList().run()
}

const toggleBlockquote = () => {
  editor.value.chain().focus().toggleBlockquote().run()
}

const toggleHeading = (level) => {
  editor.value.chain().focus().toggleHeading({ level }).run()
}
</script>

<style scoped>

.toolbar {
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.btn-editor {
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.btn-editor-active {
  background-color: #ddd;
}

.btn-editor:hover {
  background-color: #e0e0e0;
  transform: scale(1.05);
}

.heading-level {
  margin-left: 5px;
  font-size: 0.8em;
}

p {
  color: #ddd;
}
</style>