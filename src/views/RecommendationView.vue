<template>
  <div class="p-4">
    <!-- Rekomendasi Collaborative Filtering -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Rekomendasi Berbasis Pengguna</h2>
      <div v-if="collabRecommendations.length > 0">
        <RecommendationList :products="collabRecommendations" />
      </div>
      <div v-else class="text-gray-500">
        Tidak ada rekomendasi saat ini
      </div>
    </div>

    <!-- Rekomendasi Apriori -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Rekomendasi Berbasis Transaksi</h2>
      <div v-if="aprioriRecommendations.length > 0">
        <RecommendationList :products="aprioriRecommendations" />
      </div>
      <div v-else class="text-gray-500">
        Tidak ada rekomendasi saat ini
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '../stores/userStore';
import { getCollaborativeRecommendations } from '../services/collaborativeFiltering';
import { getAprioriRecommendations } from '../services/apriori';
import RecommendationList from '../components/RecommendationList.vue';

const userStore = useUserStore();
const userId = computed(() => userStore.currentUser?.id || 1);

// Dapatkan rekomendasi dengan threshold yang disesuaikan
const collabRecommendations = getCollaborativeRecommendations(userId.value);
const aprioriRecommendations = getAprioriRecommendations(userId.value, 0.1, 0.3); // Threshold lebih rendah

console.log('Collaborative:', collabRecommendations);
console.log('Apriori:', aprioriRecommendations);
</script>