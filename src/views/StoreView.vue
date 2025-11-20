<script setup lang="ts">
import { ref, computed } from 'vue'
import TheCard from '@/components/TheCard.vue'
import { useDataStore } from '@/stores/data'
import TheSorting from '@/components/TheSorting.vue'
import TheSearching from '@/components/TheSearching.vue'
import { useFiltering } from '@/composables/useFiltering'

const cardsStore = useDataStore()

// Состояния фильтрации
const search = ref('')
const currentFilter = ref<'all' | 'direct' | 'auction'>('all')
const { allTypesFilteredCards } = useFiltering(cardsStore.data, currentFilter)

const searchResults = computed(() => {
  if (!search.value.trim()) return allTypesFilteredCards.value

  // Применяем поиск, если есть поисковый запрос
  let filteredCards = cardsStore.data
  const query = search.value.toLowerCase().trim()
  filteredCards = filteredCards.filter((card) => card.title.toLowerCase().includes(query))

  return filteredCards
})

const visibleCards = computed(() => searchResults.value)

const updateDeal = (cardId: number) => {
  cardsStore.updateDeal(cardId, false)
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
