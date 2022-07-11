<script lang='ts'>
import { defineComponent, onMounted, ref, reactive } from "vue";
import http from "@/service/http";
import { useRouter } from "vue-router";
import { Message } from "@/utils/tool.js";
import { FormRules, FormInstance } from "element-plus";
import { useUserInfo } from "@/stores/user";
import mechanismVue from "./component/mechanism.vue";
import person from "./component/person.vue";
import register from "./component/register.vue";
import iplogin from "./component/iplogin.vue";
export default defineComponent({
  components: { mechanismVue, person, iplogin, register },
  setup() {
    onMounted(() => {
      handleChangeCheckCode();
    });
    const user = useUserInfo();
    const formRef = ref<FormInstance>();
    const formValue = reactive({
      account: "admin",
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
    const show = ref(true);
    const loading = ref(false);
    return {
      formRef,
      handleChangeCheckCode,
      currentDateTime,
      formValue,
      img,
      router,
      loading,
      show,
      rules: reactive<FormRules>({
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          { min: 6, max: 15, message: "最少6位密码", trigger: "blur" },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      }),
      showChange() {
        show.value = !show.value;
      },
      // 登录
      login(formEl: FormInstance | undefined) {
        formEl?.validate((valid, fields) => {
          if (valid) {
            let params = {
              captcha: formValue.code,
              checkKey: currentDateTime.value,
              password: formValue.password,
              username: formValue.account,
            };
            loading.value = true;
            http
              .post("/sys/login", params)
              .then((res: any) => {
                loading.value = false;
                if (res.success) {
                  router.push({ path: "/" });
                  user.add(res);
                } else {
                  handleChangeCheckCode();
                }
              })
              .catch((err) => {
                loading.value = false;
                Message("error", "请求错误");
              });
          }
        });
      },
    };
  },
});
</script>

<template>
  <div class="main-container">
    <div class="head-topic">
      <div class="g-layout-container">资源数据库</div>
    </div>
    <div class="main-content">
      <n-space justify="center" class="main-content-f">
        <div class="login-content">
          <div v-if="show">
            <n-card class="ncard" :bordered="false">
              <template #header>
                <span class="login-title">账号登录</span>
              </template>
              <n-tabs
                size="large"
                class="card-tabs"
                default-value="mechanism"
                animated
              >
                <n-tab-pane name="mechanism" tab="密码登录">
                  <mechanismVue />
                </n-tab-pane>
                <!-- <n-tab-pane name="person" tab="个人登录">
                <person />
              </n-tab-pane> -->
                <n-tab-pane name="ip" tab="ip登录">
                  <iplogin />
                </n-tab-pane>
              </n-tabs>
              <div class="register">
                还没账号?
                <n-button text tag="a" type="primary" @click="showChange"
                  >立即申请</n-button
                >
              </div>
            </n-card>
          </div>
          <div v-else-if="!show">
            <n-card class="ncard-register" :bordered="false">
              <template #header>
                <span class="login-title">账号申请</span>
              </template>
              <register />
              <div class="register">
                <n-button text tag="a" type="info" @click="showChange"
                  >返回登录</n-button
                >
              </div>
            </n-card>
          </div>
        </div>
      </n-space>
    </div>
  </div>
</template>

<style scoped lang='less'>
.main-container {
  height: 100vh;
  min-height: 800px;
  box-sizing: content-box;
  width: 100%;
  background-image: url(@/assets/login-bg.jpg);
  background-repeat: no-repeat;
  .ncard {
    width: 400px;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.12);
  }
  .ncard-register {
    width: 500px;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.12);
  }
  .main-content-f {
    padding: 0 60px;
  }
  .login-title {
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 20px;
  }
}
.head-topic {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent);
  padding: 15px 0;
  font-size: 28px;
  letter-spacing: 2px;
  font-weight: 500;
  color: #fff;
}
.register {
  margin: 15px 2px 0;
}
</style>
