<template>
  <div>
    <a-switch v-model:checked="checked"></a-switch>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const checked = ref(true);
</script>

<style scoped></style>
