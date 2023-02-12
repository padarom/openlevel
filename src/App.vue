<script setup lang="ts">
import { RouterView } from 'vue-router'
import BreadcrumbRouterLink from './components/BreadcrumbRouterLink.vue'
</script>

<template>
  <div class="w-full h-full" ref="container">
    <header class="relative z-10 p-3 flex justify-center">
      <nav class="flex space-x-4 rounded-md bg-white pr-6 shadow">
        <BreadcrumbRouterLink :to="{ name: 'home' }" :firstEntry="true">
          Overview
        </BreadcrumbRouterLink>
        <BreadcrumbRouterLink :to="{ name: 'setup-outline' }">
          Setup Outline
        </BreadcrumbRouterLink>
        <BreadcrumbRouterLink :to="{ name: 'parametrize-outline' }">
          Parametrize
        </BreadcrumbRouterLink>
        <BreadcrumbRouterLink :to="{ name: 'setup-grid' }">
          Setup Grid
        </BreadcrumbRouterLink>
        <BreadcrumbRouterLink :to="{ name: 'leveling' }">
          Level
        </BreadcrumbRouterLink>
      </nav>
    </header>

    <RouterView class="w-screen h-screen top-0 absolute p-5 pt-10" />
  </div>
</template>
