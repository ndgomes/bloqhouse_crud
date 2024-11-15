<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Components from '@/components';
import { Save, Ban, Popcorn, Trash2 } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

const props = defineProps({
  movies: {
    type: Array,
    required: true,
  },
});

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller'];

// Get the current year dynamically
const currentYear = new Date().getFullYear();

const movieId = ref(route.params.id);
const isEditing = ref(false);

const movieData = ref({
  title: '',
  description: '',
  genre: [],
  rating: '',
  releaseYear: '',
  coverImage: '',
});

const selectedMovieData = computed(() =>
  props.movies.find((movie) => movie.id === movieId.value)
);

// Watch for changes in route.params
watch(
  () => route.params.id,
  (newId) => {
    movieId.value = newId; // Update movieId when route changes
  }
);

onMounted(() => {
  // Redirect to home if the movie is not found
  if (!selectedMovieData.value) {
    router.push('/');
    return;
  }

  movieData.value = { ...movieData.value, ...selectedMovieData.value };
});

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

// Submit handler for add/update movie
async function handleOnSubmit() {
  if (!isFormValid()) {
    alert('Form is not valid. Please fill out all fields or try again.');
    return;
  }

  try {
    // Update an existing movie
    await updateDoc(
      doc(db, 'movies', movieData.value.id),
      movieData.value
    ).then(() => {
      router.push('/');
    });
  } catch (error) {
    console.error('!! Error adding/updating:', error);
  }
}

// Delete movie handler
async function handleOnDelete() {
  if (!movieData.value.id) {
    alert('Not available for delete.');
    return;
  }

  try {
    await deleteDoc(doc(db, 'movies', movieData.value.id)).then(() => {
      router.push('/');
    });
  } catch (error) {
    console.error('!! Error deleting:', error);
  }
}

function backToHome() {
  router.push('/');
}
</script>

<template>
  <div>
    <!-- Header with Add Movie Button -->
    <Components.Header @clickAction="backToHome" :withBackButton="true" />

    <div class="movie-details-container">
      <div class="movie-cover">
        <img
          :src="movieData.coverImage"
          alt="Movie Cover"
          class="cover-image"
        />
      </div>
      <div class="movie-info">
        <div v-if="!isEditing">
          <h2>{{ movieData.title }}</h2>
          <p>{{ movieData.description }}</p>
          <p><strong>Genre:</strong> {{ movieData.genre.join(', ') }}</p>
          <p><strong>Rating:</strong> {{ movieData.rating }}</p>
          <p><strong>Release Year:</strong> {{ movieData.releaseYear }}</p>
        </div>

        <div v-else>
          <input
            type="text"
            v-model="movieData.title"
            placeholder="Title"
            max="80"
          />
          <textarea
            v-model="movieData.description"
            placeholder="Description (max 100 characters)"
            maxlength="100"
          />
          <div class="genre-container">
            <label v-for="genre in genres" :key="genre">
              <input type="checkbox" :value="genre" v-model="movieData.genre" />
              {{ genre }}
            </label>
          </div>
          <input
            type="number"
            v-model="movieData.rating"
            placeholder="Rating (1-10)"
            min="1"
            max="10"
          />
          <input
            type="number"
            v-model="movieData.releaseYear"
            placeholder="Release Year"
            min="1800"
            :max="currentYear"
          />
          <input
            type="url"
            v-model="movieData.coverImage"
            placeholder="Cover Image URL"
          />
        </div>

        <div class="actions">
          <button v-if="isEditing" @click="handleOnSubmit">
            <Save />Save Changes
          </button>
          <button v-if="isEditing" @click="isEditing = false">
            <Ban />Cancel
          </button>

          <button v-if="!isEditing" @click="isEditing = true">
            <Popcorn />Edit
          </button>
          <button v-if="!isEditing" @click="handleOnDelete">
            <Trash2 />Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-details-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.movie-cover {
  margin-right: 20px;
  flex-shrink: 0;
}

.cover-image {
  border-radius: 1rem;
  width: 200px;
  height: auto;
}

.movie-info {
  max-width: 500px;
  flex-grow: 1;
}

.movie-info input,
.movie-info textarea {
  width: 100%;
  margin: 10px 0;
  padding: 8px;
  font-size: 16px;
}

.movie-info .genre-container {
  margin: 10px 0;
}

.movie-info .actions {
  display: flex;
  gap: 10px;
}

.movie-info button {
  padding: 8px 16px;
  background-color: #ec0c5c;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: solid 1px #ec0c5c;
  width: 100%;
  margin-top: 1rem;
}

.movie-info button:hover {
  background-color: white;
  color: #ec0c5c;
  border: solid 1px #ec0c5c;
}

.movie-info button:hover {
  background-color: #f0f0f0;
}

@media (max-width: 1024px) {
  .movie-details-container {
    flex-direction: column;
  }
}
</style>
