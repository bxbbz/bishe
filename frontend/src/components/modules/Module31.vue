<template>
  <div class="module-box">
    <h3>6.2.3 日志与成果上传功能（学生端）</h3>
    <el-card style="margin-bottom: 20px;">
      <p>本模块支持学生提交每日实习日志、上传实习成果，同时查看导师的审阅反馈与进度评价。</p>
    </el-card>

    <!-- 一、提交实习日志 -->
    <el-card style="margin-bottom: 20px;">
      <h4>提交实习日志</h4>
      <el-form :model="logForm" style="margin-top: 15px;">
        <el-form-item label="日志日期" label-width="100px" required>
          <el-date-picker v-model="logForm.date" type="date" placeholder="选择日志日期" />
        </el-form-item>
        <el-form-item label="实习内容" label-width="100px" required>
          <el-input
            type="textarea"
            v-model="logForm.content"
            placeholder="请输入今日实习内容、遇到的问题及解决方法"
            :rows="4"
          />
        </el-form-item>
        <el-form-item label="当日进度" label-width="100px">
          <el-progress v-model="logForm.progress" text-inside show-text />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLog">提交日志</el-button>
          <el-button style="margin-left: 10px;">保存草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 二、实习成果上传 -->
    <el-card style="margin-bottom: 20px;">
      <h4>实习成果上传</h4>
      <div style="margin-top: 15px;">
        <el-upload
          action="#"
          :file-list="fileList"
          list-type="text"
          :on-success="handleUploadSuccess"
        >
          <el-button type="primary">点击上传成果文件</el-button>
          <div style="margin-top: 10px; color: #666;">支持文档、代码包、设计图等格式，单文件不超过 10MB</div>
        </el-upload>
      </div>
    </el-card>

    <!-- 三、导师审阅反馈列表 -->
    <el-card>
      <h4>导师审阅反馈</h4>
      <el-table :data="reviewList" border style="width: 100%; margin-top: 15px;">
        <el-table-column label="类型" prop="type" align="center" width="100" />
        <el-table-column label="标题/日期" prop="title" align="center" />
        <el-table-column label="审阅导师" prop="mentor" align="center" width="120" />
        <el-table-column label="审阅状态" prop="status" align="center" width="120">
          <template #default="scope">
            <el-tag type="warning" v-if="scope.row.status === 'pending'">待审阅</el-tag>
            <el-tag type="success" v-if="scope.row.status === 'reviewed'">已审阅</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="导师评语" prop="comment" align="center" min-width="200" />
        <el-table-column label="操作" align="center" width="100">
          <template #default="scope">
            <el-button type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 日志表单数据
const logForm = ref({
  date: '',
  content: '',
  progress: 50
})

// 成果上传文件列表
const fileList = ref([])

// 导师审阅反馈列表
const reviewList = ref([
  {
    type: '日志',
    title: '2026-04-20 实习日志',
    mentor: '李老师（校内）',
    status: 'reviewed',
    comment: '学习态度认真，能主动解决问题，继续保持'
  },
  {
    type: '成果',
    title: '组件化代码包',
    mentor: '王工（企业）',
    status: 'reviewed',
    comment: '代码结构清晰，建议增加注释提高可读性'
  },
  {
    type: '日志',
    title: '2026-04-21 实习日志',
    mentor: '李老师（校内）',
    status: 'pending',
    comment: ''
  }
])

// 提交日志
const submitLog = () => {
  if (!logForm.value.date || !logForm.value.content) {
    alert('请填写日志日期和实习内容！')
    return
  }
  reviewList.value.unshift({
    type: '日志',
    title: logForm.value.date,
    mentor: '待分配导师',
    status: 'pending',
    comment: ''
  })
  alert('日志提交成功！请等待导师审阅')
  logForm.value = { date: '', content: '', progress: 50 }
}

// 成果上传成功回调
const handleUploadSuccess = () => {
  alert('成果文件上传成功！')
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