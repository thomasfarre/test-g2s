import axios from 'axios';
import { Joke } from '../models/Joke';
import { jokeDtoToJoke } from '../mappers/JokeMapper';
import { JOKE_API_URL } from '../constants';

export const useJokeService = () => {
  const getJokeService = async (): Promise<Joke> => {
    try {
      const response = await axios.get(JOKE_API_URL);

      if (response.data.error) {
        throw new Error(response.data.message || 'Unknown error occurred');
      }

      // Transformation des données avec le mapper
      return jokeDtoToJoke(response.data);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Unknown error occurred');
    }
  };

  return { getJokeService };
};
