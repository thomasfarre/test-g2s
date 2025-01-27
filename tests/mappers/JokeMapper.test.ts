import { describe, it, expect } from 'vitest';
import { jokeDtoToJoke } from '../../src/mappers/JokeMapper';
import { Joke } from '../../src/models/Joke';

describe('jokeDtoToJoke', () => {
  it('should map JokeDto with setup to Joke correctly', () => {
    const jokeDto = { id: '1', setup: 'Why did the chicken cross the road?', delivery: 'To get to the other side!' };
    const expectedJoke: Joke = { id: '1', setup: 'Why did the chicken cross the road?', delivery: 'To get to the other side!' };

    const joke = jokeDtoToJoke(jokeDto);

    expect(joke).toEqual(expectedJoke);
  });

  it('should map JokeDto with joke to Joke correctly', () => {
    const jokeDto = { id: '2', joke: 'Why did the scarecrow win an award?', delivery: 'Because he was outstanding in his field!' };
    const expectedJoke: Joke = { id: '2', setup: 'Why did the scarecrow win an award?', delivery: 'Because he was outstanding in his field!' };

    const joke = jokeDtoToJoke(jokeDto);

    expect(joke).toEqual(expectedJoke);
  });

  it('should handle JokeDto with missing delivery', () => {
    const jokeDto = { id: '3', setup: 'Why did the chicken cross the playground?' };
    const expectedJoke: Joke = { id: '3', setup: 'Why did the chicken cross the playground?', delivery: '' };

    const joke = jokeDtoToJoke(jokeDto);

    expect(joke).toEqual(expectedJoke);
  });

  it('should handle JokeDto with missing setup and joke', () => {
    const jokeDto = { id: '4', delivery: 'To get to the other slide!' };
    const expectedJoke: Joke = { id: '4', setup: '', delivery: 'To get to the other slide!' };

    const joke = jokeDtoToJoke(jokeDto);

    expect(joke).toEqual(expectedJoke);
  });
});
