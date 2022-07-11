<script lang='ts'>
import { defineComponent, watch, h, ref } from "vue";
import { TreeOption } from "naive-ui";
import { Message } from "@/utils/tool.js";
import { useRouter } from "vue-router";
const data: TreeOption[] = [
  {
    label: "精准扶贫",
    key: "0",
    children: [
      {
        label: "0-0",
        key: "0-0",
        children: [
          { label: "嘻嘻嘻", key: "0-0-23" },
          { label: "嘿嘿嘿", key: "0-0-32" },
        ],
      },
      {
        label: "0-1",
        key: "0-1",
        children: [
          { label: "0-0-0", key: "0-0-0" },
          { label: "0-0-1", key: "0-0-1" },
        ],
      },
    ],
  },
  {
    // label: '1',
    prefix: () => h("text", "prefix"),
    key: "1",
    children: [
      {
        label: "1-0",
        key: "1-0",
        children: [
          { label: "1-0-0", key: "1-0-0" },
          { label: "1-0-1", key: "1-0-1" },
        ],
      },
      {
        label: "1-1",
        key: "1-1",
        children: [
          { label: "1-1-0", key: "1-1-0" },
          { label: "1-1-1", key: "1-1-1" },
        ],
      },
    ],
  },
];
interface formData {
  timeRadio: string;
  timeRange: string | null;
  field: string;
  operator: string;
  condition: string;
  downloadType: string;
}

