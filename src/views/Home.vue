<script setup lang="ts">
</script>

<template>
  <div class="home">
    <h1 class="home__title">Ce projet est un test technique pour G2S. Il comprend trois exercices :</h1>
    <ul class="home__exercises">
      <li class="home__exercise"><strong>Exercice 1 :</strong> Centrer le texte vert dans le carré jaune. Ajouter un champ de texte pour modifier le texte vert à la volée.</li>
      <li class="home__exercise"><strong>Exercice 2 :</strong> Au clic sur un bouton, afficher une blague aléatoire en utilisant l'API https://jokeapi.dev/. Afficher d'abord la question de la blague, puis après un délai de 5 secondes, afficher la réponse.</li>
      <li class="home__exercise"><strong>Exercice 3 :</strong> Utiliser l'API fictive https://jsonplaceholder.typicode.com/ pour afficher une liste de publications. Ajouter un formulaire pour créer une nouvelle publication, afficher les détails de la publication lorsqu'elle est sélectionnée, et permettre la mise à jour et la suppression des publications.</li>
    </ul>
    <p class="home__description">
      Pour plus de détails <a href="https://github.com/thomasfarre/test-g2s">GitHub repo</a>.
    </p>
    <p class="home__description">
      J'ai créé ce projet sur GitHub car j'ai eu du mal à modifier la configuration sur CodeSandbox pour ajouter des tests unitaires (Vitest, Vue Test Utils, Jest etc...). <br> J'avais à cœur de réaliser le test le mieux possible, aucune prétentions de ma part. J'espère que cela vous convient
    </p>
    <p class="home__description">
      De manière générale pour réaliser ce test technique
    </p>
    <ul class="home__list">
      <li class="home__list-item">
        J'ai essayé de coller le plus possible à l'architecture de l'entreprise tel que je l'ai comprise (hexagonale, fonction englobantes etc...)
      </li>
      <li class="home__list-item">
        Fait très peu de CSS, mais respecté la méthodologie BEM
      </li>
      <li class="home__list-item">
        Ecrit des tests unitaires pour pas mal de choses, composants, store etc...
      </li>
    </ul>
    <p class="home__description">
      Ce que j'ai fais est largement perfectible, mais je pense que cela donne une idée de ce que je suis capable de faire et j'espère pouvoir vous apporter ma contribution et avoir la chance de continuer d'apprendre avec vous. Merci d'avance pour le temps que vous passerez à lire ce test technique !
    </p>
  </div>
</template>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.home__title {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
}

.home__description {
  font-size: 1.5em;
  margin-bottom: 1.5rem;
  color: #333;
}

.home__exercises {
  list-style-type: none;
  padding: 0;
}

.home__exercise {
  margin-bottom: 2rem; /* Increased margin for more vertical space */
  font-size: 1.2em;
  color: #555;
}

.home__list-item {
  margin-bottom: 1rem; /* Added margin for vertical space between list items */
}
</style>
