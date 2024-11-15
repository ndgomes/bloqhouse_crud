<script setup>
import { Search } from 'lucide-vue-next';
import { ref } from 'vue';

const inputValue = ref('');
const emit = defineEmits(['searching']);

function handleInputChange(event) {
  emit('searching', event.target.value);
}
</script>

<template>
  <div class="search-container">
    <Search />
    <input
      type="text"
      placeholder="Search for a movie..."
      :value="inputValue"
      @input="handleInputChange"
      max="80"
    />
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
  background-color: rgb(211, 211, 211);
  border-radius: 2rem;
  width: fit-content;
  padding: 0.5rem 1rem;
  color: rgb(113, 113, 113);
  width: auto;
}

input {
  border: none;
  outline: none;
  background-color: transparent;
  color: rgb(113, 113, 113);
  font-size: 1.2rem;
  width: 100%;
}
</style>
