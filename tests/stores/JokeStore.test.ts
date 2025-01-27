import { setActivePinia, createPinia } from 'pinia';
import { useJokeStore } from '../../src/stores/JokeStore';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import { useJokeService } from '../../src/services/UseJokeService';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('jokeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should fetch a joke and update the store', async () => {
    const mockJoke = { id: '1', setup: 'Why did the chicken cross the road?', delivery: 'To get to the other side!' };
    mockedAxios.get.mockResolvedValue({ data: mockJoke });

    const store = useJokeStore();
    const { getJokeService } = useJokeService();
    const joke = await getJokeService();
    store.setJoke(joke);

    expect(store.joke).toEqual(mockJoke);
  });

  it('should handle API errors gracefully', async () => {
    const errorMessage = 'Unknown error occurred';
    mockedAxios.get.mockResolvedValue({ data: { error: true, message: errorMessage } });

    const store = useJokeStore();
    const { getJokeService } = useJokeService();
    try {
      await getJokeService();
    } catch (error) {
      store.setJoke(null);
    }

    expect(store.joke).toBeNull();
  });

  it('should handle network errors gracefully', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    const store = useJokeStore();
    const { getJokeService } = useJokeService();
    try {
      await getJokeService();
    } catch (error) {
      store.setJoke(null);
    }

    expect(store.joke).toBeNull();
  });
});
