<template>
  <el-drawer
    v-model="isCartDrawerOpen"
    title="I am the title"
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
    <span>Hi, there!</span>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  modelValue?: boolean;
}>();

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();

const isCartDrawerOpen = ref(props.modelValue);

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

<style scoped></style>
