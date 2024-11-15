<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Components from '@/components';

const router = useRouter();

const props = defineProps({
  movies: {
    type: Array,
    required: true,
  },
});

const showAddModal = ref(false);
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

function handleOnClickCard(id) {
  router.push(`/${id}`);
}

function openAddModal() {
  showAddModal.value = true;
}

function closeAddModal() {
  showAddModal.value = false;
}
</script>

<template>
  <div>
    <!-- Load Modal Component to Add or Update a Movie -->
    <Components.AddMovieModal v-if="showAddModal" @close="closeAddModal" />

    <!-- Header with Add Movie Button -->
    <Components.Header @clickAction="openAddModal" :withBackButton="false" />

    <!-- Search Bar -->
    <Components.Search @searching="handleSearchUpdate" />

    <!-- Movies Cards -->
    <div class="movie-card-container">
      <div
        class="movie-card-wrapper"
        v-for="movie in filteredMovies"
        :key="movie.id"
      >
        <!-- @clickCard="toggleManageModal(movie, false)" -->
        <Components.MovieCard
          :data="movie"
          @clickCard="handleOnClickCard(movie.id)"
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

.movie-card-wrapper {
  display: flex;
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
</style>
