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
      Pour plus de détails, visitez le <a href="https://github.com/thomasfarre/test-g2s">dépôt GitHub</a>.
    </p>
    <p class="home__description">
      J'ai créé ce projet sur GitHub et l'ai déployé car j'ai eu du mal à modifier la configuration sur CodeSandbox pour ajouter des tests à mon rendu d'exercice. J'avais à cœur de réaliser le test le mieux possible, aucun prétention de ma part. J'espère que cela vous convienne !
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
  margin-bottom: 1.5rem;
  font-size: 1.2em;
  color: #555;
}
</style>
