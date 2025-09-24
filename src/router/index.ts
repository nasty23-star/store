import { createRouter, createWebHistory } from 'vue-router'
import StoreView from '../views/StoreView.vue'
import FavouriteView from '../views/FavouriteView.vue'
import DealsView from '../views/DealsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'store',
      component: StoreView,
    },
    {
      path: '/deals',
      name: 'deals',
      component: DealsView,
    },
    {
      path: '/favourite',
      name: 'favourite',
      component: FavouriteView,
    },
  ],
})

export default router
