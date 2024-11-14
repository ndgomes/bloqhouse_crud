<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update']);
</script>

<template>
  <div class="movie-card" @click="emit('update')">
    <img
      class="cover-image"
      :src="props.data.coverImage"
      alt="movie cover image"
    />

    <div class="movie-info">
      <h3 class="title">{{ props.data.title }}</h3>
      <p class="genre">
        {{ props.data.genre.join(', ') }}
      </p>
      <p class="rating-year">
        ⭐ {{ props.data.rating }}/10 | {{ props.data.releaseYear }}
      </p>
      <p class="description">{{ props.data.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 0 1rem 1rem;
  border-radius: 1rem;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  height: 45rem;
  overflow-y: auto;
}

.movie-card:hover {
  transform: scale(1.02);
}

.cover-image {
  min-height: 60%;
  background-size: cover;
  background-position: center;
}

.movie-info {
  min-height: 30%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.genre {
  font-size: 1rem;
  font-weight: 600;
  color: #666;
  margin: 0;
}

.rating-year {
  font-size: 1rem;
  color: #ffcc00;
  font-weight: bold;
  margin: 0.5rem 0;
}

.description {
  font-size: 1rem;
  color: #555;
  line-height: 1.4;
  margin: 0;
}

.edit-button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  background-color: #ec0c5c;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  border-radius: 0 0 1rem 1rem;
}

.edit-button:hover {
  background-color: #d80b53;
}

/* Responsive width */
@media (min-width: 600px) {
  .movie-card {
    width: 40vw;
  }
}

@media (min-width: 1024px) {
  .movie-card {
    width: 25vw;
  }
}
</style>
