<template>
    <div class="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
        <!-- User Profile -->
        <div class="bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8"
            v-if="user">
            <div>
                <img class="w-24 h-24 rounded-full object-cover" :src="user.avatar"
                    :alt="`Profile Picture of ${user.name}`"
                    @error="(e) => e.target.src = `https://i.pravatar.cc/150?img=${user.id}`" />

            </div>
            <div>
                <h2 class="text-3xl font-bold text-gray-800">Halo, {{ user.name }}!</h2>
                <p class="text-gray-600 mt-2">Email: {{ user.email }}</p>
                <p class="text-gray-600 mt-1">No. HP: {{ user.nomorhp }}</p>
            </div>
        </div>

        <!-- Purchase History -->
        <div v-if="user && user.purchase_history">
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">Riwayat Pembelian</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <ProductCard v-for="productId in user.purchase_history" :key="productId"
                    :product="getProductById(productId)" />
            </div>
        </div>

        <!-- User Preferences -->
        <div v-if="user && user.preferences">
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ProductCard from "../components/ProductCard.vue";

const router = useRouter();
const user = ref(null);

// Ambil data pengguna dari localStorage
const loadUserData = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
        user.value = JSON.parse(userData);
    } else {
        router.push("/login");
    }
};

// Ambil data produk dari localStorage
const products = ref([]);
const loadProducts = () => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
        products.value = JSON.parse(storedProducts);
    }
};

// Dapatkan produk berdasarkan ID
const getProductById = (id) => {
    return products.value.find((p) => p.id === id);
};

onMounted(() => {
    loadUserData();
    loadProducts();
});
</script>