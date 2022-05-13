import { createRouter, createWebHistory } from 'vue-router';

import CheepHome from './pages/CheepHome.vue'
import CheepExplore from './pages/CheepExplore.vue'
import CheepNotifications from './pages/CheepNotifications.vue'
import CheepMessages from './pages/CheepMessages.vue'
import CheepProfile from './pages/CheepProfile.vue'

const routes = [
    { path: '/', component: CheepHome, alias: '/home' },
    { path: '/explore', component: CheepExplore },
    { path: '/notifications', component: CheepNotifications },
    { path: '/messages', component: CheepMessages },
    { path: '/profile', component: CheepProfile },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router