export default defineComponent({
  setup() {
    const formData = ref<formData>({
      timeRadio: "1",
      timeRange: "",
      field: "",
      operator: "",
      condition: "",
      downloadType: "",
    });
    const router = useRouter();
    return {
      data,
      formData,
      pattern: ref(""),
      loading: ref(false),
      tableData: ref([]),
      fieldOptions: ref([
        {
          label: "指标1",
          value: "1",
        },
        {
          label: "指标1",
          value: "2",
        },
        {
          label: "指标1",
          value: "3",
        },
        {
          label: "指标1",
          value: "4",
        },
        {
          label: "指标1",
          value: "5",
        },
      ]),
      operatorOptions: ref([
        {
          label: ">",
          value: "1",
        },
        {
          label: ">=",
          value: "2",
        },
        {
          label: "<",
          value: "3",
        },
        {
          label: "<=",
          value: "4",
        },
        {
          label: "=",
          value: "5",
        },
        {
          label: "!=",
          value: "6",
        },
      ]),

      conditionForm: ref({
        field: "",
        operator: "",
        value: "",
      }),
      sendEmail: ref(false),
      receive: ref("默认自己"),
      removeHandle() {
        Message("success", "移除!");
      },
      // 添加条件筛选
      addCondition() {},
      goPreview() {
        router.push({ path: "/previewdata" });
      },
    };
  },
});
</script>
<template>
  <div class="multiple-query-tree">
    <el-row :gutter="25">
      <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
        <div class="fixed-wrap">
          <n-space vertical :size="12">
            <n-input v-model:value="pattern" placeholder="搜索表名" clearable />
            <n-tree
              expand-on-click
              :show-irrelevant-nodes="false"
              checkable
              cascade
              :pattern="pattern"
              :data="data"
              block-line
            />
          </n-space>
        </div>
      </el-col>
      <el-col :xs="16" :sm="16" :md="16" :lg="18" :xl="18">
        <n-spin :show="loading">
          <div class="card-content">
            <n-card class="c-c-item" title="时间设置" size="large">
              <n-space justify="start" align="start">
                <n-radio-group
                  v-model:value="formData.timeRadio"
                  name="radiogroup"
                >
                  <n-radio value="1">时间区间</n-radio>
                  <n-radio value="2">时间不限</n-radio>
                </n-radio-group>
              </n-space>
              <div v-if="formData.timeRadio === '1'" style="margin: 25px 0">
                <n-date-picker
                  v-model:value="formData.timeRange"
                  type="daterange"
                  style="width: 40%; min-width: 250px"
                  clearable
                />
              </div>
            </n-card>
            <n-card class="c-c-item" title="字段设置" size="large">
              <div class="choosen">
                <div class="c-header">
                  <n-space justify="space-between">
                    <div>指标(3/9)</div>
                    <div>
                      <n-button size="tiny" type="error">全部删除</n-button>
                    </div>
                  </n-space>
                </div>
                <div class="c-main-content">
                  <div class="c-m-c-item">
                    <n-space justify="space-between" align="center">
                      <span>指标1</span>
                      <icon icon="gala:remove" @click="removeHandle" />
                    </n-space>
                  </div>
                  <div class="c-m-c-item">
                    <n-space justify="space-between" align="center">
                      <span>指标1</span>
                      <icon icon="gala:remove" @click="removeHandle" />
                    </n-space>
                  </div>
                  <div class="c-m-c-item">
                    <n-space justify="space-between" align="center">
                      <span>指标1</span>
                      <icon icon="gala:remove" @click="removeHandle" />
                    </n-space>
                  </div>
                  <div class="c-m-c-item">
                    <n-space justify="space-between" align="center">
                      <span>指标1</span>
                      <icon icon="gala:remove" @click="removeHandle" />
                    </n-space>
                  </div>
                </div>
              </div>
            </n-card>
            <n-card class="c-c-item" title="条件筛选" size="large">
              <n-form
                ref="formRef"
                inline
                label-placement="left"
                :model="conditionForm"
              >
                <n-form-item label="字段" path="field">
                  <n-select
                    v-model:value="conditionForm.field"
                    class="select-sty"
                    placeholder="选择指标"
                    :options="fieldOptions"
                  />
                </n-form-item>
                <n-form-item label="运算符" path="operator">
                  <n-select
                    v-model:value="conditionForm.operator"
                    style="width: 80px"
                    placeholder="选择运算符"
                    :options="operatorOptions"
                  />
                </n-form-item>
                <n-form-item label="条件值" path="value">
                  <n-input
                    v-model:value="conditionForm.value"
                    placeholder="输入条件值"
                  />
                </n-form-item>
                <n-form-item>
                  <n-button type="info" @click="addCondition"> 添加 </n-button>
                </n-form-item>
              </n-form>
              <div class="conditions-table">
                <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="1" label="序号" width="80" />
                  <el-table-column prop="2" label="字段" width="180" />
                  <el-table-column prop="3" label="运算符" width="180" />
                  <el-table-column prop="4" label="条件值" width="180" />
                  <el-table-column prop="5" label="单位" width="180" />
                  <el-table-column prop="6" label="操作" fixed="right">
                    <template #default>
                      <n-button type="info" text>删除</n-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </n-card>
            <n-card class="c-c-item" title="下载设置" size="large">
              <n-alert type="info">选择文件输出格式</n-alert>
              <n-radio-group
                v-model:value="formData.downloadType"
                name="radiogroup"
              >
                <n-space vertical>
                  <n-space class="download-type">
                    <div>xlsx格式</div>
                    <n-radio value="1"> xlsx </n-radio>
                  </n-space>
                  <n-space class="download-type">
                    <div>csv格式</div>
                    <n-radio value="2"> csv </n-radio>
                  </n-space>
                  <n-space class="download-type">
                    <div>txt格式</div>
                    <n-radio value="3"> txt </n-radio>
                  </n-space>
                  <n-space class="download-type">
                    <div>其他格式</div>
                    <n-radio value="4"> xml </n-radio>
                    <n-radio value="5"> html </n-radio>
                  </n-space>
                </n-space>
              </n-radio-group>
              <div class="send-email">
                <n-checkbox v-model:checked="sendEmail">
                  发送到邮箱
                </n-checkbox>
              </div>
              <div v-if="sendEmail">
                <n-input
                  style="width: 250px"
                  placeholder="请输入接收邮箱"
                  v-model:value="receive"
                ></n-input>
              </div>
            </n-card>
            <div class="operator-content">
              <n-button class="o-p-btn" type="primary">
                <icon icon="bi:download" /> 下载数据</n-button
              >
              <n-button class="o-p-btn mar" type="info" @click="goPreview">
                <icon icon="icon-park-outline:preview-open" />预览数据</n-button
              >
              <n-button class="o-p-btn" type="warning">
                <icon icon="carbon:reset" />重置</n-button
              >
            </div>
          </div>
        </n-spin>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped lang='less'>
.c-c-item {
  margin-bottom: 30px;
}
.fixed-wrap {
  background: #fff;
  position: sticky;
  padding: 10px 5px;
  position: -webkit-sticky;
  top: 100px;
}
.choosen {
  width: 40%;
  min-width: 300px;
  .c-header {
    font-size: 16px;
    color: #333;
    padding: 6px 0;
    border-bottom: 1px solid rgba(201, 201, 201, 0.76);
  }
  .c-main-content {
    margin: 5px 0;
    .c-m-c-item {
      font-size: 16px;
      color: #333;
      padding: 5px 10px;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        background-color: rgba(236, 236, 236, 0.596);
      }
    }
  }
}
.select-sty {
  width: 250px;
}
.download-type {
  margin: 8px 15px 8px 0;
  div {
    width: 80px;
  }
}
.operator-content {
  background: #fff;
  border: 1px solid #f1f1f1;
  padding: 20px 16px;
  position: sticky;
  position: -webkit-sticky;
  bottom: 0;
  text-align: right;
  z-index: 11;
  .mar {
    margin: 0 30px;
  }
}
.send-email {
  margin: 8px 0;
}
</style>



<style lang="less">
.multiple-query-tree {
  .n-tree {
    .n-tree-node {
      padding: 4px 0;
    }
  }
}
</style>
