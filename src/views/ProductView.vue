<template>
  <div>{{ productStore.selectedProduct?.title }}</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { useProductStore } from '@/stores/productStore';

const props = defineProps<{ id: number }>();

const productStore = useProductStore();

onMounted(async () => {
  console.log(`Loading product with id ${props.id}.`);
  await productStore.loadProductById(props.id);
  console.log(productStore.selectedProduct);
});
</script>

<style scoped></style>
