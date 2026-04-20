<template>
  <div class="module-box">
    <h3>6.2.2 课题发布与申请功能（企业导师）</h3>
    <el-card style="margin-bottom: 20px;">
      <p>本模块支持企业导师发布课题、审核学生申请，实现课题全流程管理。</p>
    </el-card>

    <el-tabs v-model="activeTab" type="card" style="margin-bottom: 20px;">
      <el-tab-pane label="课题发布" name="publish">
        <el-card>
          <h4>发布新课题</h4>
          <el-form :model="topicForm" style="margin-top: 15px;">
            <el-form-item label="课题名称" label-width="100px">
              <el-input v-model="topicForm.name" placeholder="请输入课题名称"></el-input>
            </el-form-item>
            <el-form-item label="课题类型" label-width="100px">
              <el-select v-model="topicForm.type" placeholder="请选择课题类型">
                <el-option label="开发类" value="dev"></el-option>
                <el-option label="测试类" value="test"></el-option>
                <el-option label="设计类" value="design"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="课题简介" label-width="100px">
              <el-input type="textarea" v-model="topicForm.intro"></el-input>
            </el-form-item>
            <el-form-item label="课题周期" label-width="100px">
              <el-input v-model="topicForm.cycle"></el-input>
            </el-form-item>
            <el-form-item label="接收人数" label-width="100px">
              <el-input v-model="topicForm.maxNum" type="number"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="publishTopic">发布课题</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="课题审核" name="audit">
        <el-card>
          <h4>学生申请审核列表</h4>
          <el-table :data="applyList" border style="width:100%;margin-top:15px;">
            <el-table-column label="学生姓名" prop="studentName"></el-table-column>
            <el-table-column label="申请课题" prop="topicName"></el-table-column>
            <el-table-column label="申请时间" prop="applyTime"></el-table-column>
            <el-table-column label="状态" prop="status">
              <template #default="scope">
                <el-tag type="warning" v-if="scope.row.status=='pending'">待审核</el-tag>
                <el-tag type="success" v-if="scope.row.status=='pass'">已通过</el-tag>
                <el-tag type="danger" v-if="scope.row.status=='reject'">已拒绝</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" type="success" @click="passApply(scope.row)" v-if="scope.row.status=='pending'">通过</el-button>
                <el-button size="small" type="danger" @click="rejectApply(scope.row)" v-if="scope.row.status=='pending'">拒绝</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const activeTab = ref('publish')

const topicForm = ref({ name: '', type: 'dev', intro: '', cycle: '4周', maxNum: 1 })
const applyList = ref([
  { studentName: '张三', topicName: '企业项目实战', applyTime: '2026-04-20', status: 'pending' },
  { studentName: '李四', topicName: '前后端开发', applyTime: '2026-04-20', status: 'pending' }
])

const publishTopic = () => alert('课题发布成功！')
const passApply = (row) => (row.status = 'pass')
const rejectApply = (row) => (row.status = 'reject')
</script>

<style scoped>
.module-box { padding: 20px; }
</style>