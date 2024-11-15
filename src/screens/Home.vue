<script setup>
import { ref, computed } from 'vue';
import Components from '@/components';

const props = defineProps({
  movies: {
    type: Array,
    required: true,
  },
});

const showModal = ref(false);
const movieData = ref({});
const isNewMovie = ref(false);
const searchQuery = ref('');

function handleSearchUpdate(value) {
  searchQuery.value = value;
}

// Computed property to filter movies based on search query
const filteredMovies = computed(() => {
  if (!searchQuery.value.trim()) {
    return props.movies; // Return all movies if the search query is empty
  }

  // Filter movies by title or other properties as needed
  return props.movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Toggle the modal and prepare data for add or update a movie
function toggleManageModal(data = {}, isNew = false) {
  movieData.value = data;
  isNewMovie.value = isNew;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}
</script>

<template>
  <div>
    <!-- Header with Add Movie Button -->
    <Components.Header @add="toggleManageModal({}, true)" />

    <!-- Load Modal Component to Add or Update a Movie -->
    <Components.ManageModal
      v-if="showModal"
      @close="closeModal"
      :data="movieData"
      :isNew="isNewMovie"
    />

    <!-- Search Bar -->
    <Components.Search @searching="handleSearchUpdate" />

    <!-- Movies Cards -->
    <div class="movie-card-container">
      <div
        v-for="movie in filteredMovies"
        :key="movie.id"
        class="movie-card-wrapper"
      >
        <Components.MovieCard
          :data="movie"
          @update="toggleManageModal(movie, false)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-card-container {
  display: grid;
  gap: 1rem;
  justify-content: center;
}

/* One column on small screens */
@media (max-width: 599px) {
  .movie-card-container {
    grid-template-columns: 1fr;
  }
}

/* Two columns on medium screens */
@media (min-width: 600px) and (max-width: 1023px) {
  .movie-card-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Three columns on larger screens */
@media (min-width: 1024px) {
  .movie-card-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

.movie-card-wrapper {
  display: flex;
  justify-content: center;
}
</style>
