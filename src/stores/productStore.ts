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

  const loadProductById = async (id: number) => {
    try {
      isLoading.value = true;
      const product = await productService.fetchProductById(id);
      const index = products.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        products.value[index] = product;
      } else {
        products.value.push(product);
      }
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  return { products, isLoading, loadProducts };
});
