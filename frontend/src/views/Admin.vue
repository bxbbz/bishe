<template>
  <el-container style="height:100vh">
    <el-header style="background:#F56C6C;color:white;padding:0 20px">
      <h2>管理员端｜校企双导师培训系统</h2>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background:#f5f5f5;padding-top:20px">
        <div class="menu-container">
          <div 
            class="menu-item" 
            :class="{ active: active === '1' }"
            @click="active = '1'"
          >
            用户登录与权限控制
          </div>
        </div>
      </el-aside>
      <el-main style="padding:20px">
        <Module1 v-if="active === '1'" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
const active = ref('1')

import Module1 from '@/components/modules/Module1.vue'
</script>

<style scoped>
.menu-container {
  width: 100%;
}
.menu-item {
  padding: 12px 20px;
  margin: 0 10px 5px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}
.menu-item:hover {
  background: #fff2f0;
  color: #F56C6C;
}
.menu-item.active {
  background: #F56C6C;
  color: white;
}
</style>