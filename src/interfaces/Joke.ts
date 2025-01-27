// Interface représentant une blague
export interface Joke {
  id: string;        // Identifiant unique de la blague
  setup: string;     // Texte de la question ou de l'introduction de la blague
  delivery: string;  // Texte de la réponse ou de la conclusion de la blague
}
