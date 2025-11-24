<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import TheCard from '@/components/TheCard.vue'
import { useDataStore } from '@/stores/data'
import TheSorting from '@/components/TheSorting.vue'
import TheSearching from '@/components/TheSearching.vue'
import { useFiltering } from '@/composables/useFiltering'
import { useSearching } from '@/composables/useSearching'

const cardsStore = useDataStore()

// Состояния фильтрации
const currentFilter = ref<'all' | 'direct' | 'auction'>('all')

const { allTypesFilteredCards, filterActual } = useFiltering(cardsStore.data, currentFilter)

watch(filterActual, (newFilter) => {
  console.log('Filter actual in component:', newFilter)
})

// Поиск
const search = ref('')
const { searchResults } = useSearching(allTypesFilteredCards, search)

const visibleCards = computed(() => searchResults.value)

const updateDeal = (cardId: number) => {
  const card = cardsStore.data.find((card) => card.id === cardId)
  if (card) {
    cardsStore.updateDeal(cardId)
  }
}

const chooseAll = () => {
  currentFilter.value = 'all'
}

const chooseDirect = () => {
  currentFilter.value = 'direct'
}

const chooseAuction = () => {
  currentFilter.value = 'auction'
}

const toggleFavourite = (cardId: number) => {
  cardsStore.updateFavourite(cardId)
}

const searchInfo = (query: string) => {
  search.value = query
}
</script>

<template>
  <div class="container">
    <div class="sorting-container">
      <TheSorting
        :filter-actual="filterActual"
        @update:all="chooseAll"
        @update:direct="chooseDirect"
        @update:auction="chooseAuction"
      ></TheSorting>
      <TheSearching
        v-model="search"
        placeholder="Поиск товаров..."
        @search-info="searchInfo"
      ></TheSearching>
    </div>
    <div v-if="visibleCards.length === 0" class="empty-message">
      Под выбранные условия ничего не подходит
    </div>
    <div class="card-container" v-else>
      <TheCard
        v-for="card in visibleCards"
        :key="card.id"
        :card="card"
        :favourite="card.favourite"
        @update:deal="updateDeal(card.id)"
        @toggle-favourite="toggleFavourite"
      ></TheCard>
    </div>
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
  display: flex;
  justify-content: space-between;
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
