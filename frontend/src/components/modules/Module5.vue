<template>
  <div class="module-box">
    <h3>6.2.5 成果归档功能</h3>
    <el-card style="margin-bottom: 20px;">
      <p>本模块实现学生实习成果的统一归档管理，将学生实习日志、实习成果、考核评价结果等相关资料整理归档，形成完整的学生实习档案，支持查询、导出、打印，便于后续追溯与管理。</p>
    </el-card>

    <!-- 档案查询 -->
    <el-card style="margin-bottom: 20px;">
      <h4>实习档案查询</h4>
      <div style="margin-top: 15px; display: flex; gap: 10px; align-items: center;">
        <el-input placeholder="搜索学生姓名/学号" style="width: 250px;"></el-input>
        <el-select placeholder="筛选实习批次" style="width: 180px;">
          <el-option label="2026年春季实习" value="2026spring"></el-option>
          <el-option label="2025年秋季实习" value="2025autumn"></el-option>
        </el-select>
        <el-button type="primary">查询</el-button>
      </div>
    </el-card>

    <!-- 实习档案列表 -->
    <el-card style="margin-bottom: 20px;">
      <h4>学生实习档案列表</h4>
      <el-table :data="archiveList" border style="width: 100%; margin-top: 15px;">
        <el-table-column label="学生姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="学号" prop="studentId" align="center"></el-table-column>
        <el-table-column label="实习课题" prop="topic" align="center"></el-table-column>
        <el-table-column label="实习周期" prop="cycle" align="center"></el-table-column>
        <el-table-column label="综合成绩" prop="score" align="center"></el-table-column>
        <el-table-column label="归档状态" prop="status" align="center">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.status === '已归档'">已归档</el-tag>
            <el-tag type="warning" v-if="scope.row.status === '待归档'">待归档</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default>
            <el-button type="primary" size="small">查看档案</el-button>
            <el-button type="success" size="small" style="margin-left: 5px;">导出档案</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 档案详情预览 -->
    <el-card>
      <h4>实习档案详情（预览）</h4>
      <div style="margin-top: 15px; padding: 15px; border: 1px solid #eee; border-radius: 6px;">
        <div class="archive-detail">
          <b>基本信息</b>
          <div class="detail-item">姓名：张三</div>
          <div class="detail-item">学号：2023001</div>
          <div class="detail-item">实习课题：企业项目实战实习</div>
          <div class="detail-item">指导导师：王工（企业导师）、李老师（校内导师）</div>
          <div class="detail-item">实习周期：2026-04-01 至 2026-04-28（4周）</div>
        </div>
        <div class="archive-detail" style="margin-top: 15px;">
          <b>考核评价结果</b>
          <div class="detail-item">综合成绩：92 分（优秀）</div>
          <div class="detail-item">校内导师评语：该生学习认真，态度端正，理论基础扎实，综合素质良好。</div>
          <div class="detail-item">企业导师评语：该生实操能力较强，团队协作良好，能快速适应岗位需求。</div>
        </div>
        <div class="archive-detail" style="margin-top: 15px;">
          <b>归档资料</b>
          <div class="detail-item">1. 实习日志（4周，共20篇，已审核）</div>
          <div class="detail-item">2. 实习成果（3份：周报、设计图、代码包）</div>
          <div class="detail-item">3. 考核评价表（双导师签字确认）</div>
          <div class="detail-item">4. 实习总结报告</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 模拟实习档案列表
const archiveList = [
  { name: '张三', studentId: '2023001', topic: '企业项目实战实习', cycle: '4周', score: 92, status: '已归档' },
  { name: '李四', studentId: '2023002', topic: '前后端分离项目开发', cycle: '5周', score: 85, status: '已归档' },
  { name: '王五', studentId: '2023003', topic: '数据库设计与优化', cycle: '3周', score: 88, status: '待归档' },
  { name: '赵六', studentId: '2023004', topic: '软件测试实战', cycle: '3周', score: 79, status: '已归档' }
]
</script>

<style scoped>
.module-box {
  padding: 20px;
}
.el-card {
  margin-bottom: 15px;
}
.archive-detail {
  line-height: 1.8;
}
.detail-item {
  margin-left: 15px;
  margin-top: 5px;
}
</style>