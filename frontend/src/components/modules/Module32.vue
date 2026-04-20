<template>
  <div class="module-box">
    <h3>6.2.3 日志与成果审阅功能（导师端）</h3>
    <el-card style="margin-bottom: 20px;">
      <p>本模块支持企业导师/校内导师审阅学生提交的实习日志与成果，填写评语并反馈审阅结果。</p>
    </el-card>

    <!-- 筛选条件 -->
    <el-card style="margin-bottom: 20px;">
      <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: center;">
        <el-input placeholder="搜索学生姓名/学号" style="width: 200px;" />
        <el-select placeholder="选择审阅类型" style="width: 150px;">
          <el-option label="实习日志" value="log" />
          <el-option label="实习成果" value="result" />
        </el-select>
        <el-select placeholder="选择审阅状态" style="width: 150px;">
          <el-option label="待审阅" value="pending" />
          <el-option label="已审阅" value="reviewed" />
        </el-select>
        <el-button type="primary">查询</el-button>
      </div>
    </el-card>

    <!-- 审阅列表 -->
    <el-card>
      <h4>学生提交内容审阅列表</h4>
      <el-table :data="reviewList" border style="width: 100%; margin-top: 15px;">
        <el-table-column label="学生姓名" prop="studentName" align="center" width="120" />
        <el-table-column label="学号" prop="studentId" align="center" width="120" />
        <el-table-column label="提交类型" prop="type" align="center" width="100" />
        <el-table-column label="提交标题/日期" prop="title" align="center" />
        <el-table-column label="提交时间" prop="submitTime" align="center" width="160" />
        <el-table-column label="审阅状态" prop="status" align="center" width="120">
          <template #default="scope">
            <el-tag type="warning" v-if="scope.row.status === 'pending'">待审阅</el-tag>
            <el-tag type="success" v-if="scope.row.status === 'reviewed'">已审阅</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template #default="scope">
            <el-button type="primary" size="small" @click="viewDetail(scope.row)" v-if="scope.row.status === 'pending'">审阅</el-button>
            <el-button type="text" size="small" v-else>查看记录</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 审阅弹窗 -->
      <el-dialog v-model="dialogVisible" title="填写审阅评语" width="500px">
        <el-form :model="reviewForm">
          <el-form-item label="学生姓名" label-width="80px">
            <el-input v-model="reviewForm.studentName" disabled />
          </el-form-item>
          <el-form-item label="提交内容" label-width="80px">
            <el-input v-model="reviewForm.title" disabled />
          </el-form-item>
          <el-form-item label="导师评语" label-width="80px">
            <el-input type="textarea" v-model="reviewForm.comment" :rows="4" placeholder="请输入审阅评语" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitReview">提交审阅</el-button>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 审阅列表数据
const reviewList = ref([
  {
    studentName: '张三',
    studentId: '2023001',
    type: '日志',
    title: '2026-04-20 实习日志',
    submitTime: '2026-04-20 18:30',
    status: 'pending',
    content: '学习Vue路由配置，尝试实现页面跳转，遇到路由匹配问题，正在排查'
  },
  {
    studentName: '李四',
    studentId: '2023002',
    type: '成果',
    title: '页面原型设计图',
    submitTime: '2026-04-19 16:20',
    status: 'pending',
    content: '包含登录页、首页、菜单页原型设计，格式为Figma文件'
  },
  {
    studentName: '张三',
    studentId: '2023001',
    type: '日志',
    title: '2026-04-19 实习日志',
    submitTime: '2026-04-19 17:40',
    status: 'reviewed',
    content: '学习Element Plus组件，编写表单页面',
    comment: '进度正常，代码规范'
  }
])

// 审阅弹窗控制
const dialogVisible = ref(false)
// 审阅表单数据
const reviewForm = ref({
  studentName: '',
  title: '',
  comment: ''
})
// 当前选中的审阅项
const currentRow = ref(null)

// 查看详情/进入审阅
const viewDetail = (row) => {
  currentRow.value = row
  reviewForm.value = {
    studentName: row.studentName,
    title: row.title,
    comment: row.comment || ''
  }
  dialogVisible.value = true
}

// 提交审阅评语
const submitReview = () => {
  if (!reviewForm.value.comment) {
    alert('请填写导师评语！')
    return
  }
  currentRow.value.status = 'reviewed'
  currentRow.value.comment = reviewForm.value.comment
  dialogVisible.value = false
  alert('审阅完成，评语已反馈给学生！')
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