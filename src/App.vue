<script setup>
import { ref, onMounted } from 'vue';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/firebase';
import Home from './screens/Home.vue';

const db_movies = ref([]);

onMounted(async () => {
  const moviesCollection = await getDocs(collection(db, 'movies'));

  moviesCollection.forEach((movie) => {
    db_movies.value.push({ ...movie.data(), id: movie.id });
  });
});
</script>

<template>
  <main>
    <Home :movies="db_movies" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
