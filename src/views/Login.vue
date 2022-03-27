<script lang="ts" setup>
import { reactive, ref } from "vue";
import { login } from "@/api/login";
import { ElForm } from "element-plus";
import { Lock, UserFilled } from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { SAVE_WEB_TITLE_SUFFIX } from "@/store/mutations-types";
import { getSiteInfo } from "@/api/siteSetting";
import { msgError, msgSuccess } from "@/utils/message";
import { isNotEmpty } from "@/utils/func";
import { Md5 } from 'ts-md5/dist/md5';

const router = useRouter()
const store = useStore()

const loginForm = reactive<any>({
  username: '',
  password: ''
})
const loginFormRules = reactive<any>({
  username: [{required: true, message: '请输入用户名', trigger: 'blur'},],
  password: [{required: true, message: '请输入密码', trigger: 'blur'},]
})
const loginFormRef = ref<any>()

const resetLoginForm = () => {
  if (!loginFormRef.value) {
    return
  }
  loginFormRef.value.resetFields()
}

const handleLogin = () => {
  if (!loginFormRef.value) {
    return;
  }
  loginFormRef.value.validate((valid: any) => {
    if (valid) {
      const param = {
        username: loginForm.username,
        password: Md5.hashStr(loginForm.password)
      }
      login(param).then((res: any) => {
        if (res.code === 200) {
          const {token, user} = res.data
          window.localStorage.setItem('token', token)
          if (isNotEmpty(user)) {
            window.localStorage.setItem('user', JSON.stringify(user))
          }
          msgSuccess('登录成功')
          const siteInfo = getSiteInfo()
          store.commit(SAVE_WEB_TITLE_SUFFIX, siteInfo.webTitleSuffix)
          router.push('/home')
        }
      }).catch((error: any) => {
        msgError('登录失败')
        console.log(error.msg)
      })
    } else {
      return false
    }
  })
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <!--头像-->
      <div class="avatar-box">
        <img src="/img/avatar.jpg" alt="">
      </div>
      <!--登录表单-->
      <el-form size="large" ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" :prefix-icon="UserFilled"/>
        </el-form-item>
        <el-form-item prop="publicPassword">
          <el-input v-model="loginForm.password" :prefix-icon="Lock"
                    show-password @keyup.native.enter="handleLogin"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background-color: #2b4b6b;
}

.login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login-box .avatar-box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

.login-box .avatar-box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

:deep(.el-form-item__content) {
  display: flex;
  justify-content: flex-end;
}
</style>