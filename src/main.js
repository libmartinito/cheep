import { createApp } from 'vue'
import App from './App.vue'

import router from './router.js'
import BaseButton from './components/ui/BaseButton.vue'
import BaseLink from './components/ui/BaseLink.vue'
import TheSidebar from './components/layout/TheSidebar.vue'

const app = createApp(App)

app.use(router)
app.component('BaseButton', BaseButton)
app.component('BaseLink', BaseLink)
app.component('TheSidebar', TheSidebar)
app.mount("#app")
