<script setup lang="ts">
import { useRoute } from 'vue-router'
</script>

<template>
  <main>
    <header class="header">
      <nav class="navigation">
        <router-link to="/" class="nav-link">Главная</router-link>

        <router-link to="/deals" class="nav-link">Сделки</router-link>

        <router-link to="/favourite" class="nav-link">Избранное</router-link>
      </nav>
      <router-view />\
    </header>
  </main>
</template>

<style scoped>

</style>
