<template>
  <div>
    <Alert message="游戏介绍" type="info" show-icon>
      <template #description> 英雄联盟 -- 根据数组格式的数据进行导出 </template>
    </Alert>
    <Card title="英雄列表mock数据" style="margin-top: 20px">
      <DynamicTable
        size="small"
        bordered
        :data-request="loadData"
        :columns="columns"
        row-key="heroid"
        export-file-name="表格自带导出"
        :custom-row="customRow"
      >
        <template #toolbar>
          <a-button type="primary"> 创建 </a-button>
          <a-button type="default"> 上传图片 </a-button>
        </template>
      </DynamicTable>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { Alert, Card } from 'ant-design-vue';
  import { columns } from './columns';
  import { useTable } from '@/components/core/dynamic-table';
  import { getLolHeroList } from '@/views/demos/api';

  defineOptions({
    name: 'DemosTablesLolTable',
  });

  const [DynamicTable, dynamicTableInstance] = useTable();

  let tableData: any[] = [];

  const loadData = async (params) => {
    const data = await getLolHeroList(params);
    dynamicTableInstance?.getQueryFormRef()?.updateSchema?.([
      {
        field: 'other',
        componentProps: {
          options: [
            {
              label: '皮肤1',
              value: 'aa',
            },
            {
              label: '皮肤2',
              value: 'bb',
            },
          ],
        },
      },
    ]);

    tableData = data.list;
    return data;
  };

  const customRow = (record) => {
    return {
      onContextmenu: (e: MouseEvent) => {
        console.log('%c 右键回调', 'color:#0f0;');
      },
    };
  };
</script>

<style lang="less" scoped></style>
