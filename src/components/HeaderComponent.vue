<template>
  <div><h3>Pekeng Tindahan</h3></div>
  <div style="display: flex; gap: 1rem">
    <el-badge :value="cartStore.totalItems" class="item" type="primary">
      <el-button :icon="ShoppingCart">Cart</el-button>
    </el-badge>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore';

import { ShoppingCart } from '@element-plus/icons-vue';

const cartStore = useCartStore();
</script>

<style scoped></style>
