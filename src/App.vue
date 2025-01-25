<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/first-exercise">First Exercise</RouterLink> |
      <RouterLink to="/second-exercise">Second Exercise</RouterLink> |
      <RouterLink to="/third-exercise">Third Exercise</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  padding: 2rem;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 0 1rem;
}

nav a.router-link-exact-active {
  color: #42b883;
}
</style>
