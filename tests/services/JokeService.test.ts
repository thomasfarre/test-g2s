import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import { JokeService } from '../../src/services/JokeService';
import { Joke } from '../../src/interfaces/Joke';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('JokeService', () => {
  let jokeService: JokeService;

  beforeEach(() => {
    jokeService = new JokeService();
  });

  it('should fetch a joke successfully', async () => {
    const mockJoke: Joke = { id: '1', setup: 'Why did the chicken cross the road?', delivery: 'To get to the other side!' };
    mockedAxios.get.mockResolvedValue({ data: mockJoke });

    const joke = await jokeService.fetchJoke();
    expect(joke).toEqual(mockJoke);
  });

  it('should throw an error if the API returns an error', async () => {
    const errorMessage = 'Failed to fetch joke';
    mockedAxios.get.mockResolvedValue({ data: { error: true, message: errorMessage } });

    await expect(jokeService.fetchJoke()).rejects.toThrow(errorMessage);
  });

  it('should throw an error if the request fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    await expect(jokeService.fetchJoke()).rejects.toThrow('Failed to fetch joke');
  });
});
