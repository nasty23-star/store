<script setup lang="ts">
import { ref, watch } from 'vue'
import TheCard from '@/components/TheCard.vue'
import type { ICard } from '@/types/card'
import { useDataStore } from '@/stores/data'
import TheSorting from '@/components/TheSorting.vue'

const cardsStore = useDataStore()

// Переменная для хранения видимых карточек
const visibleCards = ref<ICard[]>([])

visibleCards.value = cardsStore.data

watch(
  () => cardsStore.data,
  (newData) => {
    visibleCards.value = newData
  },
  { immediate: true } // immediate: true чтобы выполнить сразу при создании
)

const updateDeal = (cardId: number) => {
  cardsStore.updateDeal(cardId, true)
}

const chooseAll = () => {
  visibleCards.value = cardsStore.data
}

const chooseDirect = () => {
  return (visibleCards.value = cardsStore.data.filter(
    (card) => card.type !== 'Аукцион' && card.type !== 'Все',
  ))
}

const chooseAuction = () => {
  return (visibleCards.value = cardsStore.data.filter(
    (card) => card.type !== 'Прямые продажи' && card.type !== 'Все',
  ))
}

const toggleFavourite = (cardId: number) => {
  // Находим карточку и инвертируем значение favourite
  const card = cardsStore.data.find((card) => card.id === cardId)
  if (card) {
    cardsStore.updateFavourite(cardId)
  }
}
</script>

<template>
  <div class="container">
    <div class="sorting-container">
      <TheSorting
        @update:all="chooseAll"
        @update:direct="chooseDirect"
        @update:auction="chooseAuction"
      ></TheSorting>
    </div>

    <TheCard
      v-for="card in visibleCards"
      :key="card.id"
      :card="card"
      :favourite="card.favourite"
      @update:deal="updateDeal(card.id)"
      @toggle-favourite="toggleFavourite"
    ></TheCard>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  font-family: Rubik, sans-serif;
  height: max-content;
}

.sorting-container {
  margin-bottom: 36px;
  height: 48px;
}
</style>
