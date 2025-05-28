<template>
  <el-card class="product-card" shadow="hover">
    <el-image :src="props.image" fit="contain" alt="{{ props.name }}" draggable="false" hover />
    <template #footer>
      <el-text class="truncate-text">{{ props.title }}</el-text>
      <el-text type="success">$ {{ props.price.toLocaleString() }}</el-text>
      <div>
        <el-button class="add-to-cart-btn">Add to Cart</el-button>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: number;
  title: string;
  price: number;
  description: string;
  category?: string;
  image?: string;
  rating?: {
    rate: number;
    count: number;
  };
}>();
</script>

<style scoped>
:deep(.el-image__inner) {
  max-width: 100%;
  aspect-ratio: 3/2;
}

.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 1;
  box-orient: vertical;
}

.add-to-cart-btn {
  width: 100%;
  background-color: #409eff;
  color: white;
  border-radius: 4px;
  text-align: center;
  margin-top: 0.5rem;
}
</style>
