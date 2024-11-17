<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { SquarePlus, X } from 'lucide-vue-next';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['close']);

const movieData = ref({
  title: '',
  description: '',
  genre: [],
  rating: '',
  releaseYear: '',
  coverImage: '',
});

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller'];

// Get the current year dynamically
const currentYear = new Date().getFullYear();

// Validation required fields
function isFormValid() {
  return (
    movieData.value.title.length <= 80 &&
    movieData.value.description.length <= 100 &&
    movieData.value.genre.length &&
    movieData.value.rating >= 1 &&
    movieData.value.rating <= 10 &&
    movieData.value.releaseYear >= 1800 &&
    movieData.value.releaseYear <= currentYear &&
    movieData.value.coverImage
  );
}

// Submit handler for add movie
async function handleOnSubmit() {
  if (!isFormValid()) {
    toast.error('Form is not valid. Please fill out all fields or try again.');
    return;
  }

  try {
    await addDoc(collection(db, 'movies'), movieData.value);

    toast.success(`${movieData.value.title} - Movie added successfully.`, {
      duration: 300,
    });

    emit('close');

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error('!! Error adding:', error);
  }
}

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <transition name="modal">
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Add Movie</h2>
          <button class="close-button" @click="emit('close')"><X /></button>
        </div>

        <div class="modal-inputs">
          <input
            type="text"
            placeholder="Title"
            v-model="movieData.title"
            max="80"
            required
          />
          <textarea
            placeholder="Description (max 100 characters)"
            v-model="movieData.description"
            maxlength="100"
            required
          />

          <div class="genre-container">
            <label v-for="genre in genres" :key="genre">
              <input type="checkbox" :value="genre" v-model="movieData.genre" />
              {{ genre }}
            </label>
          </div>

          <input
            type="number"
            placeholder="Rating (0-10)"
            v-model="movieData.rating"
            min="0"
            max="10"
            required
          />
          <input
            type="number"
            placeholder="Release Year"
            v-model="movieData.releaseYear"
            min="1800"
            :max="currentYear"
            required
          />
          <input
            type="url"
            placeholder="Cover Image URL"
            v-model="movieData.coverImage"
            required
          />
        </div>

        <button class="submit-button" @click="handleOnSubmit()">
          <SquarePlus />
          Add Movie
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-overlay {
  z-index: 1;
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

.modal-container {
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  width: 90vw;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  overflow: scroll;
}

.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  width: auto;
  padding: 0;
  margin: 0;
}

h2 {
  color: #333;
  text-align: center;
  margin-right: auto;
}

input,
textarea,
button {
  width: 90%;
  margin: 0.5rem 0;
  padding: 0.75rem;
  font-size: 1rem;
}

textarea {
  resize: none;
  height: 4rem;
}

.genre-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  accent-color: #ec0c5c;
}

.genre-container label {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.genre-container input {
  width: 1rem;
  margin: 0 0.2rem 0 0;
  padding: 0;
}

.submit-button {
  background-color: #ec0c5c;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: solid 1px #ec0c5c;
  width: 100%;
  margin-top: 1rem;
}

.submit-button:hover {
  background-color: white;
  color: #ec0c5c;
  border: solid 1px #ec0c5c;
}

/* Responsive */
@media (min-width: 768px) {
  .modal-container {
    width: 60vw;
    max-width: 600px;
  }
}

@media (min-width: 1024px) {
  .modal-container {
    width: 40vw;
  }
  .genre-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
