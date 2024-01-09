<template>
  <div>登录页</div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

setTimeout(() => {
  userStore.setMenus();
  router.push("/dashboard/welcome");
}, 1000);
</script>

<style scoped></style>
