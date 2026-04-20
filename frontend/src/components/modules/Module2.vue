<template>
  <div class="module-box">
    <h3>6.2.2 课题发布与申请功能</h3>
    <el-card style="margin-bottom: 20px;">
      <p>本模块支持 <b>企业导师发布课题、审核学生申请</b>，<b>学生浏览并申请课题</b>，按角色划分功能子模块，实现课题发布、申请、审核的全流程闭环管理。</p>
    </el-card>

    <!-- 角色标识：可从登录态获取，此处模拟传入 -->
    <el-card style="margin-bottom: 20px;">
      <el-select v-model="currentRole" placeholder="选择当前角色（模拟登录态）" style="width: 200px;">
        <el-option label="企业导师" value="enterprise_mentor"></el-option>
        <el-option label="学生" value="student"></el-option>
      </el-select>
    </el-card>

    <!-- 一、企业导师视角：课题发布 + 课题审核 -->
    <div v-if="currentRole === 'enterprise_mentor'">
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
                <el-input type="textarea" v-model="topicForm.intro" placeholder="请输入课题要求、实习内容、成果形式"></el-input>
              </el-form-item>
              <el-form-item label="课题周期" label-width="100px">
                <el-input v-model="topicForm.cycle" placeholder="请输入课题周期（如：4周）"></el-input>
              </el-form-item>
              <el-form-item label="接收人数" label-width="100px">
                <el-input v-model="topicForm.maxNum" type="number" placeholder="请输入最大接收学生数"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="publishTopic">发布课题</el-button>
                <el-button style="margin-left: 10px;">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="课题审核" name="audit">
          <el-card>
            <h4>学生课题申请审核列表</h4>
            <el-table :data="applyList" border style="width: 100%; margin-top: 15px;">
              <el-table-column label="申请ID" prop="applyId" align="center"></el-table-column>
              <el-table-column label="学生姓名" prop="studentName" align="center"></el-table-column>
              <el-table-column label="申请课题" prop="topicName" align="center"></el-table-column>
              <el-table-column label="申请时间" prop="applyTime" align="center"></el-table-column>
              <el-table-column label="申请理由" prop="reason" align="center"></el-table-column>
              <el-table-column label="审核状态" prop="status" align="center">
                <template #default="scope">
                  <el-tag type="warning" v-if="scope.row.status === 'pending'">待审核</el-tag>
                  <el-tag type="success" v-if="scope.row.status === 'pass'">已通过</el-tag>
                  <el-tag type="danger" v-if="scope.row.status === 'reject'">已拒绝</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template #default="scope">
                  <el-button type="success" size="small" @click="passApply(scope.row)" v-if="scope.row.status === 'pending'">通过</el-button>
                  <el-button type="danger" size="small" @click="rejectApply(scope.row)" v-if="scope.row.status === 'pending'">拒绝</el-button>
                  <el-button type="text" size="small" v-else>查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 二、学生视角：课题申请 -->
    <div v-if="currentRole === 'student'">
      <el-card>
        <h4>课题申请列表</h4>
        <el-table :data="topicList" border style="width: 100%; margin-top: 15px;">
          <el-table-column label="课题编号" prop="id" align="center"></el-table-column>
          <el-table-column label="课题名称" prop="name" align="center"></el-table-column>
          <el-table-column label="课题类型" prop="type" align="center"></el-table-column>
          <el-table-column label="发布导师" prop="mentor" align="center"></el-table-column>
          <el-table-column label="课题周期" prop="cycle" align="center"></el-table-column>
          <el-table-column label="剩余名额" prop="remainNum" align="center">
            <template #default="scope">
              <el-tag type="success" v-if="scope.row.remainNum > 0">{{ scope.row.remainNum }} 个</el-tag>
              <el-tag type="danger" v-else>已满</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="申请状态" prop="applyStatus" align="center">
            <template #default="scope">
              <el-tag type="info" v-if="scope.row.applyStatus === 'unapply'">未申请</el-tag>
              <el-tag type="warning" v-if="scope.row.applyStatus === 'pending'">审核中</el-tag>
              <el-tag type="success" v-if="scope.row.applyStatus === 'pass'">已通过</el-tag>
              <el-tag type="danger" v-if="scope.row.applyStatus === 'reject'">已拒绝</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button type="primary" size="small" @click="applyTopic(scope.row)" v-if="scope.row.applyStatus === 'unapply' && scope.row.remainNum > 0">申请</el-button>
              <el-button type="text" size="small" v-else-if="scope.row.applyStatus === 'pending'">查看进度</el-button>
              <el-button type="text" size="small" v-else>查看详情</el-button>
              <el-button type="danger" size="small" v-if="scope.row.applyStatus === 'unapply' && scope.row.remainNum <= 0" disabled>已满</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 当前角色：实际项目中从登录态获取，此处模拟
