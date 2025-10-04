<script setup lang="ts">
import TheSorting from '@/components/TheSorting.vue'
import TheSearching from '@/components/TheSearching.vue'
import { ref, watch, computed } from 'vue'
import TheCard from '@/components/TheCard.vue'
import type { ICard } from '@/types/card'
import { useDataStore } from '@/stores/data'

const cardsStore = useDataStore()

// Используем computed для реактивного отображения карточек В сделках
const dealCards = computed(() => cardsStore.data.filter((card) => card.deal === true))

// Переменная для фильтрации (если нужна дополнительная фильтрация)
const visibleCards = ref<ICard[]>([])

// Следим за изменениями карточек в сделках
watch(
  dealCards,
  (newDealCards) => {
    visibleCards.value = newDealCards
  },
  { immediate: true },
)

const updateDeal = (cardId: number) => {
  // Устанавливаем deal = false, карточка автоматически исчезнет из dealCards
  cardsStore.updateDeal(cardId, false)
}

const chooseAll = () => {
  visibleCards.value = dealCards.value
}

const chooseDirect = () => {
  visibleCards.value = dealCards.value.filter(
    (card) => card.type !== 'Аукцион' && card.type !== 'Все',
  )
}

const chooseAuction = () => {
  visibleCards.value = dealCards.value.filter(
    (card) => card.type !== 'Прямые продажи' && card.type !== 'Все',
  )
}

const toggleFavourite = (cardId: number) => {
  cardsStore.updateFavourite(cardId)
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
      <TheSearching></TheSearching>
    </div>

    <!-- Сообщение если нет карточек в сделках -->
    <div v-if="dealCards.length === 0" class="empty-message">В сделках пока что пусто</div>

    <div v-else-if="visibleCards.length === 0" class="empty-message">
      Под выбранные условия ничего не подходит
    </div>

    <TheCard
      v-else
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
  display: flex;
  justify-content: space-between;
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
</style>
