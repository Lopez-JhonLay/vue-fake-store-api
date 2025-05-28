import { defineStore } from 'pinia';

import { ref } from 'vue';

import type { Product } from '@/models/product';

import { productService } from '@/service/productService';

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([]);
  const isLoading = ref(false);

  const loadProducts = async () => {
    try {
      isLoading.value = true;
      products.value = await productService.fetchAllProducts();
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  return { products, isLoading, loadProducts };
});
