<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Navbar -->
    <header class="bg-white shadow-md w-full">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <!-- Logo & Brand -->
        <router-link to="/" class="flex items-center text-2xl font-bold text-blue-600 hover:text-blue-800">
          <Icon :icon="['fas', 'bag-shopping']" class="mr-2" /> BuyBuddy
        </router-link>

        <!-- Mobile Menu Button -->
        <button @click="toggleMenu" class="md:hidden text-gray-600 focus:outline-none">
          <Icon v-if="!menuOpen" :icon="['fas', 'bars']" class="text-xl" />
          <Icon v-else :icon="['fas', 'times']" class="text-xl" />
        </button>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex space-x-6">
          <router-link v-for="route in visibleRoutes" :key="route.path" :to="route.path"
            class="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
            active-class="text-blue-600 font-semibold">
            <Icon v-if="route.icon" :icon="route.icon" class="mr-2" /> {{ route.name }}
          </router-link>

          <template v-if="isLoggedIn">
            <router-link to="/dashboard" class="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
              <Icon :icon="['fas', 'gauge-high']" class="mr-2" /> Dashboard
            </router-link>
            <button @click="logout" class="text-red-600 hover:text-red-800 transition-colors flex items-center">
              <Icon :icon="['fas', 'sign-out-alt']" class="mr-2" /> Logout
            </button>
          </template>
          <router-link v-else to="/login" class="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
            <Icon :icon="['fas', 'right-to-bracket']" class="mr-2" /> Login
          </router-link>
        </nav>
      </div>

      <!-- Mobile Menu -->
      <transition name="slide">
        <div v-if="menuOpen" class="md:hidden bg-white border-t shadow-lg">
          <nav class="flex flex-col space-y-1 py-3 px-4">
            <router-link v-for="route in visibleRoutes" :key="route.path" :to="route.path"
              class="py-2 px-4 rounded hover:bg-blue-50 text-gray-700 flex items-center"
              active-class="bg-blue-50 text-blue-600 font-semibold" @click="toggleMenu">
              <Icon v-if="route.icon" :icon="route.icon" class="mr-2 text-lg" /> {{ route.name }}
            </router-link>

            <div v-if="isLoggedIn" class="border-t pt-2">
              <button @click="logout"
                class="w-full text-left py-2 px-4 rounded hover:bg-red-50 text-red-600 flex items-center">
                <Icon :icon="['fas', 'sign-out-alt']" class="mr-2" /> Logout
              </button>
            </div>
          </nav>
        </div>
      </transition>
    </header>

    <!-- Konten Utama dengan Transisi -->
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" :key="$route.fullPath" />
      </transition>
    </router-view>

    <!-- Footer -->
    <footer class="bg-blue-600 text-white py-4 text-center md:text-left">
      <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div class="mb-2 md:mb-0">&copy; 2025 BuyBuddy. All rights reserved.</div>
        <div class="flex space-x-4 text-xl">
          <a href="https://facebook.com/404xtrap" target="_blank"
            class="text-white dark:text-gray-300 hover:text-yellow-300 transition duration-300">
            <Icon :icon="['fab', 'facebook-f']" />
          </a>
          <a href="https://x.com/lycusbendln" target="_blank"
            class="text-white dark:text-gray-300 hover:text-yellow-300 transition duration-300">
            <Icon :icon="['fab', 'twitter']" />
          </a>
          <a href="https://linkedin.com/in/nourivex" target="_blank"
            class="text-white dark:text-gray-300 hover:text-yellow-300 transition duration-300">
            <Icon :icon="['fab', 'linkedin-in']" />
          </a>
          <a href="https://instagram.com/richlycus" target="_blank"
            class="text-white dark:text-gray-300 hover:text-yellow-300 transition duration-300">
            <Icon :icon="['fab', 'instagram']" />
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const toast = useToast();
const router = useRouter();
const menuOpen = ref(false);
const isLoggedIn = ref(false);

// Daftar route yang ditampilkan di navbar
const routes = [
  { path: '/', name: 'Home', icon: ['fas', 'house'] },
  { path: '/recommendations', name: 'Rekomendasi', icon: ['fas', 'lightbulb'] },
  { path: '/about', name: 'Tentang', icon: ['fas', 'circle-info'] }
];

// Filter route yang tidak memerlukan autentikasi
const visibleRoutes = computed(() => {
  return routes.filter(route => !route.meta?.requiresAuth || isLoggedIn.value);
});

// Toggle mobile menu
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Cek status login
const checkAuth = () => {
  isLoggedIn.value = localStorage.getItem('isAuthenticated') === 'true';
};

// Logout
const logout = () => {
  localStorage.removeItem('isAuthenticated');
  toast.success('Berhasil logout', { timeout: 2000 });
  router.push('/');
};

// Pemantauan perubahan auth status
onMounted(() => {
  checkAuth();
  window.addEventListener('storage', checkAuth);
});

// Cleanup event listener
onUnmounted(() => {
  window.removeEventListener('storage', checkAuth);
});
</script>

<style scoped>
/* Transisi Mobile Menu */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
}

/* Transisi Halaman */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Hover effect untuk navbar */
nav a:hover {
  @apply text-[#87CEFA];
}
</style>