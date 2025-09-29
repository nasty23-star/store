<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import TheCard from '../components/TheCard.vue'
const cardsStore = useDataStore()
</script>

<template>
  <router-link to="/">
    <button class='button-back'>Назад</button>
  </router-link>
  <TheCard v-for="card in cardsStore.data" :key="card.id" :card="card"></TheCard>
</template>

<style scoped>
.button-back {
  width: 212px;
  background: #f4f5f9;
  font-size: 15px;
  font-weight: 600;
  color: #2d3b87;
  border: none;
  height: 50px;
  border-radius: 10px;
}

.button-back:hover,
.favourite-back:hover {
  background-color: #e0e3ee;
}
</style>
