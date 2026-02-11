import type { ICard } from '@/types/card'
import { computed, ref, type Ref } from 'vue'

export function useFiltering(array: ICard[], currentFilter: Ref<'direct' | 'auction' | 'all'>) {
  const filterActual = ref<'direct' | 'auction' | 'all'>('all')

  const allTypesFilteredCards = computed(() => {
    let filteredCards = array

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

    return filteredCards
  })

  return {
    allTypesFilteredCards,
    filterActual: currentFilter,
  }
}
