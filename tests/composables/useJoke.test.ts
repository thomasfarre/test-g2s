import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useJoke } from '../../src/composables/useJoke';
import { useJokeStore } from '../../src/stores/JokeStore';
import axios from 'axios';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('useJoke composable', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should fetch a joke and update the store', async () => {
    const mockJoke = { id: '1', setup: 'Why did the chicken cross the road?', delivery: 'To get to the other side!' };
    mockedAxios.get.mockResolvedValue({ data: mockJoke });

    const { getJoke } = useJoke();
    const store = useJokeStore();
    await getJoke();

    expect(store.joke).toEqual(mockJoke);
  });

  it('should handle API errors gracefully', async () => {
    const errorMessage = 'Unknown error occurred';
    mockedAxios.get.mockResolvedValue({ data: { error: true, message: errorMessage } });

    const { getJoke } = useJoke();
    const store = useJokeStore();
    await getJoke();

    expect(store.joke).toBeNull();
  });

  it('should handle network errors gracefully', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    const { getJoke } = useJoke();
    const store = useJokeStore();
    await getJoke();

    expect(store.joke).toBeNull();
  });
});
