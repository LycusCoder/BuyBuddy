/* App.vue */
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
          <router-link v-for="route in routes" :key="route.path" :to="route.path"
            class="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
            active-class="text-blue-600 font-semibold">
            <Icon v-if="route.icon" :icon="route.icon" class="mr-2" /> {{ route.name }}
          </router-link>
        </nav>
      </div>

      <!-- Mobile Menu -->
      <div v-if="menuOpen" class="md:hidden bg-white border-t shadow-lg">
        <nav class="flex flex-col space-y-1 py-3 px-4">
          <router-link v-for="route in routes" :key="route.path" :to="route.path"
            class="py-2 px-4 rounded hover:bg-blue-50 text-gray-700 flex items-center"
            active-class="bg-blue-50 text-blue-600 font-semibold" @click="toggleMenu">
            <Icon v-if="route.icon" :icon="route.icon" class="mr-2 text-lg" /> {{ route.name }}
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Konten Utama -->
    <div class="flex-grow container mx-auto w-full px-4 py-6 flex flex-col md:flex-row gap-6">
      <main class="flex-1 w-full">
        <router-view :key="$route.fullPath" />
      </main>
    </div>

    <!-- Footer -->
    <footer class="bg-blue-600 text-white py-4 text-center md:text-left">
      <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div class="mb-2 md:mb-0">&copy; 2025 BuyBuddy. All rights reserved.</div>
        <div class="flex space-x-4 text-xl">
          <a href="#" class="hover:text-gray-200"><Icon :icon="['fab', 'facebook-f']" /></a>
          <a href="#" class="hover:text-gray-200"><Icon :icon="['fab', 'twitter']" /></a>
          <a href="#" class="hover:text-gray-200"><Icon :icon="['fab', 'instagram']" /></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const menuOpen = ref(false);
const toggleMenu = () => menuOpen.value = !menuOpen.value;
const routes = [
  { path: '/', name: 'Home', icon: ['fas', 'house'] },
  { path: '/dashboard', name: 'Dashboard', icon: ['fas', 'gauge-high'] },
  { path: '/recommendations', name: 'Rekomendasi', icon: ['fas', 'lightbulb'] },
  { path: '/about', name: 'Tentang', icon: ['fas', 'circle-info'] }
];
</script>