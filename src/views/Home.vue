<script setup lang="ts">
</script>

<template>
  <div class="container">
    <h1 class="description">
      Ce projet est un test technique pour G2S. Il comprend trois exercices :
    </h1>
    <ul class="exercises">
      <li><strong>Exercice 1 :</strong> Centrer le texte vert dans le carré jaune. Ajouter un champ de texte pour modifier le texte vert à la volée.</li>
      <li><strong>Exercice 2 :</strong> Au clic sur un bouton, afficher une blague aléatoire en utilisant l'API https://jokeapi.dev/. Afficher d'abord la question de la blague, puis après un délai de 5 secondes, afficher la réponse.</li>
      <li><strong>Exercice 3 :</strong> Utiliser l'API fictive https://jsonplaceholder.typicode.com/ pour afficher une liste de publications. Ajouter un formulaire pour créer une nouvelle publication, afficher les détails de la publication lorsqu'elle est sélectionnée, et permettre la mise à jour et la suppression des publications.</li>
    </ul>
    <p class="description">
      Pour plus de détails, visitez le <a href="https://github.com/thomasfarre/test-g2s">dépôt GitHub</a>.
    </p>
    <p class="description">
      J'ai créé ce projet sur GitHub et l'ai déployé car j'ai eu du mal à modifier la configuration sur CodeSandbox pour ajouter des tests à mon rendu d'exercice. J'avais à cœur de réaliser le test le mieux possible, aucun prétention de ma part. J'espère que cela vous convienne !
    </p>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 8rem;
}

.title {
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.2em;
  margin-bottom: 1rem;
}

.exercises {
  text-align: left;
  margin: 0 auto;
  list-style-type: none;
  padding: 0;
}

.exercises li {
  margin-bottom: 1rem;
}

.exercises strong {
  font-weight: bold;
}
</style>
