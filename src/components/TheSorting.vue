<script setup lang="ts">
import { defineEmits } from 'vue'

const props = defineProps<{
  filterActual: string
}>()

const emit = defineEmits<{
  'update:all': [value: boolean]
  'update:direct': [value: boolean]
  'update:auction': [value: boolean]
}>()

const handleAllCards = () => {
  emit('update:all', true)
}

const handleDirectCards = () => {
  emit('update:direct', true)
}

const handleAuctionCards = () => {
  emit('update:auction', true)
}
</script>
<template>
  <div class="sorting-buttons">
    <button
      class="button-sort"
      :class="{ active: props.filterActual === 'all' }"
      @click="handleAllCards"
    >
      Все типы
    </button>
    <button
      class="button-sort"
      :class="{ active: props.filterActual === 'direct' }"
      @click="handleDirectCards"
    >
      Прямые продажи
    </button>
    <button
      class="button-sort"
      :class="{ active: props.filterActual === 'auction' }"
      @click="handleAuctionCards"
    >
      Аукцион
    </button>
  </div>
</template>
<style scoped>
.sorting {
  height: 48px;
  margin-bottom: 36px;
  display: flex;
  justify-content: start;
}

.sorting-buttons {
  width: 304px;
  height: 40px;
  background: var(--background-color-light);
  border: 1px solid var(--background-color);
  display: flex;
  border-radius: 10px;
}

.button-sort {
  border: none;
  height: 40px;
  color: var(--light-violet);
  font-size: 15px;
}

.button-sort.active {
  background: rgba(126, 142, 228, 0.3);
  color: white;
  box-shadow: 0 2px 8px rgba(126, 142, 228, 0.3);
}

.button-sort:nth-child(1) {
  width: 90px;
  border-radius: 10px 0px 0px 10px;
}

.button-sort:nth-child(3) {
  border-radius: 0px 10px 10px 0px;
}

.button-sort:nth-child(2) {
  width: 150px;
}

.button-sort:hover,
.button-sort:active {
  color: var(--dark-blue);
}
</style>
