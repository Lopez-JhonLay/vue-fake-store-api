<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div><h3>Pekeng Tindahan</h3></div>
        <div></div>
      </el-header>
      <el-divider />
      <el-main>
        <el-row :gutter="20">
          <el-col
            v-for="product in products"
            :key="product.id"
            :xs="24"
            :sm="24"
            :md="12"
            :lg="8"
            :xl="4"
          >
            <ProductCard
              :id="product.id"
              :title="product.title"
              :image="product.image"
              :description="product.description"
              :price="product.price"
            />
          </el-col>
        </el-row>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import axios from 'axios';

import type { Product } from '@/models/product';

import ProductCard from './components/ProductCard.vue';

const products = ref<Product[]>([]);
const isLoading = ref<boolean>(false);

const loadProducts = async () => {
  try {
    isLoading.value = true;
    const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
    products.value = response.data;
    console.log('Products response data:', response.data);
    console.log('Products:', products.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadProducts();
});
</script>

<style scoped>
:deep(.el-container) {
  width: 100%;
  max-width: 1800px;
  height: 100vh;
  margin: 0 auto;
}

:deep(.el-header) {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:deep(.el-divider) {
  margin: 0;
}

.el-col {
  margin-bottom: 20px;
}
</style>
