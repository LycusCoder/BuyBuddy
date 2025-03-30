<template>
    <div class="container mx-auto px-4">
        <!-- Hero Banner -->
        <HeroBanner />

        <!-- Search Bar -->
        <div class="mt-6 mb-6">
            <input v-model="searchQuery" placeholder="Cari produk..."
                class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <!-- Kategori -->
        <div class="mb-6">
            <h2 class="text-2xl font-bold mb-3">Kategori</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div v-for="category in categories" :key="category.name"
                    class="flex flex-col items-center p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-transform transform hover:scale-105">
                    <img :src="category.icon" alt="icon" class="w-12 h-12 mb-2" />
                    <span class="capitalize">{{ category.name }}</span>
                </div>
            </div>
        </div>

        <!-- Produk Populer -->
        <div class="mb-6">
            <h2 class="text-2xl font-bold mb-3">Produk Populer</h2>
            <div class="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
                <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product"
                    class="min-w-[280px] sm:min-w-[300px]" />
            </div>
        </div>

        <!-- Penawaran Khusus -->
        <div class="mb-6">
            <h2 class="text-2xl font-bold mb-3">Penawaran Khusus</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="relative">
                    <img src="/assets/media/offer/offer1.jpg" alt="Penawaran 1"
                        class="w-full h-48 object-cover rounded-lg" />
                    <div class="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
                    <div class="absolute inset-0 flex flex-col justify-center items-center text-white">
                        <h3 class="text-xl font-bold">Diskon Hingga 50%</h3>
                        <p class="mt-2">Tawaran Terbatas!</p>
                    </div>
                </div>
                <div class="relative">
                    <img src="/assets/media/offer/offer2.png" alt="Penawaran 2"
                        class="w-full h-48 object-cover rounded-lg" />
                    <div class="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
                    <div class="absolute inset-0 flex flex-col justify-center items-center text-white">
                        <h3 class="text-xl font-bold">Gratis Ongkir</h3>
                        <p class="mt-2">Untuk pembelian di atas Rp500.000</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Rekomendasi untuk Anda -->
        <div class="mb-6">
            <h2 class="text-2xl font-bold mb-3">Rekomendasi untuk Anda</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <ProductCard v-for="product in recommendedProducts" :key="product.id" :product="product" />
            </div>
        </div>

        <!-- Testimoni Pelanggan -->
        <div class="mb-6">
            <Testimonial :testimonials="testimonialData" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import HeroBanner from "../components/HeroBanner.vue";
import ProductCard from "../components/ProductCard.vue";
import Testimonial from "../components/Testimonial.vue";

// Data produk & kategori
import products from "../data/products.json";
import categories from "../data/category.json";
// Import data testimonial dan beri alias agar tidak bentrok
import testimonialData from "../data/testimonial.json";

const searchQuery = ref("");

const filteredProducts = computed(() =>
    products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
);

// Simulasi rekomendasi produk; di sini mengambil 3 produk pertama sebagai contoh
const recommendedProducts = computed(() => products.slice(0, 3));
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>