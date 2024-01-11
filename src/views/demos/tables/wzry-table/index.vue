<template>
  <div>
    <Alert message="游戏介绍" type="info" show-icon>
      <template #description>
        《王者荣耀》-- 根据JSON格式的数据进行导出
      </template>
    </Alert>
    <Card title="英雄列表mock数据" style="margin-top: 20px">
      <DynamicTable
        ref="dynamicTableRef"
        size="small"
        bordered
        :data-request="loadData"
        :columns="columns"
        row-key="heroid"
        @toggle-advanced="toggleAdvanced"
      >
        <template #toolbar>
          <a-button type="primary"> 按钮1 </a-button>
          <a-button type="primary"> 按钮2 </a-button>
        </template>
      </DynamicTable>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { Alert, Card } from "ant-design-vue";
import { columns } from "./columns";
import { useTable } from "@/components/core/dynamic-table";
import { getWzryHeroList } from "@/views/demos/api";

let tableData = [];
const [DynamicTable, dynamicTableInstance] = useTable();

// 展开搜索表单时更新英雄皮肤选项值
const toggleAdvanced = (e) => {
  if (e) {
  }
};

const loadData = async (params) => {
  const data = await getWzryHeroList(params);

  tableData = data.list;
  dynamicTableInstance?.getQueryFormRef()?.updateSchema?.([
    {
      field: "skin_name",
      componentProps: {
        options: [
          {
            label: "皮肤1",
            value: "aa",
          },
          {
            label: "皮肤2",
            value: "bb",
          },
        ],
      },
    },
  ]);
  return data;
};
</script>

<style lang="less" scoped></style>
