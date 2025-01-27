<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { useJokeStore } from '../stores/jokeStore';

// Utilisation du store pour accéder aux blagues et aux erreurs
const jokeStore = useJokeStore();
const showDelivery = ref(false);  // État pour contrôler l'affichage de la réponse
const countdown = ref(5);  // Compteur pour le délai avant l'affichage de la réponse
let countdownInterval: number | undefined;

// Fonction pour obtenir une nouvelle blague et démarrer le compte à rebours
const getJoke = async () => {
  await jokeStore.fetchJoke();  // Récupération de la blague via le store
  showDelivery.value = false;  // Masquer la réponse initialement
  countdown.value = 5;  // Réinitialiser le compteur
  startCountdown();  // Démarrer le compte à rebours
};

// Fonction pour gérer le compte à rebours
const startCountdown = () => {
  clearInterval(countdownInterval);  // Nettoyer tout intervalle existant
  countdownInterval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;  // Décrémenter le compteur
    } else {
      showDelivery.value = true;  // Afficher la réponse une fois le temps écoulé
      clearInterval(countdownInterval);  // Arrêter le compte à rebours
    }
  }, 1000);
};

// Nettoyer l'intervalle lors du démontage du composant
onUnmounted(() => {
  clearInterval(countdownInterval);
});
</script>

<template>
  <div class="container">
    <h1 class="title">Exercice 2</h1>
    <p class="description">Au clic sur un nouveau bouton, afficher une blague aléatoire en utilisant l'api https://jokeapi.dev/. Afficher la question de la blague puis après un temps d'attente de 5 secondes afficher la réponse. NB : L'affichage (disposition, transition,..) est laissé libre.</p>
    <button @click="getJoke">Obtenir une blague</button>
    <div v-if="jokeStore.error" class="error">{{ jokeStore.error }}</div>
    <div v-if="jokeStore.joke" class="joke-container">
      <p>{{ jokeStore.joke.setup }}</p>
      <p v-if="!showDelivery">Réponse dans: {{ countdown }} secondes</p>
      <p v-if="showDelivery">{{ jokeStore.joke.delivery }}</p>
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
