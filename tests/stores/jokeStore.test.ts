import { setActivePinia, createPinia } from 'pinia';
import { useJokeStore } from '../../src/stores/jokeStore';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';

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
    await store.fetchJoke();

    expect(store.joke).toEqual(mockJoke);
    expect(store.error).toBeNull();
  });

  it('should set an error if the API returns an error', async () => {
    const errorMessage = 'Unknown error occurred';
    mockedAxios.get.mockResolvedValue({ data: { error: true, message: errorMessage } });

    const store = useJokeStore();
    await store.fetchJoke();

    expect(store.joke).toBeNull();
    expect(store.error).toBe(errorMessage);
  });

  it('should set an error if the request fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    const store = useJokeStore();
    await store.fetchJoke();

    expect(store.joke).toBeNull();
    expect(store.error).toBe('Unknown error occurred');
  });
});
