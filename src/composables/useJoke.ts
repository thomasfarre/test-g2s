import { useJokeService } from '../services/UseJokeService';
import { useJokeStore } from '../stores/JokeStore';

export const useJoke = () => {
  const { getJokeService } = useJokeService();
  const { setJoke } = useJokeStore();

  const getJoke = async () => {
    try {
      const joke = await getJokeService();
      setJoke(joke);
    } catch (error: any) {
      console.error('Error fetching joke:', error.message);
    }
  };

  return { getJoke };
};
