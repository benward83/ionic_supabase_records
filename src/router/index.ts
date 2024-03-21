import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue'
import AlbumsView from '../views/AlbumsView.vue'
import AlbumDetailsView from '../views/AlbumDetailsView.vue'
import AddAlbumView from '../views/AddAlbumView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/albums',
    name: 'Albums',
    component: AlbumsView,
  },
  {
    path: '/albums/:id',
    name: 'AlbumDetails',
    component: AlbumDetailsView,
  },
  {
    path: '/albums/add',
    name: 'AddAlbum',
    component: AddAlbumView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
