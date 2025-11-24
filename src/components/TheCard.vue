<script setup lang="ts">
import type { ICard } from '../types/card'
import { defineEmits } from 'vue'
import LocationIcon from './icons/LocationIcon.vue'
import FavouriteIcon from './icons/FavouriteIcon.vue'

defineProps<{
  card: ICard
}>()

const emit = defineEmits<{
  'update:deal': [value: number]
  'toggle-favourite': [value: number]
}>()

const handleFavourite = (cardId: number) => {
  emit('toggle-favourite', cardId)
}
</script>
<template>
  <div class="card">
    <div class="card-container">
      <div class="main-info">
        <div class="main-container">
          <div class="img"><img src="../assets//брус.png" /></div>
          <div class="main-data">
            <div class="main-data_type">{{ card.type }}</div>
            <div class="main-data_title">{{ card.title }}</div>
            <div class="main-data_geolocation">
              <div class="main-data_geolocation_svg">
                <LocationIcon />
              </div>
              {{ card.location }}
            </div>
            <div class="main-data_rate">
              Продавец <span>{{ card.seller }}</span>
            </div>
            <div class="main-data_spec">
              Вид товара <span>{{ card.spec }}</span>
            </div>
            <div class="main-data_description">
              {{ card.description }}
            </div>
          </div>
        </div>
      </div>
      <div class="sell-info">
        <div class="sell-info_container">
          <div class="sell-info_top">
            <div class="price">{{ card.price * card.quantity }} 000 ₽</div>
            <div class="quantity-wrapper">
              <span class="text">Количество</span>
              <span class="quantity">{{ card.quantity }} шт.</span>
            </div>
            <div class="value-wrapper">
              <span class="text">Стоимость за штуку</span>
              <span class="quantity">{{ card.price }} 000 <span>₽</span></span>
            </div>
          </div>
          <div class="sell-info_bottom">
            <button class="button-add" @click="$emit('update:deal', card.id)">
              {{ card.deal ? 'Удалить из сделок' : 'Добавить в сделки' }}
            </button>
            <button class="favourite-add" @click="handleFavourite(card.id)">
              <FavouriteIcon :is-favourite="card.favourite" />

              <span class="tooltip">
                {{ card.favourite ? 'Удалить из избранного' : 'Добавить в избранное' }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card {
  max-width: 1166px;
  height: 366px;
  border: 1px solid var(--background-color-light);
  border-radius: 20px;
  margin: auto;
}

.card-container {
  display: flex;
  height: -webkit-fill-available;
}

.main-info {
  width: 852px;
}

.main-container {
  padding: 16px;
  display: flex;
  gap: 8px;
}

.img img {
  width: 256px;
  height: 256px;
}

.main-data {
  margin: 8px 0px 8px 8px;
}

.main-data_type {
  height: 24px;
  color: var(--light-violet);
  font-weight: 400;
  font-size: 13px;
}

.main-data_title {
  height: 38px;
  color: var(--dark-blue);
  font-weight: 500;
  font-size: 15px;
  line-height: 125%;
}

.main-data_geolocation {
  background: var(--background-color);
  border-radius: 5px;
  border: none;
  font-weight: 400;
  font-size: 13px;
  height: 13px;
  color: var(--violet);
  width: max-content;
  padding-right: 8px;
  border-radius: 5px;
  height: 23px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.main-data_geolocation svg {
  margin-left: 8px;
  margin-right: 8px;
}

.main-data_geolocation_svg {
  display: flex;
  align-items: center;
}

.main-data_rate {
  color: var(--light-violet);
  font-weight: 400;
  font-size: 13px;
  margin-bottom: 8px;
}

.main-data_rate span {
  color: var(--dark-blue);
  font-weight: 400;
  font-size: 13px;
}

.main-data_spec {
  background: var(--background-color);
  color: var(--light-violet);
  font-weight: 400;
  font-size: 13px;
  height: 48px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: max-content;
  padding: 8px;
  border-radius: 10px;
  gap: 6px;
}

.main-data_spec span {
  color: var(--violet);
  font-weight: 400;
  font-size: 13px;
}

.main-data_description {
  color: var(--dark-blue);
  font-weight: 400;
  font-size: 13px;
  line-height: 150%;
  height: 80px;
  overflow: hidden;
}

.sell-info {
  width: 314px;
  height: 366px;
  border: 1px solid var(--background-color-light);
  border-radius: 20px;
}

.sell-info_container {
  margin: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: -webkit-fill-available;
}

.price {
  color: var(--dark-blue);
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 4px;
}

.quantity-wrapper,
.value-wrapper {
  height: 24px;
  display: flex;
  justify-content: space-between;
}

.quantity-wrapper .text,
.value-wrapper .text {
  font-weight: 400;
  font-size: 14px;
  font-style: regular;
  color: var(--light-violet);
}

.quantity-wrapper .quantity,
.value-wrapper .quantity {
  font-weight: 400;
  font-size: 13px;
  font-style: regular;
  color: var(--dark-blue);
}

.sell-info_bottom {
  height: 50px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  bottom: 0;
}

.button-add {
  width: 212px;
  background: var(--background-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--dark-blue);
  border: none;
  height: 50px;
  border-radius: 10px;
}

.button-add:hover,
.favourite-add:hover {
  background-color: var(--background-color-light);
}

.favourite-add {
  background: var(--background-color);
  width: 50px;
  height: 50px;
  border-radius: 10px;
  gap: 8px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.tooltip {
  visibility: hidden;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--background-color);
  color: var(--violet);
  text-align: center;
  border-radius: 3px;
  padding: 5px;
  z-index: 1;
  width: max-content;
  margin-bottom: 4px;
}

.favourite-add:hover .tooltip {
  visibility: visible;
}

@media (max-width: 1200px) {
  .container {
    width: 800px;
  }
  .card {
    border: 1px solid var(--background-color-light);
    border-radius: 20px;
    margin: auto;
    height: max-content;
  }

  .card-container {
    display: flex;
    flex-direction: column;
    height: -webkit-fill-available;
  }

  .main-info {
    width: auto;
  }

  .sell-info {
    height: auto;
    width: auto;
  }
}
</style>
