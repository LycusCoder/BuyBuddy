import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

// Impor komponen Icon 
import Icon from './components/Icon.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Daftarkan komponen Icon secara global
app.component('Icon', Icon)

app.mount('#app')
