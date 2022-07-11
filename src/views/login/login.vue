<script lang='ts'>
import { defineComponent, onMounted, ref, reactive } from "vue";
import http from "@/service/http";
import { useRouter } from "vue-router";
import { Message } from "@/utils/tool.js";
import { FormRules, FormInstance } from "element-plus";
import { useUserInfo } from "@/stores/user";
import icon from "@/components/icon.vue";
export default defineComponent({
  components: { icon },
  setup() {
    onMounted(() => {
      handleChangeCheckCode();
    });
    const user = useUserInfo();
    const formRef = ref<FormInstance>();
    const formValue = reactive({
      name: "admin",
      password: "elang1234",
      code: "",
    });
    const router = useRouter();

    const currentDateTime = ref(0);
    const img = ref("");
    // 获取验证码
    const handleChangeCheckCode = () => {
      currentDateTime.value = new Date().getTime();
      http
        .get(`/sys/randomImage/${currentDateTime.value}`)
        .then((res: any) => {
          img.value = res.result;
        })
        .catch((err) => {
          Message("error", "获取验证码失败");
          console.error(err);
        });
    };
    const loading = ref(false);
    const rules = reactive<FormRules>({
      name: [
        {
          required: true,
          message: "请输入账号",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "change",
        },
        { min: 6, max: 12, message: "密码长度在6到12位", trigger: "blur" },
      ],
      code: [
        {
          required: true,
          message: "请输入验证码",
          trigger: "change",
        },
      ],
    });
    return {
      formRef,
      handleChangeCheckCode,
      currentDateTime,
      formValue,
      img,
      router,
      loading,
      rules,
      // 登录
      login() {
        router.push({ path: "/dataSource" });
      },
    };
  },
});
</script>

<template>
  <div id="userLayout" class="user-layout-wrapper">
    <div class="container">
      <div class="top">
        <div class="header">
          <img class="logo" src="../../assets/elogo.png" alt="" />
          <span class="title">熠朗资源数据库后台</span>
        </div>
      </div>

      <div class="login-form-content">
        <div class="l-g-car">
          <el-form label-position="right" label-width="70px" :model="formValue">
            <el-input
              size="large"
              class="l-g-card-input"
              placeholder="输入账号"
              v-model="formValue.name"
            >
              <template #prefix>
                <icon icon="carbon:account" />
              </template>
            </el-input>
            <el-input
              size="large"
              class="l-g-card-input"
              v-model="formValue.password"
              type="password"
              placeholder="输入密码"
              show-password
            >
              <template #prefix>
                <icon icon="ic:baseline-password" />
              </template>
            </el-input>
            <el-space>
              <el-input
                size="large"
                class="l-g-card-input"
                placeholder="输入验证码"
                v-model="formValue.code"
              >
                <template #prefix>
                  <icon icon="ic:baseline-app-blocking" />
                </template>
              </el-input>
              <img class="checkcode" src="../../assets/checkcode.png" alt="" />
            </el-space>
            <div class="btn-content">
              <el-button
                style="width: 100%"
                size="large"
                type="primary"
                @click="login"
              >
                登 录
              </el-button>
            </div>
          </el-form>
        </div>
      </div>

      <div class="footer">
        <div class="copyright">
          <el-space>
            <span> Copyright</span>
            <icon icon="ant-design:copyright-circle-outlined" />
            <span>2022 熠朗科技 出品</span>
          </el-space>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='less'>
.checkcode {
  width: 115px;
}
.btn-content {
  margin: 30px 0;
}
.l-g-card-input {
  margin: 10px 0;
}
.l-g-car {
  width: 350px;
  margin: 20px auto;
}
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    height: 100vh;
    box-sizing: border-box;
    background: #f0f2f5 url(@/assets/background.svg) repeat 50%;
    background-size: 100%;
    padding: 110px 0 144px;
    position: relative;

    a {
      text-decoration: none;
    }

    .top {
      text-align: center;

      .header {
        height: 44px;
        line-height: 44px;

        .badge {
          position: absolute;
          display: inline-block;
          line-height: 1;
          vertical-align: middle;
          margin-left: -12px;
          margin-top: -10px;
          opacity: 0.8;
        }

        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
          border-style: none;
        }

        .title {
          font-size: 26px;
          color: #000;
        }
      }
      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }

    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 48px 0 24px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;
        a {
          color: rgba(0, 0, 0, 0.45);
          transition: all 0.3s;
          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }
      .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
  }
}
</style>
