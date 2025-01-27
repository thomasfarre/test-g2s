import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Joke } from '../models/Joke';

export const useJokeStore = defineStore('joke', () => {
  const joke = ref<Joke | null>(null); // État réactif pour la blague actuelle

  const setJoke = (newJoke: Joke) => {
    joke.value = newJoke;
  };

  const jokeText = computed(() => (joke.value ? joke.value.setup : 'Aucune blague disponible'));

  return { joke, setJoke, jokeText };
});
