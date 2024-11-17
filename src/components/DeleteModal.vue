<script setup>
import { onMounted } from 'vue';
import { X, ThumbsDown, ThumbsUp } from 'lucide-vue-next';

const emit = defineEmits(['close, confirmDelete']);

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <transition name="modal">
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Are you sure you want to delete this movie?</h2>
          <button class="close-button" @click="emit('close')"><X /></button>
        </div>

        <div class="modal-buttons">
          <button class="no-button" @click="emit('close')">
            <ThumbsDown />
            No
          </button>
          <button
            @click="emit('confirmDelete')"
            data-testid="confirm-delete-movie"
          >
            <ThumbsUp />
            Yes
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-overlay {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  width: 90vw;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
}

.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  width: auto;
  padding: 0;
  margin: 0;
}

h2 {
  color: #333;
  text-align: center;
  margin-right: auto;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
}

.modal-buttons button {
  background-color: #ec0c5c;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: solid 1px #ec0c5c;
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem;
}

.modal-buttons button:hover {
  background-color: white;
  color: #ec0c5c;
  border: solid 1px #ec0c5c;
}

.modal-buttons .no-button {
  background-color: white;
  color: #ec0c5c;
}

.modal-buttons .no-button:hover {
  background-color: #ec0c5c;
  color: white;
}

/* Responsive */
@media (min-width: 768px) {
  .modal-container {
    width: 60vw;
    max-width: 600px;
  }
}

@media (min-width: 1024px) {
  .modal-container {
    width: 40vw;
  }
}
</style>
