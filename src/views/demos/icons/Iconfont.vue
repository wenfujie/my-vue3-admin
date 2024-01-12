<template>
  <div>
    <Alert
      message="自定义图标"
      description="使用阿里图标库，可以有效减小项目的体积，支持离线本地图标和在线图标"
      type="info"
      show-icon
      style="margin-bottom: 12px"
    />
    <a-card>
      <Descriptions title="使用示例" :column="1">
        <Descriptions.Item label="antdv 图标效果">
          <VerticalAlignBottomOutlined :style="{ fontSize: '30px', color: '#08c' }" />
          <a href="https://www.antdv.com/components/icon-cn" target="_blank" class="ml-15px"
            >前往 antdv 图标库</a
          >
        </Descriptions.Item>

        <Descriptions.Item label="本地图标效果">
          <div class="flex flex-wrap">
            <icon-font
              v-for="name in iconNames"
              :key="name"
              class="icon"
              :type="name"
              :title="name"
              size="30"
              @click="clickIcon(name)"
            />
          </div>
        </Descriptions.Item>

        <Descriptions.Item label="远程图库地址">
          <a-input
            v-model:value="state.scriptUrl"
            style="width: 400px"
            placeholder="请输入你的阿里巴巴矢量图标库项目图标的路径"
          />
          (例如：//at.alicdn.com/t/font_1166867_7zdsgx6x88l.js)
        </Descriptions.Item>
        <Descriptions.Item label="远程图标名字">
          <a-input
            v-model:value="state.iconName"
            placeholder="请输入图标的名字"
            style="width: 200px"
          />
          （例如：icon-huanfu1、icon-zhutipifu、icon-xinwendongtai1）
        </Descriptions.Item>
        <Descriptions.Item label="远程图标效果">
          <icon-font
            v-if="state.scriptUrl && state.iconName"
            :script-url="state.scriptUrl"
            :type="state.iconName"
            size="30"
          />
          <span v-else>可以复制示例的地址和图标查看效果</span>
        </Descriptions.Item>
      </Descriptions>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { Alert, Descriptions, message } from 'ant-design-vue';
  import { VerticalAlignBottomOutlined } from '@ant-design/icons-vue';
  import { iconNames } from './icon-names';
  import { copyText } from '@/utils/browser';

  defineOptions({
    name: 'CustomIcon',
  });

  const clickIcon = async (iconName: string) => {
    await copyText(`<icon-font type="${iconName}" />`);
    message.success(`${iconName} 复制成功`);
  };
  /**
   * @description ant-design-vue配置阿里巴巴矢量图标库使用
   */
  const state = reactive({
    scriptUrl: '//at.alicdn.com/t/font_1166867_7zdsgx6x88l.js',
    iconName: 'icon-huanfu1',
    visible: false,
    imageUrl: '',
  });
</script>

<style lang="less" scoped>
  .icon {
    padding: 10px;
    &:hover {
      color: #fff;
      background-color: #1677ff;
    }
  }
</style>
