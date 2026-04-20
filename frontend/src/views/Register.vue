<template>
  <div class="register-box">
    <el-card class="register-card">
      <h2 style="text-align:center;">注册账号</h2>
      <el-form label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.confirmPwd" type="password" placeholder="请再次输入密码" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role" style="width:100%">
            <el-option label="学生" value="student" />
            <el-option label="校内导师" value="school_mentor" />
            <el-option label="企业导师" value="enterprise_mentor" />
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.realName" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-button type="primary" style="width:100%" @click="register">注册</el-button>
        <div style="text-align:center;margin-top:15px;">
          <el-link type="primary" @click="$router.push('/login')">已有账号？去登录</el-link>
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
const form = ref({
  username: '',
  password: '',
  confirmPwd: '',
  role: 'student',
  realName: ''
})

import axios from 'axios'

const register = async () => {
  if (form.value.password !== form.value.confirmPwd) {
    ElMessage.error('两次密码不一致！')
    return
  }
  try {
    const res = await axios.post('http://localhost:3000/api/register', {
      username: form.value.username,
      password: form.value.password,
      role: form.value.role,
      realName: form.value.realName
    })
    if (res.data.code === 200) {
      ElMessage.success('注册成功！请登录')
      router.push('/login')
    } else {
      ElMessage.error(res.data.msg)
    }
  } catch (e) {
    ElMessage.error('注册失败：' + e.message)
  }
}
</script>

<style scoped>
.register-box {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}
.register-card {
  width: 400px;
  padding: 30px;
}
</style>