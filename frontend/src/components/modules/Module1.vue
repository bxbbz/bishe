<template>
  <div class="module-box">
    <h3>6.2.1 用户登录与权限控制</h3>
    <el-card style="margin-bottom: 20px;">
      <p>本模块实现用户登录验证、角色分配及权限管控功能，确保不同角色仅能访问对应权限范围内的功能模块，保障系统数据安全与操作规范性。</p>
    </el-card>

    <!-- 登录验证区域 -->
    <el-card style="margin-bottom: 20px;">
      <h4>登录验证</h4>
      <div class="login-form" style="margin-top: 15px;">
        <el-form :model="loginForm" style="width: 400px;" @submit.prevent="handleLogin">
          <el-form-item label="用户名" label-width="80px" prop="username" :rules="[{ required: true, message: '请输入用户名' }]">
            <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="80px" prop="password" :rules="[{ required: true, message: '请输入密码' }]">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="角色" label-width="80px" prop="role" :rules="[{ required: true, message: '请选择角色' }]">
            <el-select v-model="loginForm.role" placeholder="请选择角色">
              <el-option label="学生" value="student"></el-option>
              <el-option label="校内导师" value="school_mentor"></el-option>
              <el-option label="企业导师" value="enterprise_mentor"></el-option>
              <el-option label="管理员" value="admin"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin">登录</el-button>
            <el-button style="margin-left: 10px;">忘记密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 权限管理区域 -->
    <el-card>
      <h4>权限分配管理</h4>
      <el-table :data="permissionList" border style="width: 100%; margin-top: 15px;">
        <el-table-column label="角色名称" prop="roleName" align="center"></el-table-column>
        <el-table-column label="可访问模块" prop="modules" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default>
            <el-button type="primary" size="small">编辑权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // 引入路由

const router = useRouter() // 初始化路由

// 模拟登录表单数据
const loginForm = ref({
  username: '',
  password: '',
  role: ''
})

// 模拟权限列表数据（对应你论文角色权限）
const permissionList = [
  { roleName: '学生', modules: '课题发布与申请、日志与成果上传、考核评价、成果归档、指导沟通' },
  { roleName: '校内导师', modules: '日志与成果上传、考核评价、成果归档、指导沟通' },
  { roleName: '企业导师', modules: '课题发布与申请、日志与成果上传、考核评价、成果归档、指导沟通' },
  { roleName: '管理员', modules: '用户登录与权限控制' }
]

// 登录逻辑：验证 + 跳转对应角色页面
const handleLogin = () => {
  // 1. 基础校验
  if (!loginForm.value.username || !loginForm.value.password || !loginForm.value.role) {
    alert('请填写完整登录信息！')
    return
  }

  // 2. 模拟登录成功（实际项目需对接后端接口验证）
  alert(`登录成功！欢迎 ${loginForm.value.role === 'student' ? '学生' : loginForm.value.role === 'school_mentor' ? '校内导师' : loginForm.value.role === 'enterprise_mentor' ? '企业导师' : '管理员'} 用户`)
  
  // 3. 存储角色信息到本地缓存（防止页面刷新丢失）
  localStorage.setItem('currentRole', loginForm.value.role)
  localStorage.setItem('currentUser', loginForm.value.username)

  // 4. 根据角色跳转对应页面
  switch (loginForm.value.role) {
    case 'student':
      router.push('/student') // 跳转到学生端
      break
    case 'school_mentor':
      router.push('/school-mentor') // 跳转到校内导师端
      break
    case 'enterprise_mentor':
      router.push('/enterprise-mentor') // 跳转到企业导师端
      break
    case 'admin':
      router.push('/admin') // 跳转到管理员端
      break
    default:
      router.push('/')
  }
}
</script>

<style scoped>
.module-box {
  padding: 20px;
}
.el-card {
  margin-bottom: 15px;
}
.login-form {
  padding: 10px 0;
}
</style>