<script setup>
import { ref } from 'vue';
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

    <!-- Movies Cards -->
    <div v-for="movie in movies" :key="movie.id">
      <p>Title: {{ movie.title }}</p>
      <p>Description:{{ movie.description }}</p>
      <button @click="toggleManageModal(movie, false)">Update Movie</button>
      <br />
    </div>
  </div>
</template>
