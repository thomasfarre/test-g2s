import { ref } from 'vue';
import { JokeService } from '../services/JokeService';
import { Joke } from '../interfaces/Joke';

export function useJoke() {
  const jokeService = new JokeService();
  const joke = ref<Joke | null>(null);
  const error = ref<string | null>(null);

  const fetchJoke = async () => {
    try {
      joke.value = await jokeService.fetchJoke();
      error.value = null;
    } catch (err: any) {
      error.value = err.message || 'Oups... sorry';
    }
  };

  return { joke, error, fetchJoke };
}
