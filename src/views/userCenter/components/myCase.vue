

<script lang='ts'>
import { useIndex } from "@/stores/user";
import { Message } from "@/utils/tool.js";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
const treeData = [
  {
    value: "1",
    label: "Level one 1",
    children: [
      {
        value: "1-1",
        label: "Level two 1-1",
        children: [
          {
            value: "1-1-1",
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    value: "2",
    label: "Level one 2",
    children: [
      {
        value: "2-1",
        label: "Level two 2-1",
        children: [
          {
            value: "2-1-1",
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        value: "2-2",
        label: "Level two 2-2",
        children: [
          {
            value: "2-2-1",
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    value: "3",
    label: "Level one 3",
    children: [
      {
        value: "3-1",
        label: "Level two 3-1",
        children: [
          {
            value: "3-1-1",
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        value: "3-2",
        label: "Level two 3-2",
        children: [
          {
            value: "3-2-1",
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
];
export default defineComponent({
  setup() {
    const us = useRouter();
    const ui = useIndex();
    const showModal = ref(false);
    const model = ref({
      name: "",
      database: "",
      field: "",
    });
    const loading = ref(false);

    return {
      loading,
      tableData: ref([
        { 1: "1", 2: "2", 3: "2", 4: "2" },
        { 1: "1", 2: "2", 3: "2", 4: "2" },
        { 1: "1", 2: "2", 3: "2", 4: "2" },
        { 1: "1", 2: "2", 3: "2", 4: "2" },
      ]),
      showModal,
      model,
      treeData,
      rules: {
        name: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入方案名",
        },
      },

      edit() {
        showModal.value = true;
      },
      confirmDelete() {
        Message("success", "删除成功");
      },
      goCase() {
        ui.setIndexKey(2);
        us.push({ path: "/index" });
      },
      cancel() {
        showModal.value = false;
      },
      confirm() {
        Message("success", "编辑成功");
        showModal.value = false;
      },
      removeHandle() {},
    };
  },
});
</script>

<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%" max-height="550">
      <el-table-column prop="1" label="方案名称">
        <template #default>
          <n-button text type="info" @click="goCase">方案名称1</n-button>
        </template>
      </el-table-column>
      <el-table-column prop="2" label="表名称" />
      <el-table-column prop="3" label="保存时间" />
      <el-table-column prop="4" label="操作">
        <template #default>
          <n-button text type="info" @click="edit">编辑</n-button>
          <n-divider vertical />
          <n-popconfirm @positive-click="confirmDelete">
            <template #trigger>
              <n-button text type="info">删除</n-button>
            </template>
            确定删除此方案吗?
          </n-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 700px"
      title="编辑方案"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-spin :show="loading">
        <div class="content-card">
          <n-form
            ref="formRef"
            :model="model"
            :rules="rules"
            label-placement="left"
            label-width="auto"
            require-mark-placement="right-hanging"
          >
            <n-form-item label="方案名" path="name">
              <n-input v-model:value="model.name" placeholder="请输入方案名" />
            </n-form-item>
            <n-form-item label="选择表">
              <el-tree-select
                v-model="model.database"
                :data="treeData"
                multiple
                style="width: 100%"
                :render-after-expand="false"
                show-checkbox
              />
            </n-form-item>
            <n-form-item label="指标">
              <el-row
                style="width: 100%"
                :gutter="10"
                align="top"
                justify="space-between"
              >
                <el-col :span="11">
                  <div class="choosen">
                    <div class="c-header">
                      <n-space justify="space-between">
                        <div>全部指标(12)</div>
                        <div>
                          <n-button size="tiny" type="info">全部添加</n-button>
                        </div>
                      </n-space>
                    </div>
                    <div class="c-main-content">
                      <n-scrollbar style="max-height: 220px">
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1指标1指 </el-col>
                            <el-col :span="4">
                              <icon
                                icon="carbon:add-alt"
                                @click="removeHandle"
                              />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1指标1指 </el-col>
                            <el-col :span="4">
                              <icon
                                icon="carbon:add-alt"
                                @click="removeHandle"
                              />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1指标1指 </el-col>
                            <el-col :span="4">
                              <icon
                                icon="carbon:add-alt"
                                @click="removeHandle"
                              />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1指标1指 </el-col>
                            <el-col :span="4">
                              <icon
                                icon="carbon:add-alt"
                                @click="removeHandle"
                              />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1指标1指 </el-col>
                            <el-col :span="4">
                              <icon
                                icon="carbon:add-alt"
                                @click="removeHandle"
                              />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1指标1指 </el-col>
                            <el-col :span="4">
                              <icon
                                icon="carbon:add-alt"
                                @click="removeHandle"
                              />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1指标1指 </el-col>
                            <el-col :span="4">
                              <icon
                                icon="carbon:add-alt"
                                @click="removeHandle"
                              />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1指标1指 </el-col>
                            <el-col :span="4">
                              <icon
                                icon="carbon:add-alt"
                                @click="removeHandle"
                              />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1指标1指 </el-col>
                            <el-col :span="4">
                              <icon
                                icon="carbon:add-alt"
                                @click="removeHandle"
                              />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1指标1指 </el-col>
                            <el-col :span="4">
                              <icon
                                icon="carbon:add-alt"
                                @click="removeHandle"
                              />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1指标1指 </el-col>
                            <el-col :span="4">
                              <icon
                                icon="carbon:add-alt"
                                @click="removeHandle"
                              />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1指标1指 </el-col>
                            <el-col :span="4">
                              <icon
                                icon="carbon:add-alt"
                                @click="removeHandle"
                              />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1指标1指 </el-col>
                            <el-col :span="4">
                              <icon
                                icon="carbon:add-alt"
                                @click="removeHandle"
                              />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1指标1指 </el-col>
                            <el-col :span="4">
                              <icon
                                icon="carbon:add-alt"
                                @click="removeHandle"
                              />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1指标1指 </el-col>
                            <el-col :span="4">
                              <icon
                                icon="carbon:add-alt"
                                @click="removeHandle"
                              />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1指标1指 </el-col>
                            <el-col :span="4">
                              <icon
                                icon="carbon:add-alt"
                                @click="removeHandle"
                              />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1指标1指 </el-col>
                            <el-col :span="4">
                              <icon
                                icon="carbon:add-alt"
                                @click="removeHandle"
                              />
                            </el-col>
                          </el-row>
                        </div>
                      </n-scrollbar>
                    </div>
                  </div>
                </el-col>
                <el-col :span="2">
                  <div style="margin: 50px 0">
                    <icon icon="fa:exchange" size="16px" />
                  </div>
                </el-col>
                <el-col :span="11">
                  <div class="choosen">
                    <div class="c-header">
                      <n-space justify="space-between">
                        <div>已选指标(3)</div>
                        <div>
                          <n-button size="tiny" type="info">全部删除</n-button>
                        </div>
                      </n-space>
                    </div>
                    <div class="c-main-content">
                      <n-scrollbar style="max-height: 220px">
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1 </el-col>
                            <el-col :span="4">
                              <icon icon="gala:remove" @click="removeHandle" />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1 </el-col>
                            <el-col :span="4">
                              <icon icon="gala:remove" @click="removeHandle" />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1 </el-col>
                            <el-col :span="4">
                              <icon icon="gala:remove" @click="removeHandle" />
                            </el-col>
                          </el-row>
                        </div>
                        <div class="c-m-c-item">
                          <el-row :gutter="10" align="middle">
                            <el-col :span="20"> 指标1 </el-col>
                            <el-col :span="4">
                              <icon icon="gala:remove" @click="removeHandle" />
                            </el-col>
                          </el-row>
                        </div>
                      </n-scrollbar>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </n-form-item>
          </n-form>
        </div>
      </n-spin>
      <template #footer>
        <div class="btn-content">
          <n-button class="b-c-btn" @click="cancel">取消</n-button>
          <n-button type="primary" class="b-c-btn" @click="confirm">
            确定
          </n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<style scoped lang='less'>
.btn-content {
  padding: 15px 0 0;
  text-align: right;
  .b-c-btn {
    margin: 0 10px;
  }
}
.choosen {
  min-width: 200px;
  .c-header {
    font-size: 14px;
    color: #333;
    padding: 6px 0;
    border-bottom: 1px solid rgba(201, 201, 201, 0.76);
  }
  .c-main-content {
    margin: 5px 0;
    .c-m-c-item {
      font-size: 14px;
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
</style>
