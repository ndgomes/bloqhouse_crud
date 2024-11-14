<script setup>
import LoadingGif from '@/assets/loading.gif';
</script>

<template>
  <div id="loading">
    <img class="img" :src="LoadingGif" alt="loading..." />
  </div>
</template>

<style scoped>
#loading {
  height: calc(100vh - 2rem);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.img {
  width: 50vw;
  max-width: 200px;
  height: auto;
}

@media (min-width: 768px) {
  .img {
    width: 20vw;
    max-width: 150px;
  }
}

@media (min-width: 1200px) {
  .img {
    width: 10vw;
    max-width: 120px;
  }
}
</style>
