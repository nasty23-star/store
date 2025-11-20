import type { ICard } from '@/types/card'
import { computed, type Ref, type ComputedRef } from 'vue'

export function useSearching(
  array: ComputedRef<ICard[]>, // Принимаем ComputedRef вместо ICard[]
  search: Ref<string>,
) {
  const searchResults = computed(() => {
    if (!search.value.trim()) return array.value

    const query = search.value.toLowerCase().trim()
    return array.value.filter((card) => card.title.toLowerCase().includes(query))
  })

  return {
    searchResults,
  }
}
