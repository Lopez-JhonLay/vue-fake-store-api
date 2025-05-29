<template>
  <el-drawer v-model="isCartDrawerOpen" title="I am the title" direction="rtl">
    <span>Hi, there!</span>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  modelValue?: boolean;
}>();

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();

const isCartDrawerOpen = ref(props.modelValue);

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
</script>

<style scoped></style>
