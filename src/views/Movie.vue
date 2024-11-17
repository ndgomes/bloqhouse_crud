<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Components from '@/components';
import { Save, Ban, Popcorn, Trash2 } from 'lucide-vue-next';
import { useToast } from 'vue-toastification';

const toast = useToast();
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

const showDeleteModal = ref(false);
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

async function isValidImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

onMounted(async () => {
  // Redirect to home if the movie is not found
  if (!selectedMovieData.value) {
    router.push('/');
    return;
  }

  const selectedMovie = { ...selectedMovieData.value };
  const isValid = await isValidImage(selectedMovie.coverImage);

  movieData.value = {
    ...movieData.value,
    ...selectedMovie,
    coverImage: isValid
      ? selectedMovie.coverImage
      : 'https://m.media-amazon.com/images/I/61s8vyZLSzL._AC_UF894,1000_QL80_.jpg',
  };
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
    toast.error('Form is not valid. Please fill out all fields or try again.');
    return;
  }

  try {
    // Update an existing movie
    await updateDoc(
      doc(db, 'movies', movieData.value.id),
      movieData.value
    ).then(() => {
      isEditing.value = false;
      window.location.reload();
    });
  } catch (error) {
    console.error('!! Error adding/updating:', error);
  }
}

// Delete movie handler
async function handleOnDelete() {
  if (!movieData.value.id) {
    toast.error('Not available for delete.');
    return;
  }

  try {
    await deleteDoc(doc(db, 'movies', movieData.value.id)).then(() => {
      window.location.reload();
    });
  } catch (error) {
    console.error('!! Error deleting:', error);
  }
}

function backToHome() {
  router.push('/');
}

function openDeleteModal() {
  document.body.style.overflow = 'hidden';
  showDeleteModal.value = true;
}

function closeDeleteModal() {
  document.body.style.overflow = 'auto';
  showDeleteModal.value = false;
}
</script>

<template>
  <div>
    <!-- Load Modal Component to Delete a Movie -->
    <Components.DeleteModal
      v-if="showDeleteModal"
      @confirmDelete="handleOnDelete"
      @close="closeDeleteModal"
    />

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
          <span>{{ movieData.description }}</span>
          <div class="movie-info-details">
            <p><strong>Genre:</strong> {{ movieData.genre.join(', ') }}</p>
            <p><strong>Rating:</strong> {{ movieData.rating }}/10 ⭐️</p>
            <p><strong>Release Year:</strong> {{ movieData.releaseYear }}</p>
          </div>
        </div>

        <div v-else class="movie-info-inputs">
          <input
            name="title"
            type="text"
            v-model="movieData.title"
            placeholder="Title"
            max="80"
          />
          <textarea
            name="description"
            v-model="movieData.description"
            placeholder="Description (max 100 characters)"
            maxlength="100"
          />
          <div class="genre-container">
            <label v-for="genre in genres" :key="genre">
              <input
                name="genre"
                type="checkbox"
                :value="genre"
                v-model="movieData.genre"
              />
              {{ genre }}
            </label>
          </div>
          <input
            name="rating"
            type="number"
            v-model="movieData.rating"
            placeholder="Rating (1-10)"
            min="1"
            max="10"
          />
          <input
            name="releaseYear"
            type="number"
            v-model="movieData.releaseYear"
            placeholder="Release Year"
            min="1800"
            :max="currentYear"
          />
          <input
            name="coverImage"
            type="url"
            v-model="movieData.coverImage"
            placeholder="Cover Image URL"
          />
        </div>

        <div class="actions">
          <button
            class="white-button"
            v-if="isEditing"
            @click="handleOnSubmit"
            data-testid="confirm-edit-movie"
          >
            <Save />Save Changes
          </button>
          <button v-if="isEditing" @click="isEditing = false">
            <Ban />Cancel
          </button>

          <button
            class="white-button"
            v-if="!isEditing"
            @click="isEditing = true"
            data-testid="edit-movie"
          >
            <Popcorn />Edit
          </button>
          <button
            v-if="!isEditing"
            @click="openDeleteModal"
            data-testid="delete-movie"
          >
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
}

.movie-cover {
  margin: 0 3rem 2rem 1rem;
  flex-shrink: 0;
}

.cover-image {
  border-radius: 1rem;
  width: 250px;
  height: auto;
}

.movie-info {
  flex-grow: 1;
}

.movie-info h2 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.movie-info span {
  font-size: 1rem;
  color: slategray;
  font-weight: 600;
}

.movie-info-details {
  margin-top: 1rem;
}

.movie-info-inputs {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 1rem;
}

.movie-info p {
  margin-bottom: 0.6rem;
}

.movie-info input,
.movie-info textarea {
  width: auto;
  margin: 10px 0;
  padding: 8px;
  resize: none;
  border: solid 1px #ec0c5c;
  border-radius: 5px;
  font-size: 1rem;
}

.movie-info .genre-container {
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  width: fit-content;
  gap: 1rem;
}

.movie-info .genre-container input {
  width: 1rem;
  accent-color: #ec0c5c;
}

.movie-info .actions {
  display: flex;
  width: auto;
  gap: 10px;
}

.white-button {
  background-color: white;
  color: #ec0c5c;
  border: solid 1px #ec0c5c;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  margin-top: 1rem;
}

.white-button:hover {
  background-color: #ec0c5c;
  color: white;
  border: solid 1px #ec0c5c;
}

.movie-info button:not(.white-button) {
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

.movie-info button:not(.white-button):hover {
  background-color: white;
  color: #ec0c5c;
  border: solid 1px #ec0c5c;
}

@media (max-width: 1024px) {
  .movie-details-container {
    flex-direction: column;
  }
  .movie-details-container .movie-cover {
    margin: 0 0 2rem 0;
    flex-shrink: 0;
  }
  .movie-details-container textarea {
    height: 70px;
  }
  .movie-details-container .genre-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
