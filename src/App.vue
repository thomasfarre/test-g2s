<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <a href="https://github.com/thomasfarre/test-g2s" target="_blank">Github repo</a>
    <nav>
      <RouterLink to="/">Accueil</RouterLink> |
      <RouterLink to="/first-exercise">Exercice 1</RouterLink> |
      <RouterLink to="/second-exercise">Exercice 2</RouterLink> |
      <RouterLink to="/third-exercise">Exercice 3</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 1rem;
}

nav {
  margin-left: 40px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 0 1rem;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #1d6f93;
}

nav a.router-link-exact-active {
  color: #42b883;
}

.repo-link {
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.repo-link a {
  color: #1d6f93;
  text-decoration: none;
  font-weight: bold;
}

.repo-link a:hover {
  color: #42b883;
}
</style>
