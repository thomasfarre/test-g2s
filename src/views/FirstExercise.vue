<template>
  <div class="container">
    <h1 class="title">Exercice 1</h1>
    <p class="description">Centrer le texte vert dans le carré jaune. Ajouter un champ texte permettant de modifier le texte vert à la volée.</p>
    <CenteredText />
  </div>
</template>

<script setup lang="ts">
import CenteredText from "../components/CenteredText.vue";
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 2em;
  font-weight: bold;
}

.description {
  font-size: 1em;
  font-weight: normal;
  text-align: center;
}

</style>
