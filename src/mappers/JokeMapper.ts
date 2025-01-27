import { Joke } from '../models/Joke';

// Définition du type du DTO renvoyé par l'API
interface JokeDto {
  id: number;
  setup?: string;
  joke?: string;
  delivery?: string;
}

// Mapper pour convertir le DTO en un objet Joke
export const jokeDtoToJoke = (jokeDto: JokeDto): Joke => {
  return {
    id: jokeDto.id,
    setup: jokeDto.setup ? jokeDto.setup : jokeDto.joke || '', // Ternaire pour choisir setup ou joke
    delivery: jokeDto.delivery ?? '', // Valeur par défaut si delivery est null ou undefined
  };
};
