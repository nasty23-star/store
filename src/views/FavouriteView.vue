<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import TheCard from '../components/TheCard.vue'
const cardsStore = useDataStore()
</script>

<template>
  <div>favourite</div>
  <router-link to="/">
    <button>Назад</button>
  </router-link>
  <TheCard v-for="card in cardsStore.data" :key="card.id" :card="card"></TheCard>
</template>

<style scoped></style>
