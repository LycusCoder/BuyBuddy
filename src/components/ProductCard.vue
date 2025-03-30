<script setup>
defineProps({
    product: {
        type: Object,
        required: true,
        default: () => ({}), // Nilai default untuk menghindari undefined
    },
});
</script>

<template>
    <div v-if="product" class="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <img :src="product.image || '/assets/default-product.jpg'" alt="Product Image"
            class="w-full h-40 object-cover" />
        <div class="p-4">
            <h3 class="font-semibold text-lg mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 mb-4 capitalize">{{ product.category }}</p>
            <div class="flex justify-between items-center">
                <span class="text-blue-600 text-xl font-bold">Rp {{ product.price }},00</span>
                <div class="flex items-center space-x-1">
                    <span class="text-yellow-500">★</span>
                    <span>{{ product.rating }}</span>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="p-4 bg-red-100 text-red-600 rounded-lg">
        Produk tidak ditemukan
    </div>
</template>
