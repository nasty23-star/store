<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import TheCard from '../components/TheCard.vue'
import TheSorting from '../components/TheSorting.vue'
import { computed, onMounted, ref } from 'vue'
import type { ICard } from '@/types/card'

const cardsStore = useDataStore()
const favouriteCards = computed(() => cardsStore.data.filter((card) => card.favourite))

// Переменная для хранения карточек во время сортировки
let visibleCards = ref<ICard[]>([])

const updateDeal = (cardId: number) => {
  cardsStore.updateDeal(cardId, true)
}

const chooseAll = () => {
  return (visibleCards.value = favouriteCards.value)
}

const chooseDirect = () => {
  return (visibleCards.value = favouriteCards.value.filter(
    (card) => card.type !== 'Прямые продажи',
  ))
}

const chooseAuction = () => {
  return (visibleCards.value = favouriteCards.value.filter((card) => card.type !== 'Аукцион'))
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
  <TheCard
    v-for="card in visibleCards"
    :key="card.id"
    :card="card"
    :favourite="card.favourite"
    @update:deal="updateDeal(card.id)"
  ></TheCard>
</template>

<style scoped>
.sorting {
  width: 1200px;
  height: 48px;
  margin-bottom: 36px;
  display: flex;
  justify-content: start;
}
</style>
