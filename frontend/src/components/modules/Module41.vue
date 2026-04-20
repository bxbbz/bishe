<template>
  <div class="module-box">
    <h3>6.2.4 考核评价功能（学生端）</h3>
    <el-card style="margin-bottom: 20px;">
      <p>本模块展示学生的所有阶段性评价与最终综合评价结果，包含校内/企业导师的具体评分维度、得分及评语。</p>
    </el-card>

    <!-- 阶段性评价 -->
    <el-card style="margin-bottom: 20px;">
      <h4>阶段性评价记录</h4>
      <el-table :data="stageList" border style="width:100%;margin-top:15px;">
        <el-table-column label="阶段" prop="stage" align="center" width="120"></el-table-column>
        <el-table-column label="评价导师" prop="mentor" align="center" width="150"></el-table-column>
        <el-table-column label="评分维度及得分" align="center">
          <template #default="scope">
            <div v-if="scope.row.mentorType === 'school'">
              <div><span style="color:#409EFF;">理论知识：</span>{{ scope.row.scores.theory }}分</div>
              <div><span style="color:#409EFF;">学习态度：</span>{{ scope.row.scores.attitude }}分</div>
              <div><span style="color:#409EFF;">分析能力：</span>{{ scope.row.scores.analysis }}分</div>
              <div><span style="color:#409EFF;">综合素质：</span>{{ scope.row.scores.comprehensive }}分</div>
            </div>
            <div v-if="scope.row.mentorType === 'enterprise'">
              <div><span style="color:#67C23A;">实践能力：</span>{{ scope.row.scores.practice }}分</div>
              <div><span style="color:#67C23A;">工作态度：</span>{{ scope.row.scores.attitude }}分</div>
              <div><span style="color:#67C23A;">专业技能：</span>{{ scope.row.scores.skill }}分</div>
              <div><span style="color:#67C23A;">协作能力：</span>{{ scope.row.scores.cooperation }}分</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="阶段总分" prop="totalScore" align="center" width="100"></el-table-column>
        <el-table-column label="评语" prop="comment" align="center" min-width="200"></el-table-column>
        <el-table-column label="评价时间" prop="time" align="center" width="160"></el-table-column>
      </el-table>
    </el-card>

    <!-- 最终评价 -->
    <el-card>
      <h4>最终综合评价</h4>
      <div style="padding:20px;line-height:2.5;">
        <div style="margin-bottom:15px;">
          <b style="font-size:16px;">校内导师评价：</b>
          <div>理论知识：{{ final.schoolScores.theory }}分 | 学习态度：{{ final.schoolScores.attitude }}分</div>
          <div>分析能力：{{ final.schoolScores.analysis }}分 | 综合素质：{{ final.schoolScores.comprehensive }}分</div>
          <div><b>校内导师总分：</b>{{ final.schoolTotal }}分</div>
          <div><b>校内导师评语：</b>{{ final.schoolComment }}</div>
        </div>
        <div style="margin-bottom:15px;">
          <b style="font-size:16px;">企业导师评价：</b>
          <div>实践能力：{{ final.enterpriseScores.practice }}分 | 工作态度：{{ final.enterpriseScores.attitude }}分</div>
          <div>专业技能：{{ final.enterpriseScores.skill }}分 | 协作能力：{{ final.enterpriseScores.cooperation }}分</div>
          <div><b>企业导师总分：</b>{{ final.enterpriseTotal }}分</div>
          <div><b>企业导师评语：</b>{{ final.enterpriseComment }}</div>
        </div>
        <div style="border-top:1px solid #e6e6e6; padding-top:15px;">
          <div><b>综合得分：</b>{{ final.total }} 分</div>
          <div><b>评价等级：</b>
            <el-tag type="success" v-if="final.level==='优秀'">优秀</el-tag>
            <el-tag type="primary" v-else-if="final.level==='良好'">良好</el-tag>
            <el-tag type="info" v-else-if="final.level==='合格'">合格</el-tag>
            <el-tag type="danger" v-else>不合格</el-tag>
          </div>
          <div><b>综合评语：</b> {{ final.comment }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 阶段性评价数据（区分校内/企业导师评分维度）
const stageList = ref([
  {
    stage: '第一阶段',
    mentor: '李老师(校内)',
    mentorType: 'school',
    scores: { theory: 24, attitude: 25, analysis: 23, comprehensive: 22 },
    totalScore: 94,
    comment: '学习态度认真，进度良好',
    time: '2026-04-10'
  },
  {
    stage: '第二阶段',
    mentor: '王工(企业)',
    mentorType: 'enterprise',
    scores: { practice: 23, attitude: 25, skill: 22, cooperation: 22 },
    totalScore: 92,
    comment: '实践能力强，能独立完成任务',
    time: '2026-04-17'
  },
  {
    stage: '第三阶段',
    mentor: '李老师(校内)',
    mentorType: 'school',
    scores: { theory: 25, attitude: 25, analysis: 24, comprehensive: 21 },
    totalScore: 95,
    comment: '综合表现优秀',
    time: '2026-04-24'
  }
])

// 最终评价数据（双导师维度得分+综合结果）
const final = ref({
  // 校内导师评分维度
  schoolScores: { theory: 25, attitude: 25, analysis: 24, comprehensive: 21 },
  schoolTotal: 95,
  schoolComment: '理论基础扎实，分析问题逻辑清晰，综合素质优秀。',
  // 企业导师评分维度
  enterpriseScores: { practice: 24, attitude: 25, skill: 22, cooperation: 22 },
  enterpriseTotal: 93,
  enterpriseComment: '实践操作熟练，团队协作意识强，能快速解决技术问题。',
  // 综合结果
  total: 94,
  level: '优秀',
  comment: '该生实习期间表现优秀，理论扎实，动手能力强，符合实习要求。'
})
</script>

<style scoped>
.module-box { padding: 20px; }
.el-card { margin-bottom: 15px; }
</style>