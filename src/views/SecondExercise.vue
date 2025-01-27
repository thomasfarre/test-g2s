<template>
  <div class="exercise">
    <h1 class="exercise__title">Exercice 2</h1>
    <p class="exercise__description">Au clic sur un nouveau bouton, afficher une blague aléatoire en utilisant l'api https://jokeapi.dev/. Afficher la question de la blague puis après un temps d'attente de 5 secondes afficher la réponse. NB : L'affichage (disposition, transition,..) est laissé libre.</p>
    <button class="exercise__button" @click="fetchJoke">Obtenir une blague</button>
    <div v-if="jokeStore.joke" class="exercise__joke-container">
      <p>{{ jokeStore.joke.setup }}</p>
      <p v-if="!showDelivery">Réponse dans: {{ countdown }} secondes</p>
      <p v-if="showDelivery">{{ jokeStore.joke.delivery }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { useJoke } from '../composables/useJoke';
import { useJokeStore } from '../stores/JokeStore';

const jokeStore = useJokeStore();
const { getJoke } = useJoke();
const showDelivery = ref(false);
const countdown = ref(5);
let countdownInterval: number | undefined;

const fetchJoke = async () => {
  await getJoke();
  showDelivery.value = false;
  countdown.value = 5;
  startCountdown();
};

const startCountdown = () => {
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      showDelivery.value = true;
      clearInterval(countdownInterval);
    }
  }, 1000);
};

onUnmounted(() => {
  clearInterval(countdownInterval);
  jokeStore.joke = null;
});
</script>

<style scoped>
.exercise {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.exercise__title {
  font-size: 2.5em;
  font-weight: bold;
  color: #007bff;
}

.exercise__description {
  font-size: 1.2em;
  text-align: center;
  color: #555;
}

.exercise__button {
  margin: 1rem;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
}

.exercise__button:hover {
  background-color: #0056b3;
}

.exercise__joke-container {
  text-align: center;
  margin-top: 2rem;
  color: #333;
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 1rem;
}
</style>
