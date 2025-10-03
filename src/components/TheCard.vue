<script setup lang="ts">
import type { ICard } from '../types/card'
import { defineEmits } from 'vue'
// Принимаем пропс
defineProps<{
  card: ICard
}>()

const emit = defineEmits<{
  'update:deal': [value: boolean]
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
                <svg
                  width="11"
                  height="15"
                  viewBox="0 0 11 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.5 14.5C5.5 14.5 10.5 9.40909 10.5 5.59091C10.5 2.66213 8.26142 0.5 5.5 0.5C2.73858 0.5 0.5 2.66213 0.5 5.59091C0.5 9.40909 5.5 14.5 5.5 14.5ZM5.49979 7.86848C6.68326 7.86848 7.64265 6.87879 7.64265 5.65795C7.64265 4.43711 6.68326 3.44743 5.49979 3.44743C4.31632 3.44743 3.35693 4.43711 3.35693 5.65795C3.35693 6.87879 4.31632 7.86848 5.49979 7.86848Z"
                    fill="#969DC3"
                  />
                </svg>
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
            <button class="button-add" @click="$emit('update:deal', true)">
              Добавить в сделки
            </button>
            <button class="favourite-add" @click="handleFavourite(card.id)">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.33423 5.15646C3.76936 5.66876 3.37143 6.48526 3.37143 7.72395C3.37143 8.49178 3.74054 9.37595 4.39401 10.3171C5.0395 11.2468 5.91325 12.1619 6.80764 12.9768C7.69901 13.7889 8.59325 14.4856 9.26619 14.98C9.5571 15.1937 9.80563 15.3689 9.99334 15.4985C10.182 15.3641 10.4326 15.1821 10.7264 14.9604C11.4003 14.4517 12.296 13.7378 13.1889 12.9135C14.0848 12.0864 14.9605 11.1642 15.6075 10.2403C16.2647 9.30178 16.6286 8.44202 16.6286 7.72398C16.6286 5.85557 15.1163 4.35487 13.2692 4.35487C12.1581 4.35487 11.1713 4.89912 10.5565 5.74372C10.4277 5.92072 10.2205 6.02564 9.99979 6.02563C9.77911 6.02562 9.57192 5.92069 9.44309 5.74369C8.82837 4.89912 7.84181 4.35487 6.73039 4.35487C5.73916 4.35487 4.90933 4.63487 4.33423 5.15646ZM9.99982 16.3229C9.62433 16.8897 9.6242 16.8897 9.62404 16.8896L9.62215 16.8883L9.61733 16.8852L9.5999 16.8738C9.58488 16.864 9.56313 16.8497 9.5351 16.831C9.47905 16.7938 9.39785 16.7394 9.29508 16.669C9.08961 16.5284 8.79758 16.3242 8.44779 16.0672C7.74933 15.554 6.81505 14.8266 5.87789 13.9728C4.94375 13.1217 3.98898 12.129 3.26308 11.0835C2.54515 10.0495 2 8.89125 2 7.72395C2 6.1806 2.50766 4.97383 3.40677 4.15839C4.29563 3.35224 5.48815 3 6.73039 3C8.00311 3 9.15307 3.50391 9.99985 4.31539C10.8467 3.50391 11.9967 3 13.2692 3C15.8899 3 18 5.12338 18 7.72398C18 8.85265 17.4496 9.99111 16.7353 11.0111C16.0108 12.0458 15.0579 13.0425 14.1252 13.9034C13.1895 14.7672 12.2565 15.5105 11.559 16.037C11.2097 16.3007 10.9181 16.5109 10.7131 16.6559C10.6105 16.7284 10.5295 16.7845 10.4736 16.823C10.4457 16.8422 10.424 16.8569 10.4091 16.8671L10.3918 16.8788L10.3871 16.882L10.3857 16.8829C10.3855 16.883 10.385 16.8834 9.99982 16.3229ZM9.99982 16.3229L10.3857 16.8829C10.1567 17.0365 9.85564 17.0393 9.62404 16.8896L9.99982 16.3229Z"
                  fill="#2D3B87"
                />
              </svg>
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
  border: 1px solid #e0e3ee;
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
  color: #969dc3;
  font-weight: 400;
  font-size: 13px;
}

.main-data_title {
  height: 38px;
  color: #2d3b87;
  font-weight: 500;
  font-style: medium;
  font-size: 15px;
  line-height: 125%;
}

.main-data_geolocation {
  background: #f4f5f9;
  border-radius: 5px;
  border: none;
  font-weight: 400;
  font-style: regular;
  font-size: 13px;
  height: 13px;
  color: #616ca5;
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
  color: #969dc3;
  font-weight: 400;
  font-size: 13px;
  margin-bottom: 8px;
}

.main-data_rate span {
  color: #2d3b87;
  font-weight: 400;
  font-size: 13px;
}

.main-data_spec {
  background: #f4f5f9;
  color: #969dc3;
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
  color: #616ca5;
  font-weight: 400;
  font-size: 13px;
}

.main-data_description {
  color: #2d3b87;
  font-weight: 400;
  font-size: 13px;
  line-height: 150%;
  height: 80px;
  overflow: hidden;
}

.sell-info {
  width: 314px;
  height: 366px;
  border: 1px solid #e0e3ee;
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
  color: #2d3b87;
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
  color: #969dc3;
}

.quantity-wrapper .quantity,
.value-wrapper .quantity {
  font-weight: 400;
  font-size: 13px;
  font-style: regular;
  color: #2d3b87;
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
  background: #f4f5f9;
  font-size: 15px;
  font-weight: 600;
  color: #2d3b87;
  border: none;
  height: 50px;
  border-radius: 10px;
}

.button-add:hover,
.favourite-add:hover {
  background-color: #e0e3ee;
}

.favourite-add {
  background: #f4f5f9;
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
  background: #f4f5f9;
  color: #616ca5;
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
</style>
