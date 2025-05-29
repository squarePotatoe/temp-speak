<script setup>
import { ref } from "vue";

const form = ref({
  studentId: "S1234567",
  name: "Patrick Chan",
  gender: "Male",
  dob: "2008-05-12",
  school: "Springfield Secondary School",
  grade: "secondary-3",
  status: "ongoing",
  email: "patrick.chan@email.com",
  phone: "9123 4567",
  contact: "patrick.chan@email.com",
  parentContact: "Mrs. Chan, 9123 4567",
});

const grades = [
  { value: "primary-1", label: "Primary 1" },
  { value: "primary-2", label: "Primary 2" },
  { value: "primary-3", label: "Primary 3" },
  { value: "primary-4", label: "Primary 4" },
  { value: "secondary-1", label: "Secondary 1" },
  { value: "secondary-2", label: "Secondary 2" },
  { value: "secondary-3", label: "Secondary 3" },
  { value: "secondary-4", label: "Secondary 4" },
  { value: "secondary-5", label: "Secondary 5" },
  { value: "secondary-6", label: "Secondary 6" },
];

const genders = ["Male", "Female", "Other"];
const statuses = ["ongoing"];
</script>

<template>
  <form class="w-full mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block font-semibold mb-1 text-blue-800">Student ID</label>
        <input
          v-model="form.studentId"
          class="w-full border-2 border-blue-100 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 bg-white"
        />
      </div>
      <div>
        <label class="block font-semibold mb-1 text-blue-800"
          >Student Name</label
        >
        <input
          v-model="form.name"
          class="w-full border-2 border-blue-100 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 bg-white"
        />
      </div>
      <div>
        <label class="block font-semibold mb-1 text-blue-800">Gender</label>
        <select
          v-model="form.gender"
          class="w-full border-2 border-blue-100 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-blue-400"
        >
          <option v-for="g in genders" :key="g" :value="g">{{ g }}</option>
        </select>
      </div>
      <div>
        <label class="block font-semibold mb-1 text-blue-800"
          >Date of Birth</label
        >
        <input
          type="date"
          v-model="form.dob"
          class="w-full border-2 border-blue-100 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-blue-400"
        />
      </div>
      <div>
        <label class="block font-semibold mb-1 text-blue-800"
          >School Name</label
        >
        <input
          v-model="form.school"
          class="w-full border-2 border-blue-100 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 bg-white"
        />
      </div>
      <div>
        <label class="block font-semibold mb-1 text-blue-800">Grade</label>
        <select
          v-model="form.grade"
          class="w-full border-2 border-blue-100 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-blue-400"
        >
          <option v-for="g in grades" :key="g.value" :value="g.value">
            {{ g.label }}
          </option>
        </select>
      </div>
      <div>
        <label class="block font-semibold mb-1 text-blue-800">Status</label>
        <select
          v-model="form.status"
          class="w-full border-2 border-blue-100 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-blue-400"
        >
          <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
      <div>
        <label class="block font-semibold mb-1 text-blue-800">Email</label>
        <input
          v-model="form.email"
          class="w-full border-2 border-blue-100 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 bg-white"
          type="email"
        />
      </div>
      <div>
        <label class="block font-semibold mb-1 text-blue-800">Phone</label>
        <input
          v-model="form.phone"
          class="w-full border-2 border-blue-100 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 bg-white"
          type="tel"
        />
      </div>
      <div>
        <label class="block font-semibold mb-1 text-blue-800"
          >Contact Information</label
        >
        <input
          v-model="form.contact"
          class="w-full border-2 border-blue-100 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 bg-white"
        />
      </div>
      <div>
        <label class="block font-semibold mb-1 text-blue-800"
          >Parent / Preferred Contact</label
        >
        <input
          v-model="form.parentContact"
          class="w-full border-2 border-blue-100 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 bg-white"
        />
      </div>
    </div>
    <div class="flex justify-center pt-4">
      <button
        type="button"
        class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow transition"
      >
        Save
      </button>
    </div>
  </form>
</template>
