<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { db } from '@/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  isNew: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['close']);

const movieData = ref({
  title: '',
  description: '',
  genre: '',
  rating: '',
  releaseYear: '',
  coverImage: '',
});

onMounted(() => {
  movieData.value = { ...movieData.value, ...props.data };
});

// Submit handler for add/update movie
async function handleOnSubmit() {
  try {
    if (props.isNew) {
      // Add a new movie
      await addDoc(collection(db, 'movies'), movieData.value);
    } else {
      // Update an existing movie
      await updateDoc(doc(db, 'movies', movieData.value.id), movieData.value);
    }
    emit('close');
  } catch (error) {
    console.error('!! Error adding/updating:', error);
  }
}

// Delete movie handler
async function handleOnDelete() {
  try {
    await deleteDoc(doc(db, 'movies', movieData.value.id));
    emit('close');
  } catch (error) {
    console.error('!! Error deleting:', error);
  }
}
</script>

<template>
  <transition name="modal">
    <div class="modal-overlay">
      <div class="modal-wrapper">
        <div class="modal-container">
          <button @click="emit('close')">X</button>
          <input type="text" placeholder="Title" v-model="movieData.title" />
          <textarea placeholder="Description" v-model="movieData.description" />
          <!-- TODO: Add checkbox for genre -->
          <!-- <input type="checkbox" v-model="movieData.genre" /> -->
          <input type="text" placeholder="Rating" v-model="movieData.rating" />
          <input
            type="text"
            placeholder="Release Year"
            v-model="movieData.releaseYear"
          />
          <input
            type="text"
            placeholder="Cover Image"
            v-model="movieData.coverImage"
          />
          <button @click="handleOnSubmit()">
            {{ isNew ? 'Add' : 'Save' }}
          </button>
          <button v-if="!isNew" @click.stop="handleOnDelete()">Delete</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.modal-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 50vw;
  max-width: 500px;
}

input,
textarea,
button {
  width: 90%;
  margin: 10px auto;
  display: block;
  padding: 8px;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

button {
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
