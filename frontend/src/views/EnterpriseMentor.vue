<template>
  <el-container style="height:100vh">
    <el-header style="background:#67C23A;color:white;padding:0 20px">
      <h2>企业导师端｜校企双导师培训系统</h2>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background:#f5f5f5;padding-top:20px">
        <div class="menu-container">
          <div class="menu-item" :class="{active:active==='2'}" @click="active='2'">课题发布与申请</div>
          <div class="menu-item" :class="{active:active==='3'}" @click="active='3'">日志与成果上传</div>
          <div class="menu-item" :class="{active:active==='4'}" @click="active='4'">考核评价功能</div>
          <div class="menu-item" :class="{active:active==='5'}" @click="active='5'">成果归档功能</div>
          <div class="menu-item" :class="{active:active==='6'}" @click="active='6'">指导沟通功能</div>
        </div>
      </el-aside>
      <el-main style="padding:20px">
        <Module11 v-if="active === '2'" />
        <Module32 v-if="active === '3'" />
        <Module422 v-if="active === '4'" /> <!-- 替换为 Module422 -->
        <Module5 v-if="active === '5'" />
        <Module6 v-if="active === '6'" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
const active = ref('2')

import Module11 from '@/components/modules/Module11.vue'
import Module32 from '@/components/modules/Module32.vue'
import Module422 from '@/components/modules/Module422.vue' // 引入 Module422
import Module5 from '@/components/modules/Module5.vue'
import Module6 from '@/components/modules/Module6.vue'
</script>

<style scoped>
.menu-container { width:100%; }
.menu-item { padding:12px 20px; margin:0 10px 5px 10px; border-radius:6px; cursor:pointer; transition:all 0.3s; }
.menu-item:hover { background:#f0f9ff; color:#67C23A; }
.menu-item.active { background:#67C23A; color:white; }
</style>