<template>
  <div class="module-box">
    <h3>6.2.3 日志与成果上传功能</h3>
    <el-card style="margin-bottom: 20px;">
      <p>本模块支持学生按要求提交每日实习日志，记录实习内容、收获与遇到的问题；同时支持学生上传实习成果（文档、代码、设计图等），导师可查看、审核日志与成果，实时掌握学生实习进度。</p>
    </el-card>

    <!-- 提交实习日志 -->
    <el-card style="margin-bottom: 20px;">
      <h4>提交实习日志</h4>
      <el-form :model="logForm" style="margin-top: 15px;">
        <el-form-item label="日志日期" label-width="100px">
          <el-date-picker v-model="logForm.date" type="date" placeholder="选择日志日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="实习内容" label-width="100px">
          <el-input type="textarea" v-model="logForm.content" placeholder="请输入今日实习内容、收获及遇到的问题"></el-input>
        </el-form-item>
        <el-form-item label="当日进度" label-width="100px">
          <el-progress v-model="logForm.progress" text-inside show-text></el-progress>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交日志</el-button>
          <el-button style="margin-left: 10px;">保存草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 日志列表 -->
    <el-card style="margin-bottom: 20px;">
      <h4>实习日志列表</h4>
      <el-table :data="logList" border style="width: 100%; margin-top: 15px;">
        <el-table-column label="日志日期" prop="date" align="center"></el-table-column>
        <el-table-column label="实习内容" prop="content" align="center"></el-table-column>
        <el-table-column label="当日进度" prop="progress" align="center">
          <template #default="scope">
            <el-progress :percentage="scope.row.progress" size="small"></el-progress>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" prop="auditStatus" align="center">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.auditStatus === '已审核'">已审核</el-tag>
            <el-tag type="warning" v-if="scope.row.auditStatus === '待审核'">待审核</el-tag>
            <el-tag type="danger" v-if="scope.row.auditStatus === '未通过'">未通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="导师评语" prop="comment" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button type="text" size="small" v-if="scope.row.auditStatus === '待审核'">编辑</el-button>
            <el-button type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 成果上传与列表 -->
    <el-card>
      <h4>实习成果上传与列表</h4>
      <div style="margin-top: 15px; margin-bottom: 15px;">
        <el-upload
          action="#"
          :file-list="fileList"
          list-type="text"
          style="width: 100%;"
        >
          <el-button type="primary">上传实习成果</el-button>
          <div style="margin-left: 10px; display: inline-block;">支持文档、代码包、设计图等格式</div>
        </el-upload>
      </div>
      <el-table :data="resultList" border style="width: 100%;">
        <el-table-column label="成果名称" prop="name" align="center"></el-table-column>
        <el-table-column label="上传日期" prop="date" align="center"></el-table-column>
        <el-table-column label="成果类型" prop="type" align="center"></el-table-column>
        <el-table-column label="文件大小" prop="size" align="center"></el-table-column>
        <el-table-column label="审核状态" prop="auditStatus" align="center">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.auditStatus === '已审核'">已审核</el-tag>
            <el-tag type="warning" v-if="scope.row.auditStatus === '待审核'">待审核</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default>
            <el-button type="text" size="small">下载</el-button>
            <el-button type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 模拟日志表单
const logForm = ref({
  date: '',
  content: '',
  progress: 70
})

// 模拟日志列表
const logList = [
  { date: '2026-04-18', content: '学习Vue基础语法，完成页面布局，掌握组件基础用法，遇到路径配置问题，已咨询导师解决', progress: 60, auditStatus: '已审核', comment: '学习认真，能主动解决问题' },
  { date: '2026-04-19', content: '学习Element Plus组件，编写表单页面，完成登录表单的布局与基础校验', progress: 70, auditStatus: '已审核', comment: '进度正常，代码规范' },
  { date: '2026-04-20', content: '完成组件化改造，实现菜单切换功能，优化页面样式，确保跳转正常', progress: 80, auditStatus: '待审核', comment: '' },
  { date: '2026-04-21', content: '学习Vue路由配置，尝试实现页面跳转，遇到路由匹配问题，正在排查', progress: 50, auditStatus: '待审核', comment: '' }
]

// 模拟成果上传文件列表
const fileList = ref([])

// 模拟成果列表
const resultList = [
  { name: '实习周报（第一周）', date: '2026-04-15', type: '文档', size: '2.3MB', auditStatus: '已审核' },
  { name: '页面原型设计图', date: '2026-04-17', type: '设计图', size: '5.6MB', auditStatus: '已审核' },
  { name: '组件化代码包', date: '2026-04-20', type: '代码包', size: '1.8MB', auditStatus: '待审核' }
]
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