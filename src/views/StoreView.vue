<script setup lang="ts">
import { ref } from 'vue'
import TheCard from '@/components/TheCard.vue'
const value = ref('')

</script>

<template>
  <div class="container">
    <TheCard></TheCard>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  font-family: Rubik, sans-serif;
  height: max-content;
}
</style>
