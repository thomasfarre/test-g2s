<template>
  <div class="exercise">
    <h1 class="exercise__title">
      Exercice 1
    </h1>
    <p class="exercise__description">
      Centrer le texte vert dans le carré jaune. Ajouter un champ texte permettant de modifier le texte vert à la volée.
    </p>
    <CenteredText />
  </div>
</template>

<script setup lang="ts">
import CenteredText from "../components/CenteredText.vue";

</script>

<style scoped>
.exercise {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.exercise__title {
  font-size: 2.5em;
  font-weight: bold;
  color: #007bff;
}

.exercise__description {
  font-size: 1.2em;
  text-align: center;
  color: #555;
}

.exercise__input {
  margin-top: 1rem;
  padding: 0.5rem;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
}
</style>
