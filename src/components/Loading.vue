<script setup>
import LoadingGif from '@/assets/loading.gif';
</script>

<template>
  <div id="loading">
    <img class="img" :src="LoadingGif" alt="loading..." width="200" />
  </div>
</template>

<style>
#loading {
  height: 100vh;
  width: 100vw;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img {
  height: auto;
}
</style>
