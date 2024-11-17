<script setup>
import { Analytics } from '@vercel/analytics/vue';
import { ref, onMounted } from 'vue';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/firebase';
import Views from '@/views';
import Components from '@/components';

const isLoading = ref(true);
const db_movies = ref([]);

onMounted(async () => {
  const moviesCollection = await getDocs(collection(db, 'movies'));

  moviesCollection.forEach((movie) => {
    db_movies.value.push({ ...movie.data(), id: movie.id });
  });

  // Timeout to simulate a loading state - 1sec
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>

<template>
  <Analytics />

  <main>
    <Components.Loading v-if="isLoading" />

    <router-view v-else :movies="db_movies" />
  </main>
</template>
