<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import TheCard from '../components/TheCard.vue'
import TheSorting from '../components/TheSorting.vue'
import { computed, onMounted, ref, watch } from 'vue'
import type { ICard } from '@/types/card'

const cardsStore = useDataStore()

const favouriteCards = computed(() => cardsStore.data.filter((card) => card.favourite))

// Переменная для хранения карточек во время сортировки
const visibleCards = ref<ICard[]>([])

// Следим за изменениями favouriteCards и обновляем visibleCards
watch(favouriteCards, (newFavouriteCards) => {
  visibleCards.value = newFavouriteCards
})

const updateDeal = (cardId: number) => {
  cardsStore.updateDeal(cardId, true)
}

const chooseAll = () => {
  return (visibleCards.value = favouriteCards.value)
}

const chooseAuction = () => {
  return (visibleCards.value = favouriteCards.value.filter(
    (card) => card.type !== 'Прямые продажи' && card.type !== 'Все',
  ))
}

const chooseDirect = () => {
  return (visibleCards.value = favouriteCards.value.filter(
    (card) => card.type !== 'Аукцион' && card.type !== 'Все',
  ))
}

const toggleFavourite = (cardId: number) => {
  // Находим карточку и инвертируем значение favourite
  const card = cardsStore.data.find((card) => card.id === cardId)
  if (card) {
    cardsStore.updateFavourite(cardId)
  }
}

onMounted(() => {
  visibleCards.value = favouriteCards.value
})
</script>

<template>
  <div class="sorting">
    <TheSorting
      @update:all="chooseAll"
      @update:direct="chooseDirect"
      @update:auction="chooseAuction"
    ></TheSorting>
  </div>

  <div v-if="!visibleCards.length && !cardsStore.data" class="message">
    В избранном пока что пусто
  </div>
  <div v-if="!visibleCards.length && cardsStore.data" class="empty-message">
    Под условия ничего не подходит
  </div>
  <div class="card-container" v-else>
    <TheCard
      v-for="card in visibleCards"
      :key="card.id"
      :card="card"
      @update:deal="updateDeal(card.id)"
      @toggle-favourite="toggleFavourite"
    ></TheCard>
  </div>
</template>

<style scoped>
.sorting {
  width: 1200px;
  height: 48px;
  margin-bottom: 36px;
  display: flex;
  justify-content: start;
}

.empty-message {
  width: auto;
  display: flex;
  justify-content: center;
  color: var(--dark-blue);
  font-weight: 500;
  font-style: medium;
  font-size: 25px;
}

.card-container {
  display: flex;
  flex-direction: column;
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  padding-bottom: 40px;
}
</style>
