import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue'
import AlbumsView from '../views/albums/AlbumsView.vue'
import AlbumDetailsView from '../views/albums/AlbumDetailsView.vue'
import AddAlbumView from '../views/albums/AddAlbumView.vue'
import LoginView from '@/views/LoginView.vue';
import UserAccountView from '@/views/UserAccountView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/me',
    name: 'MyProfile',
    component: UserAccountView,
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
