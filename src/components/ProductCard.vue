<template>
  <el-card class="product-card" shadow="hover" @click="emit('go-to-product', props.id)">
    <el-image :src="props.image" fit="contain" alt="{{ props.name }}" draggable="false" hover />
    <template #footer>
      <el-text class="truncate-text">{{ props.title }}</el-text>
      <el-text type="success">$ {{ props.price.toLocaleString() }}</el-text>
      <div>
        <el-button
          class="add-to-cart-btn"
          :type="cartStore.isInCart(props.id) ? 'danger' : 'primary'"
          @click.stop="
            {
              {
                cartStore.isInCart(props.id)
                  ? emit('remove-from-cart', props.id)
                  : emit('add-to-cart', props.id);
              }
            }
          "
          >{{ cartStore.isInCart(props.id) ? 'Remove from Cart' : 'Add to Cart' }}</el-button
        >
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore';

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

const emit = defineEmits<{
  (e: 'add-to-cart', id: number): void;
  (e: 'remove-from-cart', id: number): void;
  (e: 'go-to-product', id: number): void;
}>();

const cartStore = useCartStore();
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
  border-radius: 4px;
  text-align: center;
  margin-top: 1.5rem;
}
</style>
