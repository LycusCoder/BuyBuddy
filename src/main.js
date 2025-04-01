import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// Impor komponen Icon 
import Icon from './components/Icon.vue'

const app = createApp(App)

// Konfigurasi Toast
const toastOptions = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 5,
  newestOnTop: true,
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: false,
};

app.use(Toast, toastOptions);

// Tambahkan toast ke window untuk diakses di router
window.$toast = app.$toast;

app.use(createPinia())
app.use(router)

// Daftarkan komponen Icon secara global
app.component('Icon', Icon)

app.mount('#app')