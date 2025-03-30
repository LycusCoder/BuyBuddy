<template>
    <div class="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
        <!-- User Profile -->
        <div
            class="bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div>
                <!-- Gunakan placeholder gambar berdasarkan ID user -->
                <img class="w-24 h-24 rounded-full object-cover" :src="`https://i.pravatar.cc/150?img=${user.id}`"
                    alt="Profile Picture" />
            </div>
            <div>
                <h2 class="text-3xl font-bold text-gray-800">Halo, {{ user.name }}!</h2>
                <p class="text-gray-600 mt-2">Email: {{ user.email }}</p>
            </div>
        </div>

        <!-- Purchase History -->
        <div>
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">Riwayat Pembelian</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <ProductCard v-for="productId in user.purchase_history" :key="productId"
                    :product="getProductById(productId)" />
            </div>
        </div>

        <!-- User Preferences -->
        <div>
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">Preferensi</h3>
            <div class="flex flex-wrap gap-3">
                <span v-for="pref in user.preferences" :key="pref"
                    class="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow">
                    {{ pref }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import ProductCard from "../components/ProductCard.vue";
import users from "../data/users.json";
import products from "../data/products.json";

// Ambil user dengan ID 1 dari file users.json
const user = ref(users.find((u) => u.id === 1));

// Jika field email belum ada, kita bisa menambahkannya secara default.
// Misalnya, membuat email dari nama user dengan menghapus spasi dan menambahkan domain.
if (!user.value.email) {
  user.value.email = `${user.value.name.toLowerCase().replace(/\s/g, "")}@nourivex.tech`;
}

const getProductById = (id) => {
  return products.find((p) => p.id === id);
};
</script>


<style scoped>
/* Tambahan styling jika diperlukan */
</style>