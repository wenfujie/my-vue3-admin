<template>
  <icon-font :type="item?.meta?.icon" />
  <span>{{ item?.meta?.title }}</span>
</template>

<script lang="ts" setup>
import type { RouteRecordRaw } from "vue-router";

defineOptions({
  name: "MenuItemContent",
});

defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    default: () => ({}),
  },
});
</script>
