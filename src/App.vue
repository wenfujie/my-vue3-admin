<template>
  <ProConfigProvider>
    <router-view #="{ Component }">
      <component :is="Component" />
    </router-view>
  </ProConfigProvider>
</template>

<script setup lang="ts"></script>
