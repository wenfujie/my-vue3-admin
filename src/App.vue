<template>
  <ProConfigProvider>
    <router-view #="{ Component }">
      <component :is="Component" />
    </router-view>
  </ProConfigProvider>
</template>

<script setup lang="ts">
  import ProConfigProvider from '@/components/basic/pro-config-provider/index.vue';
</script>
