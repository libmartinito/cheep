import { createApp } from 'vue'
import App from './App.vue'

import router from './router.js'
import BaseButton from './components/ui/BaseButton.vue'
import BaseLink from './components/ui/BaseLink.vue'
import BaseModal from './components/ui/BaseModal.vue'
import TheSidebar from './components/layout/TheSidebar.vue'

import store from './store'

const app = createApp(App)

app.use(store)
app.use(router)

app.component('BaseButton', BaseButton)
app.component('BaseLink', BaseLink)
app.component('BaseModal', BaseModal)
app.component('TheSidebar', TheSidebar)

app.mount("#app")
