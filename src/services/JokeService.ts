import axios from 'axios';
import { Joke } from '../interfaces/Joke';
import { JOKE_API_URL } from '../constants';

// Mapper pour transformer les données de l'API en une blague utilisable
function mapToJoke(data: any): Joke {
  return {
    id: data.id,
    setup: data.setup || data.joke || '', // 'setup' pour une blague à deux parties, 'joke' pour une blague à une seule partie
    delivery: data.delivery || '',        // 'delivery' sera vide si ce n'est pas une blague à deux parties
  };
}

// Fonction pour récupérer une blague
export async function fetchJoke(): Promise<Joke> {
  try {
    // Appel à l'API pour récupérer les données
    const response = await axios.get(JOKE_API_URL);

    // Vérification simple si l'API retourne une erreur
    if (response.data.error) {
      throw new Error(response.data.message || 'Unknown error occurred');
    }

    // Transformation des données via le mapper
    const joke = mapToJoke(response.data);
    return joke;
  } catch (error: any) {
    // Gestion des erreurs : retourne un message clair
    throw new Error(error.response?.data?.message || 'Unknown error occurred');
  }
}
