<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { useJoke } from '../composables/useJoke';
import { useJokeStore } from '../stores/JokeStore';

// Utilisation du store pour accéder aux blagues
const jokeStore = useJokeStore();
const { getJoke } = useJoke(); // Utilisation du composable pour obtenir une blague
const showDelivery = ref(false);  // État pour contrôler l'affichage de la réponse
const countdown = ref(5);  // Compteur pour le délai avant l'affichage de la réponse
let countdownInterval: number | undefined;

// Fonction pour obtenir une nouvelle blague et démarrer le compte à rebours
const fetchJoke = async () => {
  await getJoke();  // Récupération de la blague via le composable
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
  jokeStore.joke = null;
});
</script>

<template>
  <div class="exercise exercise--second">
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
