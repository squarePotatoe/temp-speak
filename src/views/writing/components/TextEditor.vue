<template>
  <div>
    <div v-if="editor" class="editor-container bg-white rounded border border-amber-50 shadow-md">
      <section
      v-if="editor"
      class="buttons text-gray-700 bg-gray-100 flex rounded-t items-center flex-wrap gap-x-4 border-1 border-purple-200 py-2 px-4"
    >
      <button
        type="button"
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'btn-editor-active': editor.isActive('bold') }"
        class="btn-editor"
      >
        <BoldIcon title="Bold" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'btn-editor-active': editor.isActive('italic') }"
        class="btn-editor"
      >
        <ItalicIcon title="Italic" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleUnderline().run()"
        :class="{ 'btn-editor-active': editor.isActive('underline') }"
        class="btn-editor"
      >
        <UnderlineIcon title="Underline" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{
          'btn-editor-active': editor.isActive('heading', { level: 1 }),
        }"
        class="btn-editor"
      >
        <H1Icon title="H1" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{
          'btn-editor-active': editor.isActive('heading', { level: 2 }),
        }"
        class="btn-editor"
      >
        <H2Icon title="H2" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'btn-editor-active': editor.isActive('bulletList') }"
        class="btn-editor"
      >
        <ListIcon title="Bullet List" />
      </button>
      <button
        type="button"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'btn-editor-active': editor.isActive('orderedList') }"
        class="btn-editor"
      >
        <OrderedListIcon title="Ordered List" />
      </button>

      <button
        type="button"
        @click="editor.chain().focus().setHorizontalRule().run()"
        class="btn-editor"
      >
        <HorizontalRuleIcon title="Horizontal Rule" />
      </button>
      <button
        type="button"
        class="px-2 disabled:text-gray-400 text-blue-400"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()"
      >
        <UndoIcon title="Undo"/>
      </button>
      <button
        type="button"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()"
        class="px-2 disabled:text-gray-400 text-blue-400"
      >
        <RedoIcon title="Redo" />
      </button>


    </section>
      <EditorContent :editor="editor"/>

    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent, Editor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import BoldIcon from 'vue-material-design-icons/FormatBold.vue'
import ItalicIcon from 'vue-material-design-icons/FormatItalic.vue'
import UnderlineIcon from 'vue-material-design-icons/FormatUnderline.vue'
import H1Icon from 'vue-material-design-icons/FormatHeader1.vue'
import H2Icon from 'vue-material-design-icons/FormatHeader2.vue'
import ListIcon from 'vue-material-design-icons/FormatListBulleted.vue'
import OrderedListIcon from 'vue-material-design-icons/FormatListNumbered.vue'
import HorizontalRuleIcon from 'vue-material-design-icons/Minus.vue'
import UndoIcon from 'vue-material-design-icons/Undo.vue'
import RedoIcon from 'vue-material-design-icons/Redo.vue'

const form = ref({
  title: '',
  content: '',
})

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const editor = ref(null)

const saveContent = () => {
  if (editor.value) {
    localStorage.setItem('editorContent', editor.value.getHTML())
  }
}

const loadContent = () => {
  const savedContent = localStorage.getItem('editorContent')
  if (savedContent) {
    form.value.content = savedContent
  }
}

onMounted(() => {
  loadContent()
  editor.value = new Editor({
    content: form.value.content,
    extensions: [
      StarterKit,
      Underline,
    ],
    editorProps: {
      attributes: {
        class: 'border-gray-400 p-4 min-h-[30rem] rounded-b-xl max-h-[30rem] border-r border-l border-b overflow-y-auto outline-none prose',
      },
    },
    onUpdate: ({ editor }) => {
      saveContent()
    }
  })
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

const clrearContent = () => {
  form.value.content = ''
  editor.value.commands.clearContent()
}

</script>

<style scoped>
.btn-editor {
  padding: 5px 10px;
  border: 1px solid #dcd3ff;
  background-color: #f9f9f9;
  box-shadow: inset 0 0 0 1px #eae5ff;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.btn-editor-active {
  background-color: rgb(252, 74, 74);
  transform: scale(1.05);
  color: white;
}

.btn-editor:hover {
  background-color: rgb(252, 74, 74);
  color: white;
  transform: scale(1.05);
}

.btn-editor:disabled {
  cursor: not-allowed;
}
.btn-editor:disabled:hover {
  background-color: white;
  transform: scale(1);
}
</style>