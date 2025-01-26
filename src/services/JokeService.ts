import axios from 'axios';
import { Joke } from '../interfaces/Joke';
import { JOKE_API_URL } from '../constants';

export class JokeService {
  private cache: Map<string, Joke> = new Map();

  async fetchJoke(): Promise<Joke> {
    try {
      const response = await axios.get(JOKE_API_URL);
      if (response.data.error) {
        throw new Error(response.data.message || 'Unknown error occurred');
      }
      const joke: Joke = response.data;
      this.cache.set(joke.id, joke);
      return joke;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch joke');
    }
  }

  getCachedJoke(id: string): Joke | undefined {
    return this.cache.get(id);
  }
}
