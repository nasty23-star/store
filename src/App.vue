<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import HomeIcon from './components/icons/HomeIcon.vue'
import DealIcon from './components/icons/DealIcon.vue'
import FavouriteNavIcon from './components/icons/FavouriteIcon.vue'

const route = useRoute()
const showBackButton = computed(() => route.path === '/favourite' || route.path === '/deals')
</script>

<template>
  <div class="container">
    <div class="button-container">
      <router-link v-if="showBackButton" to="/">
        <button class="button-back">Назад</button>
      </router-link>
    </div>
    <header class="header">
      <nav class="navigation">
        <router-link to="/favourite" class="nav-link" :class="{ active: $route.path === '/home' }"
          >
          <FavouriteNavIcon />
          Избранное</router-link
        >
        <router-link to="/" class="nav-link"
          >
          <HomeIcon />
          Главная</router-link
        >

        <router-link to="/deals" class="nav-link"
          >
          <DealIcon />
          Сделки</router-link
        >
      </nav>
    </header>
    <router-view />
  </div>
</template>

<style scoped>
.container {
  width: 1200px;
}

.button-container {
  margin-top: 20px;
  height: 50px;
}

.button-back {
  width: 212px;
  height: 50px;
  background: var(--background-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--dark-blue);
  border: none;
  border-radius: 10px;
}

.button-back:hover {
  background-color: var(----background-color-light);
}

.router-link-active {
  background-color: var(--background-color-light);
  color: var(--dark-blue);
}

header {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: end;
  align-items: end;
  margin-bottom: 70px;
}

nav {
  width: 270px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  font-family: Rubik, sans-serif;
  font-weight: 500;
  font-size: 15px;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 4px;
    padding-top: 4px;
    text-decoration: none;
    width: 86px;
  }

  a:hover {
    background: var(--background-color);
  }

  a:active {
    color: #2f4f4f;
  }
}

@media (max-width: 1200px) {
  .container {
    width: 700px;
  }
}
</style>
