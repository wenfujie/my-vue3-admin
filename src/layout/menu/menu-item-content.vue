<template>
  <icon-font :type="item?.meta?.icon" />
  <span>{{ item?.meta?.title}}</span>
</template>

<script lang="ts" setup>
  import type { RouteRecordRaw } from 'vue-router';
  import { IconFont } from '@/components/basic/iconfont';

  defineOptions({
    name: 'MenuItemContent',
  });

  defineProps({
    item: {
      type: Object as PropType<RouteRecordRaw>,
      default: () => ({}),
    },
  });
</script>
