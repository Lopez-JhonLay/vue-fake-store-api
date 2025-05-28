<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div><h3>Pekeng Tindahan</h3></div>
        <div style="display: flex; gap: 1rem">
          <el-input
            v-model="input2"
            style="width: 240px"
            placeholder="Type something"
            :prefix-icon="Search"
            class="hidden-sm-and-down"
          />
          <el-badge :value="cartStore.totalItems" class="item" type="primary">
            <el-button :icon="ShoppingCart">Cart</el-button>
          </el-badge>
        </div>
      </el-header>
      <el-divider />
      <el-main>
        <el-input
          v-model="input2"
          style="width: 240px; margin-bottom: 20px"
          placeholder="Type something"
          :prefix-icon="Search"
          class="hidden-md-and-up"
        />
        <el-row :gutter="20">
          <template v-if="productStore.isLoading">
            <el-col v-for="n in 10" :key="n" :xs="24" :sm="24" :md="12" :lg="8" :xl="4">
              <ProductCardSkeleton />
            </el-col>
          </template>
          <template v-else>
            <el-col
              v-for="product in productStore.products"
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
                @add-to-cart="handleAddToCart(product.id)"
                @remove-from-cart="handleRemoveFromCart(product.id)"
              />
            </el-col>
          </template>
        </el-row>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Search, ShoppingCart } from '@element-plus/icons-vue';

import { useProductStore } from './stores/productStore';
import { useCartStore } from './stores/cartStore';

import ProductCard from './components/ProductCard.vue';
import ProductCardSkeleton from './components/ProductCardSkeleton.vue';

const productStore = useProductStore();
const cartStore = useCartStore();

const input2 = ref('');

const handleAddToCart = (id: number) => {
  console.log(`Adding product with id ${id} to cart.`);
  const product = productStore.products.find((p) => p.id === id);

  if (!product) {
    console.error(`Product with id ${id} not found.`);
    return;
  }

  const item = {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    quantity: 1,
  };

  cartStore.addToCart(item);
};

const handleRemoveFromCart = (id: number) => {
  cartStore.removeFromCart(id);
};

onMounted(() => {
  productStore.loadProducts();
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
