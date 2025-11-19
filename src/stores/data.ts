import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { ICard } from '@/types/card'
import { initialData } from '@/data/initial'

export const useDataStore = defineStore('data', () => {
  const data = ref<ICard[]>([])

  const loadFromLocalStorage = () => {
    const storedData = localStorage.getItem('data')

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        if (Array.isArray(parsedData)) {
          data.value = parsedData
          return // Выходим, если данные успешно загружены
        }
      } catch (error) {
        console.error('Error parsing localStorage data:', error)
      }
    }

    data.value = [...initialData]
  }

  // Инициализируем сразу при создании стора

  loadFromLocalStorage()

  watch(
    data,
    (newData) => {
      localStorage.setItem('data', JSON.stringify(newData))
    },
    { deep: true }, // важно для отслеживания вложенных изменений
  )

  const updateDeal = (cardId: number, deal: boolean) => {
    const card = data.value.find((card) => card.id === cardId)
    if (card) {
      card.deal = deal
    }
  }

  const updateFavourite = (cardId: number) => {
    const card = data.value.find((card) => card.id === cardId)
    if (card) {
      card.favourite = !card.favourite // ИНВЕРТИРУЕМ текущее значение
    }
  }

  return { data, updateDeal, updateFavourite, loadFromLocalStorage }
})
