<script setup>
import { Undo2, SquarePlus } from 'lucide-vue-next';

const emit = defineEmits(['clickAction']);

const props = defineProps({
  withBackButton: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <header>
    <p><span>bloq</span>Movies</p>

    <div class="separator-vertical" />

    <button @click="emit('clickAction')">
      <component :is="props.withBackButton ? Undo2 : SquarePlus" />
      {{ props.withBackButton ? 'Back' : 'Add Movie' }}
    </button>
  </header>

  <div class="separator" />
</template>

<style scoped>
header {
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
}

button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #ec0c5c;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  width: auto;
  margin: 0;
}

button:hover {
  background-color: #d80b53;
}

p {
  color: slategray;
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

span {
  color: #ec0c5c;
}

.separator-vertical {
  width: 0.05rem;
  height: 2rem;
  background-color: slategray;
  margin: 0 1rem;
}

.separator {
  height: 0.05rem;
  background-color: slategray;
  margin: 1rem 0 1.5rem;
}

@media (max-width: 599px) {
  p {
    font-size: 1.5rem;
  }

  button {
    font-size: 0.75rem;
  }
}
</style>
