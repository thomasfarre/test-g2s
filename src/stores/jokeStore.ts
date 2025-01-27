import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchJoke } from '../services/JokeService';
import { Joke } from '../interfaces/Joke';

// Définition d'un store Pinia pour gérer l'état des blagues
export const useJokeStore = defineStore('joke', () => {
  const joke = ref<Joke | null>(null);  // État réactif pour stocker la blague actuelle
  const error = ref<string | null>(null);  // État réactif pour stocker les erreurs éventuelles

  // Fonction pour récupérer une blague depuis le service
  const fetchJokeData = async () => {
    try {
      joke.value = await fetchJoke();  // Appel au service pour obtenir une blague
      error.value = null;  // Réinitialisation de l'erreur en cas de succès
    } catch (err: any) {
      error.value = err.message || 'Oups... sorry';  // Stockage du message d'erreur
    }
  };

  // Retourne les états et la fonction pour être utilisés dans les composants
  return { joke, error, fetchJoke: fetchJokeData };
});
