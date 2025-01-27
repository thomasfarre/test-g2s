import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import { fetchJoke } from '../../src/services/JokeService';
import { Joke } from '../../src/interfaces/Joke';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('JokeService', () => {
  it('should fetch a joke successfully', async () => {
    const mockApiResponse = { id: '1', setup: 'Why did the chicken cross the road?', delivery: 'To get to the other side!' };
    const expectedJoke: Joke = { id: '1', setup: 'Why did the chicken cross the road?', delivery: 'To get to the other side!' };
    mockedAxios.get.mockResolvedValue({ data: mockApiResponse });

    const joke = await fetchJoke();
    expect(joke).toEqual(expectedJoke);
  });

  it('should throw an error if the API returns an error', async () => {
    const errorMessage = 'Unknown error occurred';
    mockedAxios.get.mockResolvedValue({ data: { error: true, message: errorMessage } });

    await expect(fetchJoke()).rejects.toThrow(errorMessage);
  });

  it('should throw an error if the request fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    await expect(fetchJoke()).rejects.toThrow('Unknown error occurred');
  });
});
