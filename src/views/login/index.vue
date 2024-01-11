<template>
  <div class="login-box">
    <div class="login-logo">
      <img src="~@/assets/images/logo.png" width="45" />
      <h1 class="mb-0 ml-2 text-3xl font-bold">Antd Admin</h1>
    </div>
    <a-form
      layout="horizontal"
      :model="state.formInline"
      @submit.prevent="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-model:value="state.formInline.username"
          size="large"
          placeholder="请输入账号"
        >
          <template #prefix><user-outlined type="user" /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value="state.formInline.password"
          size="large"
          type="password"
          placeholder="请输入密码"
          autocomplete="new-password"
        >
          <template #prefix><lock-outlined type="user" /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          size="large"
          :loading="state.loading"
          block
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { useUserStore } from "@/store/modules/user";

const state = reactive({
  loading: false,
  formInline: {
    username: "",
    password: "",
  },
});

const router = useRouter();

const userStore = useUserStore();

const handleSubmit = async () => {
  const { username, password } = state.formInline;
  if (username.trim() == "" || password.trim() == "") {
    return message.warning("用户名或密码不能为空！");
  }
  message.loading("登录中...", 0);
  state.loading = true;

  await userStore.login(state.formInline);
  message.success("登录成功！");
  state.loading = false;
  message.destroy();
  setTimeout(() => router.replace("/dashboard/welcome"), 1000);
};
</script>

<style lang="less" scoped>
.login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding-top: 240px;
  background: url("@/assets/login.svg");
  background-size: 100%;

  .login-logo {
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    .svg-icon {
      font-size: 48px;
    }
  }

  :deep(.ant-form) {
    width: 400px;

    .ant-col {
      width: 100%;
    }

    .ant-form-item-label {
      padding-right: 6px;
    }
  }
}
</style>
