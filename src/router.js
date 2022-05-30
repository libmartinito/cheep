import { createRouter, createWebHistory } from 'vue-router';

import CheepEntry from './pages/CheepEntry.vue'
import CheepHome from './pages/CheepHome.vue'
import CheepExplore from './pages/CheepExplore.vue'
import CheepNotifications from './pages/CheepNotifications.vue'
import CheepMessages from './pages/CheepMessages.vue'
import CheepProfile from './pages/CheepProfile.vue'

// import store from './store'

const routes = [
    { path: '/', name: 'entry', component: CheepEntry },
    { path: '/home', name: 'home', component: CheepHome },
    { path: '/explore', name: 'explore', component: CheepExplore },
    { path: '/notifications', name: 'notifications', component: CheepNotifications },
    { path: '/messages', name: 'messages', component: CheepMessages },
    { path: '/profile', name: 'profile', component: CheepProfile },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// store.dispatch('loadFromLocalStorage')
router.beforeEach(async (to) => {
    // store.dispatch('loadFromLocalStorage')
    const isSignedIn = localStorage.getItem('isSignedIn')
    if (!isSignedIn && to.name !== 'entry') {
        console.log('route1')
        return { name: 'entry'}
    }
    if (isSignedIn && to.name === 'entry') {
        console.log('route2')
        return { name: 'home'}
    }
})

export default router