const currentRole = ref('enterprise_mentor')
// 企业导师 tab 切换
const activeTab = ref('publish')

// 1. 课题发布表单数据
const topicForm = ref({
  name: '',
  type: '',
  intro: '',
  cycle: '',
  maxNum: 1
})

// 2. 学生申请审核列表
const applyList = ref([
  { applyId: 'AP2026001', studentName: '张三', topicName: '企业项目实战实习', applyTime: '2026-04-18', reason: '熟悉企业开发流程，提升前端技能', status: 'pending' },
  { applyId: 'AP2026002', studentName: '李四', topicName: '前后端分离项目开发', applyTime: '2026-04-19', reason: '学习接口开发与数据交互', status: 'pending' },
  { applyId: 'AP2026003', studentName: '王五', topicName: '数据库设计与优化', applyTime: '2026-04-17', reason: '提升数据库设计能力', status: 'pass' }
])

// 3. 学生可申请课题列表
const topicList = ref([
  { id: 'KT2026001', name: '企业项目实战实习', type: '开发类', mentor: '王工', cycle: '4周', remainNum: 2, applyStatus: 'unapply' },
  { id: 'KT2026002', name: '前后端分离项目开发', type: '开发类', mentor: '李老师', cycle: '5周', remainNum: 0, applyStatus: 'unapply' },
  { id: 'KT2026003', name: '数据库设计与优化', type: '开发类', mentor: '张工', cycle: '3周', remainNum: 1, applyStatus: 'pending' },
  { id: 'KT2026004', name: '软件测试实战', type: '测试类', mentor: '刘老师', cycle: '3周', remainNum: 3, applyStatus: 'pass' }
])

// ---------------- 方法 ----------------
// 企业导师：发布课题
const publishTopic = () => {
  if (!topicForm.value.name) {
    alert('请输入课题名称！')
    return
  }
  const newTopic = {
    id: `KT2026${(topicList.value.length + 1).toString().padStart(3, '0')}`,
    name: topicForm.value.name,
    type: topicForm.value.type || '开发类',
    mentor: '当前企业导师',
    cycle: topicForm.value.cycle || '4周',
    remainNum: topicForm.value.maxNum || 1,
    applyStatus: 'unapply'
  }
  topicList.value.unshift(newTopic)
  // 重置表单
  topicForm.value = { name: '', type: '', intro: '', cycle: '', maxNum: 1 }
  alert('课题发布成功！')
}

// 企业导师：通过申请
const passApply = (row) => {
  row.status = 'pass'
  alert(`已通过 ${row.studentName} 的申请！`)
}

// 企业导师：拒绝申请
const rejectApply = (row) => {
  row.status = 'reject'
  alert(`已拒绝 ${row.studentName} 的申请！`)
}

// 学生：申请课题
const applyTopic = (row) => {
  row.applyStatus = 'pending'
  // 减少剩余名额
  row.remainNum -= 1
  alert(`课题申请提交成功，请等待导师审核！`)
}
</script>

<style scoped>
.module-box {
  padding: 20px;
}
.el-card {
  margin-bottom: 15px;
}
.el-form-item {
  margin-bottom: 15px;
}
</style>