import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useJoke } from '../../src/composables/useJoke';
import { JokeService } from '../../src/services/JokeService';


vi.mock('../../src/services/JokeService');

describe('useJoke', () => {
  let jokeServiceMock: any;

  beforeEach(() => {
    jokeServiceMock = new JokeService();
    vi.mocked(JokeService).mockImplementation(() => jokeServiceMock);
  });

  it('should fetch a joke and update state', async () => {
    const mockJoke = { id: '1', setup: 'Setup', delivery: 'Delivery' };
    jokeServiceMock.fetchJoke = vi.fn().mockResolvedValue(mockJoke);

    const { joke, error, fetchJoke } = useJoke();
    await fetchJoke();

    expect(joke.value).toEqual(mockJoke);
    expect(error.value).toBeNull();
  });

  it('should set an error message if fetching a joke fails', async () => {
    jokeServiceMock.fetchJoke = vi.fn().mockRejectedValue(new Error('Failed to fetch joke'));

    const { joke, error, fetchJoke } = useJoke();
    await fetchJoke();

    expect(joke.value).toBeNull();
    expect(error.value).toBe('Failed to fetch joke');
  });
});
