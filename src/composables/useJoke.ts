import { useJokeService } from '../services/UseJokeService';
import { useJokeStore } from '../stores/JokeStore';

export const useJoke = () => {
  const { getJokeService } = useJokeService();
  const { setJoke } = useJokeStore();

  const getJoke = async () => {
    try {
      const joke = await getJokeService();
      setJoke(joke); // Mise à jour de l’état via le store
    } catch (error: any) {
      console.error('Error fetching joke:', error.message);
    }
  };

  return { getJoke };
};
