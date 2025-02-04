<template>
  <div >
      <div v-if="editor" class="editor-container bg-white rounded p-4">
        <div class="toolbar grid grid-cols-5 md:grid-cols-6 gap-1">
          <button class="btn-editor" type="button" @click="toggleBold" :class="{ 'btn-editor-active': editor.isActive('bold') }">Bold</button>
          <button class="btn-editor" type="button" @click="toggleItalic" :class="{ 'btn-editor-active': editor.isActive('italic') }">Italic</button>
          <button class="btn-editor" type="button" @click="toggleUnderline" :class="{ 'btn-editor-active': editor.isActive('underline') }">Underline</button>
          <button class="btn-editor" type="button" @click="toggleStrike" :class="{ 'btn-editor-active': editor.isActive('strike') }">Strike</button>
          <button class="btn-editor" type="button" @click="toggleBulletList" :class="{ 'btn-editor-active': editor.isActive('bulletList') }">Bullet List</button>
          <button class="btn-editor" type="button" @click="toggleOrderedList" :class="{ 'btn-editor-active': editor.isActive('orderedList') }">Ordered List</button>
          <button class="btn-editor" type="button" @click="toggleBlockquote" :class="{ 'btn-editor-active': editor.isActive('blockquote') }">Blockquote</button>
          <button class="btn-editor" type="button" @click="toggleHeading(1)" :class="{ 'btn-editor-active': editor.isActive('heading', { level: 1 }) }">H1</button>
          <button class="btn-editor" type="button" @click="toggleHeading(2)" :class="{ 'btn-editor-active': editor.isActive('heading', { level: 2 }) }">H2</button>
        </div>
        <EditorContent :editor="editor" class=" bg-white m-1" />
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

const editor = ref(null)

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    onUpdate: ({ editor }) => {
      // form.value.content = editor.getHTML()
      console.log('Content updated:', editor.getHTML())
    },
    extensions: [
      StarterKit,
      Underline,
    ],
    editorProps: {
      attributes: {
        class: 'border-gray-400 p-4 min-h-[30rem] rounded-b-xl max-h-[30rem] border-r border-l border-b overflow-y-auto outline-none prose',
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

const toggleCode = () => {
  editor.value.chain().focus().toggleCode().run()
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

const undo = () => {
  editor.value.chain().focus().undo().run()
}

const redo = () => {
  editor.value.chain().focus().redo().run()
}

const isActive = (format, options = {}) => {
  return editor.value.isActive(format, options)
}

const submitForm = () => {
  form.value.content = editor.value.getHTML()
  console.log('Form submitted with content:', form.value)
  // Perform any necessary actions with the content, such as sending it to a server
}
</script>

<style >


h1 {
  font-size: 2rem;
}

p {
  font-size: 1.25rem;
}

</style>


