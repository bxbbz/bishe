<template>
  <div class="module-box">
    <h3>6.2.4 考核评价功能（企业导师端）</h3>
    <el-card style="margin-bottom:20px;">
      <p>本模块支持企业导师对学生进行<strong>多阶段性评价</strong>与<strong>最终综合评价</strong>，评分维度：实践、态度、技能、协作。</p>
    </el-card>

    <el-tabs v-model="activeTab" type="card">
      <!-- 阶段性评价 -->
      <el-tab-pane label="阶段性评价" name="stage">
        <el-card style="margin-top:15px;">
          <h4>选择学生 & 评价阶段</h4>
          <el-form :model="stageForm" inline style="margin-top:15px;">
            <el-form-item label="学生" required>
              <el-select v-model="stageForm.student" style="width:160px;">
                <el-option label="张三" value="张三"></el-option>
                <el-option label="李四" value="李四"></el-option>
                <el-option label="王五" value="王五"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="评价阶段" required>
              <el-select v-model="stageForm.stage" style="width:160px;">
                <el-option label="第一阶段" value="第一阶段"></el-option>
                <el-option label="第二阶段" value="第二阶段"></el-option>
                <el-option label="第三阶段" value="第三阶段"></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <h4 style="margin-top:20px;">评价内容（总分100分，每一项0-25分）</h4>
          <el-form :model="stageForm" label-width="120px" style="margin-top:15px;">
            <!-- 企业导师专属评分维度 -->
            <el-form-item label="实践能力" required>
              <el-input v-model.number="stageForm.scores.practice" placeholder="0-25分" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="工作态度" required>
              <el-input v-model.number="stageForm.scores.attitude" placeholder="0-25分" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="专业技能" required>
              <el-input v-model.number="stageForm.scores.skill" placeholder="0-25分" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="协作能力" required>
              <el-input v-model.number="stageForm.scores.cooperation" placeholder="0-25分" style="width:200px;"></el-input>
            </el-form-item>

            <!-- 自动计算总分 -->
            <el-form-item label="阶段总分">
              <el-input v-model="stageForm.totalScore" disabled style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="评价评语" required>
              <el-input type="textarea" v-model="stageForm.comment" :rows="3" placeholder="请输入阶段性评价评语"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="calculateStageScore">计算总分</el-button>
              <el-button type="success" style="margin-left:10px;" @click="submitStage">提交阶段评价</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <!-- 最终评价 -->
      <el-tab-pane label="最终评价" name="final">
        <el-card style="margin-top:15px;">
          <h4>最终综合评价</h4>
          <el-form :model="finalForm" label-width="120px" style="margin-top:15px;">
            <el-form-item label="学生" required>
              <el-select v-model="finalForm.student" style="width:160px;">
                <el-option label="张三" value="张三"></el-option>
                <el-option label="李四" value="李四"></el-option>
              </el-select>
            </el-form-item>

            <!-- 企业导师专属最终评分维度 -->
            <el-form-item label="实践能力" required>
              <el-input v-model.number="finalForm.scores.practice" placeholder="0-25分" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="工作态度" required>
              <el-input v-model.number="finalForm.scores.attitude" placeholder="0-25分" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="专业技能" required>
              <el-input v-model.number="finalForm.scores.skill" placeholder="0-25分" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="协作能力" required>
              <el-input v-model.number="finalForm.scores.cooperation" placeholder="0-25分" style="width:200px;"></el-input>
            </el-form-item>

            <!-- 自动计算最终总分 -->
            <el-form-item label="最终总分">
              <el-input v-model="finalForm.totalScore" disabled style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="综合评语" required>
              <el-input type="textarea" v-model="finalForm.comment" :rows="3" placeholder="请输入最终综合评价评语"></el-input>
            </el-form-item>
            <el-form-item label="评定等级" required>
              <el-select v-model="finalForm.level" style="width:160px;">
                <el-option label="优秀" value="优秀"></el-option>
                <el-option label="良好" value="良好"></el-option>
                <el-option label="合格" value="合格"></el-option>
                <el-option label="不合格" value="不合格"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="calculateFinalScore">计算总分</el-button>
              <el-button type="success" style="margin-left:10px;" @click="submitFinal">提交最终评价</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const activeTab = ref('stage')

// 阶段性评价表单
const stageForm = ref({
  student: '张三',
  stage: '第一阶段',
  scores: {
    practice: 0,
    attitude: 0,
    skill: 0,
    cooperation: 0
  },
  totalScore: 0,
  comment: ''
})

// 最终评价表单
const finalForm = ref({
  student: '张三',
  scores: {
    practice: 0,
    attitude: 0,
    skill: 0,
    cooperation: 0
  },
  totalScore: 0,
  comment: '',
  level: '优秀'
})

// 计算阶段性评价总分
const calculateStageScore = () => {
  const total = stageForm.value.scores.practice + stageForm.value.scores.attitude + stageForm.value.scores.skill + stageForm.value.scores.cooperation
  if (total > 100) {
    alert('总分不能超过100分！')
    stageForm.value.totalScore = 100
  } else if (total < 0) {
    alert('总分不能低于0分！')
    stageForm.value.totalScore = 0
  } else {
    stageForm.value.totalScore = total
  }
}

// 计算最终评价总分
const calculateFinalScore = () => {
  const total = finalForm.value.scores.practice + finalForm.value.scores.attitude + finalForm.value.scores.skill + finalForm.value.scores.cooperation
  if (total > 100) {
    alert('总分不能超过100分！')
    finalForm.value.totalScore = 100
  } else if (total < 0) {
    alert('总分不能低于0分！')
    finalForm.value.totalScore = 0
  } else {
    finalForm.value.totalScore = total
  }
}

// 提交阶段性评价
const submitStage = () => {
  if (!stageForm.value.comment) {
    alert('请填写评价评语！')
    return
  }
  if (stageForm.value.totalScore === 0) {
    alert('请计算并确认总分！')
    return
  }
  alert(`阶段性评价提交成功！学生：${stageForm.value.student}，阶段：${stageForm.value.stage}，总分：${stageForm.value.totalScore}分`)
}

// 提交最终评价
const submitFinal = () => {
  if (!finalForm.value.comment) {
    alert('请填写综合评语！')
    return
  }
  if (finalForm.value.totalScore === 0) {
    alert('请计算并确认总分！')
    return
  }
  alert(`最终评价提交成功！学生：${finalForm.value.student}，等级：${finalForm.value.level}，总分：${finalForm.value.totalScore}分`)
}
</script>

<style scoped>
.module-box { padding: 20px; }
.el-card { margin-bottom: 15px; }
.el-form-item { margin-bottom: 15px; }
</style>