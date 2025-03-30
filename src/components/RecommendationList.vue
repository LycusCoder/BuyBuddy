<script setup>
import ProductCard from './ProductCard.vue'; // Pastikan import ini ada

defineProps({
  products: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <ProductCard 
      v-for="product in products" 
      :key="product.id" 
      :product="product"
    />
  </div>
</template>