<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="flex relative z-10 p-5">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/outline">Outline</RouterLink>
      <RouterLink to="/level">Level</RouterLink>
    </nav>
  </header>

  <RouterView class="w-screen h-screen top-0 absolute p-5 pt-10" />
</template>
