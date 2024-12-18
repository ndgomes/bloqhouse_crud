<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Components from '@/components';
import { useToast } from 'vue-toastification';

const toast = useToast();
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
  if (props.movies.length >= 15) {
    toast.error(
      `It's not possible to add more than 15 movies. Please delete one first.`
    );
    return;
  }

  document.body.style.overflow = 'hidden';
  showAddModal.value = true;
}

function closeAddModal() {
  document.body.style.overflow = 'auto';
  showAddModal.value = false;
}
</script>

<template>
  <div>
    <!-- Load Modal Component to Add or Update a Movie -->
    <Components.AddModal v-if="showAddModal" @close="closeAddModal" />

    <!-- Header with Add Movie Button -->
    <Components.Header @clickAction="openAddModal" :withBackButton="false" />

    <!-- Search Bar -->
    <Components.Search @searching="handleSearchUpdate" />

    <!-- Movies count -->
    <p class="movie-count">
      <strong>Movies:</strong>
      {{ filteredMovies.length }}/<span>15</span>
    </p>

    <!-- Movies Cards -->
    <div class="movie-card-container">
      <div
        class="movie-card-wrapper"
        v-for="movie in filteredMovies"
        :key="movie.id"
      >
        <Components.MovieCard
          :data="movie"
          @clickCard="handleOnClickCard(movie.id)"
        />
      </div>

      <div v-if="filteredMovies.length === 0">
        <p>The movie was not found. Try searching for another movie.</p>
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

.movie-count {
  margin: 0 0.5rem 1rem 0;
  font-size: 1rem;
  color: rgb(113, 113, 113);
  display: flex;
  justify-content: flex-end;
}

.movie-count span {
  color: #ec0c5c;
}

.movie-count strong {
  margin-right: 0.3rem;
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
