<template>
  <div class="module-box">
    <h3>6.2.4 考核评价功能</h3>
    <el-card style="margin-bottom: 20px;">
      <p>本模块实现双导师考核评价功能，校内导师与企业导师分别从不同维度对学生实习表现进行评分、填写评语，系统自动汇总成绩，形成客观、全面的实习评价结果，作为实习成绩与评优依据。</p>
    </el-card>

    <!-- 双导师评价区域 -->
    <div style="display: flex; gap: 30px; margin-bottom: 20px;">
      <!-- 校内导师评价 -->
      <el-card style="flex: 1;">
        <h4>校内导师评价</h4>
        <el-form :model="schoolEvalForm" style="margin-top: 15px;">
          <el-form-item label="理论知识" label-width="120px">
            <el-rate v-model="schoolEvalForm.theory" max="100" show-score></el-rate>
          </el-form-item>
          <el-form-item label="学习态度" label-width="120px">
            <el-rate v-model="schoolEvalForm.attitude" max="100" show-score></el-rate>
          </el-form-item>
          <el-form-item label="分析能力" label-width="120px">
            <el-rate v-model="schoolEvalForm.analysis" max="100" show-score></el-rate>
          </el-form-item>
          <el-form-item label="综合素质" label-width="120px">
            <el-rate v-model="schoolEvalForm.quality" max="100" show-score></el-rate>
          </el-form-item>
          <el-form-item label="评价评语" label-width="120px">
            <el-input type="textarea" v-model="schoolEvalForm.comment" placeholder="请输入校内导师评价评语"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交评价</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <!-- 企业导师评价 -->
      <el-card style="flex: 1;">
        <h4>企业导师评价</h4>
        <el-form :model="enterpriseEvalForm" style="margin-top: 15px;">
          <el-form-item label="实践技能" label-width="120px">
            <el-rate v-model="enterpriseEvalForm.skill" max="100" show-score></el-rate>
          </el-form-item>
          <el-form-item label="岗位适配" label-width="120px">
            <el-rate v-model="enterpriseEvalForm.adaptation" max="100" show-score></el-rate>
          </el-form-item>
          <el-form-item label="团队协作" label-width="120px">
            <el-rate v-model="enterpriseEvalForm.teamwork" max="100" show-score></el-rate>
          </el-form-item>
          <el-form-item label="工作态度" label-width="120px">
            <el-rate v-model="enterpriseEvalForm.workAttitude" max="100" show-score></el-rate>
          </el-form-item>
          <el-form-item label="评价评语" label-width="120px">
            <el-input type="textarea" v-model="enterpriseEvalForm.comment" placeholder="请输入企业导师评价评语"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交评价</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!-- 评价结果汇总 -->
    <el-card>
      <h4>实习评价结果汇总</h4>
      <div style="margin-top: 15px; display: flex; flex-wrap: wrap; gap: 20px;">
        <div class="eval-summary">
          <b>校内导师评分：</b>{{ schoolEvalForm.theory + schoolEvalForm.attitude + schoolEvalForm.analysis + schoolEvalForm.quality }} / 400 分
        </div>
        <div class="eval-summary">
          <b>企业导师评分：</b>{{ enterpriseEvalForm.skill + enterpriseEvalForm.adaptation + enterpriseEvalForm.teamwork + enterpriseEvalForm.workAttitude }} / 400 分
        </div>
        <div class="eval-summary">
          <b>综合得分：</b>{{ totalScore }} 分
        </div>
        <div class="eval-summary">
          <b>评价等级：</b>{{ level }}
        </div>
      </div>
      <div style="margin-top: 15px;">
        <b>评价说明：</b>校内导师评价占比 40%，企业导师评价占比 60%，综合计算得出最终成绩，成绩将存入学生实习档案，作为实习合格判定与评优依据。
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 校内导师评价表单
const schoolEvalForm = ref({
  theory: 95,
  attitude: 90,
  analysis: 88,
  quality: 92,
  comment: '该生学习认真，态度端正，能主动解决实习中遇到的问题，理论基础扎实，具备较强的分析能力和综合素质，能按时完成各项实习任务。'
})

// 企业导师评价表单
const enterpriseEvalForm = ref({
  skill: 89,
  adaptation: 93,
  teamwork: 91,
  workAttitude: 94,
  comment: '该生实操能力较强，能快速适应企业岗位需求，团队协作意识良好，工作积极主动，责任心强，能高效完成分配的任务，具备良好的职业素养。'
})

// 计算综合得分（校内40%，企业60%）
const totalScore = computed(() => {
  const schoolTotal = schoolEvalForm.value.theory + schoolEvalForm.value.attitude + schoolEvalForm.value.analysis + schoolEvalForm.value.quality
  const enterpriseTotal = enterpriseEvalForm.value.skill + enterpriseEvalForm.value.adaptation + enterpriseEvalForm.value.teamwork + enterpriseEvalForm.value.workAttitude
  return Math.round((schoolTotal / 400 * 40) + (enterpriseTotal / 400 * 60))
})

// 计算评价等级
const level = computed(() => {
  if (totalScore.value >= 90) return '优秀'
  if (totalScore.value >= 80) return '良好'
  if (totalScore.value >= 70) return '合格'
  return '不合格'
})
</script>

<style scoped>
.module-box {
  padding: 20px;
}
.el-card {
  margin-bottom: 15px;
}
.eval-summary {
  flex: 1;
  min-width: 200px;
  line-height: 1.8;
}
.el-form-item {
  margin-bottom: 15px;
}
</style>