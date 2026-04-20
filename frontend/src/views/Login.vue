<template>
  <div class="login-box">
    <el-card class="login-card">
      <h2 style="text-align:center;">校企双导师实习培训管理系统</h2>
      <el-form label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="role" style="width:100%">
            <el-option label="学生" value="student" />
            <el-option label="校内导师" value="school_mentor" />
            <el-option label="企业导师" value="enterprise_mentor" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
        <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        <div style="text-align:center;margin-top:15px;">
          <el-link type="primary" @click="$router.push('/register')">没有账号？去注册</el-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const role = ref('student')

const login = () => {
  ElMessage.success('登录成功！')
  if (role.value === 'student') {
    router.push('/student')
  } else if (role.value === 'school_mentor') {
    router.push('/school')
  } else if (role.value === 'enterprise_mentor') {
    router.push('/enterprise')
  } else if (role.value === 'admin') {
    router.push('/admin')
  }
}
</script>

<style scoped>
.login-box {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}
.login-card {
  width: 400px;
  padding: 30px;
}
</style>