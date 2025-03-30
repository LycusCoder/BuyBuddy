<template>
    <div
        class="testimonial-section bg-gradient-to-r from-indigo-50 to-blue-50 rounded-3xl p-8 md:p-12 shadow-xl relative">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">Apa Kata Mereka?</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="(testimonial, index) in testimonials" :key="index"
                class="testimonial-card bg-white rounded-2xl p-6 md:p-8 transform transition-all duration-300 shadow-md hover:scale-105 hover:shadow-lg">
                <div class="flex items-center mb-4">
                    <!-- Menampilkan gambar dari data JSON -->
                    <img :src="testimonial.image" alt="Profile Image"
                        class="w-12 h-12 rounded-full mr-4 flex-shrink-0" />
                    <div>
                        <p class="font-semibold text-gray-800">{{ testimonial.name }}</p>
                        <div class="flex space-x-1 text-yellow-500">
                            <svg v-for="i in 5" :key="i" class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path
                                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <p class="text-gray-600 leading-relaxed">{{ testimonial.message }}</p>
            </div>
        </div>

        <div class="flex justify-center mt-10">
            <button
                class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-md">
                Lihat Semua Testimonial
            </button>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    testimonials: {
        type: Array,
        default: () => []
    }
});
</script>

<style scoped>
.testimonial-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('https://www.transparenttextures.com/patterns/cubes.png');
    opacity: 0.1;
    z-index: -10;
}
</style>