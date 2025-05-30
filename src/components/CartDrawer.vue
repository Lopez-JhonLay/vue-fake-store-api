<template>
  <el-drawer
    v-model="isCartDrawerOpen"
    direction="rtl"
    :size="isMobile ? '100%' : '30%'"
    style="
      --el-drawer-bg-color: rgba(255, 255, 255, 0.25);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.18);
    "
  >
    <template #header>
      <el-text class="cart-title">{{ cartTitle }}</el-text>
    </template>
    <span>Hi, there!</span>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue';

import { useCartStore } from '@/stores/cartStore';

const props = defineProps<{
  modelValue?: boolean;
}>();

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();

const cartStore = useCartStore();

const isCartDrawerOpen = ref(props.modelValue);

const cartTitle = computed(() => `Shopping (${cartStore.totalItems}) items`);

const isMobile = ref(window.innerWidth < 768);

const handleResize = () => {
  isMobile.value = window.innerWidth < 1200;
};

watch(isCartDrawerOpen, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(
  () => props.modelValue,
  (newValue) => {
    isCartDrawerOpen.value = newValue ?? false;
  },
  { immediate: true },
);

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.cart-title {
  color: rgb(160, 39, 39);
  font-weight: bold;
  font-size: 1.2em;
}
</style>
