<script setup lang="ts">
import TheSorting from '@/components/TheSorting.vue'
import TheSearching from '@/components/TheSearching.vue'
import { ref, computed } from 'vue'
import TheCard from '@/components/TheCard.vue'

import { useDataStore } from '@/stores/data'

const cardsStore = useDataStore()

// Используем computed для реактивного отображения карточек В сделках
const dealCards = computed(() => cardsStore.data.filter((card) => card.deal === true))

// Состояния фильтрации
const search = ref('')
const currentFilter = ref<'all' | 'direct' | 'auction'>('all')

// Единый computed для всех фильтров
const visibleCards = computed(() => {
  let filteredCards = dealCards.value

  // Применяем фильтр по типу
  switch (currentFilter.value) {
    case 'direct':
      filteredCards = filteredCards.filter((card) => card.type === 'Прямые продажи')
      break
    case 'auction':
      filteredCards = filteredCards.filter((card) => card.type === 'Аукцион')
      break
    case 'all':
    default:
      // Все карточки, без фильтрации по типу
      break
  }

  // Применяем поиск, если есть поисковый запрос
  if (search.value.trim()) {
    const query = search.value.toLowerCase().trim()
    filteredCards = filteredCards.filter(
      (card) =>
        card.title.toLowerCase().includes(query) ||
        card.description.toLowerCase().includes(query) ||
        card.seller.toLowerCase().includes(query) ||
        card.location.toLowerCase().includes(query) ||
        card.spec.toLowerCase().includes(query) ||
        card.type.toLowerCase().includes(query),
    )
  }

  return filteredCards
})

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

const disabled = ref(false)

const payDeal = () => {
  disabled.value = true
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

    <!-- Сообщение если нет карточек в сделках -->
    <div v-if="dealCards.length === 0" class="empty-message">В сделках пока что пусто</div>

    <div v-else-if="visibleCards.length === 0" class="empty-message">
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
    {{ disabled }}
    <button class="button-pay" :disabled="disabled" @click="payDeal">Оплатить</button>
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
  color: #2d3b87;
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
}

.button-pay {
  margin-left: 16px;
  margin-bottom: 10px;
  width: 212px;
  background: #f4f5f9;
  font-size: 15px;
  font-weight: 600;
  color: #2d3b87;
  border: none;
  height: 40px;
  border-radius: 10px;
}
.button-pay:hover {
  background-color: #e0e3ee;
}

.button-pay:disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
