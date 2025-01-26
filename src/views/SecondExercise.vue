<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { useJoke } from '../composables/useJoke';

const { joke, error, fetchJoke } = useJoke();
const showDelivery = ref(false);
const countdown = ref(5);
let countdownInterval: number | undefined;

const getJoke = async () => {
  await fetchJoke();
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
});
</script>

<template>
  <div class="container">
    <h1 class="title">Exercice 2</h1>
    <p class="description">Au clic sur un nouveau bouton, afficher une blague aléatoire en utilisant l'api https://jokeapi.dev/. Afficher la question de la blague puis après un temps d'attente de 5 secondes afficher la réponse. NB : L'affichage (disposition, transition,..) est laissé libre.</p>
    <button @click="getJoke">Obtenir une blague</button>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="joke" class="joke-container">
      <p>{{ joke.setup }}</p>
      <p v-if="!showDelivery">Réponse dans: {{ countdown }} secondes</p>
      <p v-if="showDelivery">{{ joke.delivery }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 2em;
  font-weight: bold;
}

.description {
  font-size: 1em;
  font-weight: normal;
  text-align: center;
}

button {
  margin: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.joke-container {
  text-align: center;
  margin-top: 2rem;
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 1rem;
}
</style>
