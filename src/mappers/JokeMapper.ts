import { Joke } from '../models/Joke';
interface JokeDto {
  id: number;
  setup?: string;
  joke?: string;
  delivery?: string;
}

export const jokeDtoToJoke = (jokeDto: JokeDto): Joke => {
  return {
    id: jokeDto.id,
    setup: jokeDto.setup ? jokeDto.setup : jokeDto.joke || '',
    delivery: jokeDto.delivery ?? '',
  };
};
