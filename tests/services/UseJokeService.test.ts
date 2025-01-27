import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { useJokeService } from '../../src/services/UseJokeService';
import { Joke } from '../../src/models/Joke';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('useJokeService', () => {
  const { getJokeService } = useJokeService();

  it('should fetch a joke successfully', async () => {
    const mockApiResponse = { id: '1', setup: 'Why did the chicken cross the road?', delivery: 'To get to the other side!' };
    const expectedJoke: Joke = { id: '1', setup: 'Why did the chicken cross the road?', delivery: 'To get to the other side!' };
    mockedAxios.get.mockResolvedValue({ data: mockApiResponse });

    const joke = await getJokeService();
    expect(joke).toEqual(expectedJoke);
  });

  it('should throw an error if the API returns an error', async () => {
    const errorMessage = 'Unknown error occurred';
    mockedAxios.get.mockResolvedValue({ data: { error: true, message: errorMessage } });

    await expect(getJokeService()).rejects.toThrow(errorMessage);
  });

  it('should throw an error if the request fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    await expect(getJokeService()).rejects.toThrow('Unknown error occurred');
  });
});
