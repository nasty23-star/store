<script setup lang="ts">
import { ref, computed } from 'vue'
import TheCard from '@/components/TheCard.vue'

const value = ref('')
const tabs = ref([
  { id: 'All', label: 'Всё', sortKey: 'name' },
  { id: 'Auction', label: 'Аукцион', sortKey: 'name' },
  { id: 'Sales', label: 'Прямые продажи', sortKey: 'name' },
])
</script>

<template>
  <div class="container">
    {{ tabs }}
    <div class="tabs">
      <button v-for="tab in tabs" :key="tab.id"></button>
    </div>

    <!-- <TheCard></TheCard> -->
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  font-family: Rubik, sans-serif;
  height: max-content;
}
</style>
