<template>
  <div class="center-text">
    <input v-model="text" type="text" placeholder="Modifier le texte" class="center-text__input" />
    <div class="center-text__wrapper">
      <span class="center-text__text">{{ text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const text = ref("Center me");
</script>

<style scoped>
.center-text {
  padding-top: 4em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}

.center-text__wrapper {
  background: yellow;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-text__text {
  background: green;
  color: white;
  padding: 0.2em;
}

.center-text__input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}
</style>
