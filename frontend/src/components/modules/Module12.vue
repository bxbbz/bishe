<template>
  <div class="module-box">
    <h3>6.2.2 课题发布与申请功能（学生）</h3>
    <el-card style="margin-bottom: 20px;">
      <p>本模块支持学生浏览课题、提交课题申请。</p>
    </el-card>

    <el-card>
      <h4>可申请课题列表</h4>
      <el-table :data="topicList" border style="width:100%;margin-top:15px;">
        <el-table-column label="课题名称" prop="name"></el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="导师" prop="mentor"></el-table-column>
        <el-table-column label="周期" prop="cycle"></el-table-column>
        <el-table-column label="名额" prop="remainNum">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.remainNum>0">有余票</el-tag>
            <el-tag type="danger" v-else>已满</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="applyTopic(scope.row)" v-if="scope.row.remainNum>0">申请课题</el-button>
            <el-button size="small" disabled v-else>已满员</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const topicList = ref([
  { name: '企业项目实战', type: '开发类', mentor: '王工', cycle: '4周', remainNum: 2 },
  { name: '前后端分离开发', type: '开发类', mentor: '李老师', cycle: '5周', remainNum: 0 },
  { name: '软件测试实战', type: '测试类', mentor: '刘老师', cycle: '3周', remainNum: 3 }
])

const applyTopic = (row) => {
  row.remainNum--
  alert('申请提交成功，请等待导师审核！')
}
</script>

<style scoped>
.module-box { padding: 20px; }
</style>