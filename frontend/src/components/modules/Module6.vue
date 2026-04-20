<template>
  <div class="module-box">
    <h3>6.2.6 指导沟通功能</h3>
    <el-card style="margin-bottom: 20px;">
      <p>本模块为学生与双导师提供 <b>私信交流</b> 与 <b>公开讨论区</b> 双渠道沟通方式。私信支持一对一精准答疑，讨论区支持匿名发帖提问、分享经验，所有沟通记录均可追溯查询，助力实习问题高效解决。</p>
    </el-card>

    <!-- 模式切换：私信 / 讨论区 -->
    <el-card style="margin-bottom: 20px;">
      <el-radio-group v-model="activeMode" size="large" @change="switchMode">
        <el-radio label="private" border>私信交流</el-radio>
        <el-radio label="public" border style="margin-left: 20px;">匿名讨论区</el-radio>
      </el-radio-group>
    </el-card>

    <!-- 1. 私信交流模式 -->
    <div v-if="activeMode === 'private'">
      <div style="display: flex; height: 500px; gap: 15px;">
        <!-- 左侧：联系人列表 -->
        <el-card style="width: 250px;">
          <h4>私信联系人</h4>
          <div style="margin-top: 15px;">
            <div 
              class="contact-item" 
              :class="{ active: activeContact === item.id }"
              @click="activeContact = item.id"
              v-for="item in contactList"
              :key="item.id"
            >
              <div class="contact-name">
                {{ item.name }}
                <el-tag size="small" v-if="item.unread > 0" type="danger">{{ item.unread }}</el-tag>
              </div>
              <div class="contact-role">{{ item.role }}</div>
            </div>
          </div>
        </el-card>

        <!-- 右侧：私信聊天窗口 -->
        <el-card style="flex: 1; display: flex; flex-direction: column;">
          <div class="chat-header">
            <b>{{ contactList.find(item => item.id === activeContact)?.name }}</b>
            <span style="margin-left: 10px; color: #666;">{{ contactList.find(item => item.id === activeContact)?.role }}</span>
          </div>
          <div class="chat-content">
            <div class="chat-item left" v-for="(msg, index) in privateMsgList" :key="index">
              <div class="chat-avatar">{{ msg.sender.charAt(0) }}</div>
              <div class="chat-info">
                <div class="chat-msg">{{ msg.content }}</div>
                <div class="chat-time">{{ msg.time }}</div>
              </div>
            </div>
          </div>
          <div class="chat-input">
            <el-input v-model="privateSendMsg" placeholder="输入要咨询/反馈的内容..." />
            <el-button type="primary" style="margin-left: 10px;" @click="sendPrivateMsg">发送</el-button>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 2. 匿名讨论区模式 -->
    <div v-if="activeMode === 'public'">
      <div style="display: flex; height: 500px; gap: 15px;">
        <!-- 左侧：讨论区帖子列表 -->
        <el-card style="width: 300px;">
          <h4>讨论区帖子</h4>
          <div style="margin-top: 15px; height: calc(100% - 40px); overflow-y: auto;">
            <div 
              class="post-item"
              :class="{ active: activePost === item.id }"
              @click="activePost = item.id; getPostDetail(item.id)"
              v-for="item in postList"
              :key="item.id"
            >
              <div class="post-title">{{ item.title }}</div>
              <div class="post-meta">
                <span>{{ item.author }}</span>
                <span>{{ item.time }}</span>
                <span>回复 {{ item.replyCount }}</span>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 右侧：帖子详情+匿名发帖 -->
        <el-card style="flex: 1; display: flex; flex-direction: column;">
          <!-- 匿名发帖区域 -->
          <div class="post-input-area">
            <el-checkbox v-model="isAnonymous" style="margin-bottom: 10px;">匿名发帖</el-checkbox>
            <el-input v-model="postTitle" placeholder="请输入帖子标题（如：Vue组件化路径问题）"></el-input>
            <el-input
              v-model="postContent"
              type="textarea"
              :rows="3"
              placeholder="请输入问题详情/经验分享..."
              style="margin-top: 10px;"
            ></el-input>
            <el-button type="primary" style="margin-top: 10px;" @click="publishPost">发布帖子</el-button>
          </div>

          <!-- 帖子详情区域 -->
          <div class="post-detail-area" v-if="activePost">
            <div class="post-detail-header">
              <h4>{{ currentPost.title }}</h4>
              <div class="post-detail-meta">
                <span>{{ currentPost.author }}</span>
                <span>{{ currentPost.time }}</span>
              </div>
            </div>
            <div class="post-detail-content">{{ currentPost.content }}</div>

            <!-- 回复列表 -->
            <div class="reply-list">
              <h5>回复区（{{ currentPost.replyCount }}）</h5>
              <div class="reply-item" v-for="(reply, index) in currentPost.replies" :key="index">
                <div class="reply-author">{{ reply.author }}</div>
                <div class="reply-content">{{ reply.content }}</div>
                <div class="reply-time">{{ reply.time }}</div>
              </div>
            </div>

            <!-- 回复输入 -->
            <div class="reply-input">
              <el-input v-model="replyContent" placeholder="输入回复内容..."></el-input>
              <el-button type="primary" style="margin-top: 10px;" @click="replyPost">回复</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 通用：沟通记录查询 -->
    <el-card style="margin-top: 20px;">
      <h4>沟通记录查询</h4>
      <div style="margin-top: 15px; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
        <el-select v-model="queryType" placeholder="选择查询类型" style="width: 150px;">
          <el-option label="私信记录" value="private"></el-option>
          <el-option label="讨论区帖子" value="public"></el-option>
        </el-select>
        <el-date-picker v-model="dateRange" type="daterange" placeholder="选择查询日期范围" style="width: 250px;"></el-date-picker>
        <el-button type="primary">查询记录</el-button>
        <el-button type="success">导出记录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// ------------- 基础模式切换 -------------
const activeMode = ref('private') // private:私信 / public:讨论区
const switchMode = () => {
  // 切换模式时重置输入框
  privateSendMsg.value = ''
  postTitle.value = ''
  postContent.value = ''
  replyContent.value = ''
}

// ------------- 1. 私信交流相关数据 -------------
const contactList = ref([
  { id: 1, name: '李老师', role: '校内导师', unread: 0 },
  { id: 2, name: '王工', role: '企业导师', unread: 2 },
  { id: 3, name: '张三', role: '同学（同课题）', unread: 1 }
])
const activeContact = ref(1)
const privateMsgList = ref([
  { sender: '学生', content: '李老师，vite配置@别名后还是报错，怎么办？', time: '14:30' },
  { sender: '李老师', content: '检查一下vite.config.js的路径是否正确，重启服务试试', time: '14:32' },
  { sender: '学生', content: '重启后好了！谢谢老师~', time: '14:35' }
])
const privateSendMsg = ref('')

// 发送私信
const sendPrivateMsg = () => {
  if (privateSendMsg.value.trim()) {
    privateMsgList.value.push({
      sender: '学生',
      content: privateSendMsg.value,
      time: new Date().toLocaleTimeString().slice(0, 5)
    })
    privateSendMsg.value = ''
  }
}

// ------------- 2. 匿名讨论区相关数据 -------------
const postList = ref([
  { id: 1, title: 'Vue组件化路径配置问题', author: '匿名用户', time: '2026-04-20', replyCount: 3 },
  { id: 2, title: 'Element Plus表格样式修改技巧', author: '匿名用户', time: '2026-04-19', replyCount: 2 },
  { id: 3, title: '实习日志撰写经验分享', author: '匿名用户', time: '2026-04-18', replyCount: 5 }
])
const activePost = ref(1)
const isAnonymous = ref(true)
const postTitle = ref('')
const postContent = ref('')
const replyContent = ref('')

// 帖子详情数据
const currentPost = ref({
  id: 1,
  title: 'Vue组件化路径配置问题',
  author: '匿名用户',
  time: '2026-04-20',
  content: '我在使用Vue+Vite做组件化开发时，配置@别名后还是无法识别组件路径，重启服务也没用，有没有同学遇到过类似问题？求解答！',
  replyCount: 3,
  replies: [
    { author: '李老师', content: '检查vite.config.js中resolve.alias的配置，确保@指向src目录', time: '2026-04-20 15:00' },
    { author: '匿名用户', content: '我也遇到过，把import路径里的@改成./就好了', time: '2026-04-20 15:10' },
    { author: '王工', content: '建议用绝对路径测试，排除配置问题', time: '2026-04-20 15:20' }
  ]
})

// 获取帖子详情
const getPostDetail = (postId) => {
  // 模拟根据帖子ID获取详情
  const post = postList.value.find(item => item.id === postId)
  if (post) {
    // 这里可以根据实际需求从后端获取，此处模拟
    currentPost.value = {
      id: post.id,
      title: post.title,
      author: post.author,
      time: post.time,
      content: post.id === 1 ? '我在使用Vue+Vite做组件化开发时，配置@别名后还是无法识别组件路径，重启服务也没用，有没有同学遇到过类似问题？求解答！' : 
               post.id === 2 ? 'Element Plus的表格默认样式不好看，怎么修改表头和行的样式？求具体代码示例' : 
               '分享一下实习日志的撰写技巧：1. 记录每日核心工作；2. 总结遇到的问题；3. 写下收获与反思',
      replyCount: post.replyCount,
      replies: post.id === 1 ? currentPost.value.replies : []
    }
  }
}

// 发布帖子
const publishPost = () => {
  if (!postTitle.value.trim() || !postContent.value.trim()) return
  const newPostId = postList.value.length + 1
  postList.value.unshift({
    id: newPostId,
    title: postTitle.value,
    author: isAnonymous.value ? '匿名用户' : '学生',
    time: new Date().toLocaleDateString(),
    replyCount: 0
  })
  // 自动选中新发布的帖子
  activePost.value = newPostId
  currentPost.value = {
    id: newPostId,
    title: postTitle.value,
    author: isAnonymous.value ? '匿名用户' : '学生',
    time: new Date().toLocaleDateString(),
    content: postContent.value,
    replyCount: 0,
    replies: []
  }
  // 清空输入框
  postTitle.value = ''
  postContent.value = ''
  isAnonymous.value = true
}

// 回复帖子
const replyPost = () => {
  if (!replyContent.value.trim()) return
  currentPost.value.replies.push({
    author: isAnonymous.value ? '匿名用户' : '学生',
    content: replyContent.value,
    time: new Date().toLocaleTimeString().slice(0, 5)
  })
  currentPost.value.replyCount += 1
  // 更新帖子列表的回复数
  const post = postList.value.find(item => item.id === activePost.value)
  if (post) post.replyCount += 1
  replyContent.value = ''
}

// ------------- 3. 通用查询相关数据 -------------
const queryType = ref('private')
const dateRange = ref('')

// 初始化获取第一个帖子详情
getPostDetail(1)
</script>

<style scoped>
.module-box {
  padding: 20px;
}
.el-card {
  margin-bottom: 15px;
}

/* 私信联系人样式 */
.contact-item {
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 6px;
  margin-bottom: 5px;
  transition: all 0.3s;
}
.contact-item:hover {
  background: #e6f7ff;
}
.contact-item.active {
  background: #409EFF;
  color: white;
}
.contact-name {
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.contact-role {
  font-size: 12px;
  color: #666;
  margin-top: 3px;
}

/* 私信聊天窗口样式 */
.chat-header {
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
}
.chat-content {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
}
.chat-item {
  display: flex;
  margin-bottom: 15px;
}
.chat-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #409EFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}
.chat-info {
  max-width: 60%;
}
.chat-msg {
  padding: 8px 12px;
  border-radius: 8px;
  background: #f5f5f5;
}
.chat-time {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
  margin-left: 10px;
}
.chat-input {
  padding: 10px 15px;
  border-top: 1px solid #eee;
  display: flex;
}
.chat-input .el-input {
  flex: 1;
}

/* 讨论区帖子样式 */
.post-item {
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 8px;
  border: 1px solid #eee;
  transition: all 0.3s;
}
.post-item:hover {
  border-color: #409EFF;
}
.post-item.active {
  border-color: #409EFF;
  background: #e6f7ff;
}
.post-title {
  font-weight: 500;
  margin-bottom: 5px;
}
.post-meta {
  font-size: 12px;
  color: #666;
  display: flex;
  justify-content: space-between;
}

/* 讨论区发帖区域 */
.post-input-area {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.post-input-area .el-input {
  width: 100%;
}

/* 讨论区帖子详情 */
.post-detail-area {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
}
.post-detail-header {
  margin-bottom: 10px;
}
.post-detail-meta {
  font-size: 12px;
  color: #666;
}
.post-detail-content {
  line-height: 1.8;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.reply-list {
  margin-bottom: 20px;
}
.reply-item {
  padding: 10px;
  border-radius: 6px;
  background: #f5f5f5;
  margin-bottom: 10px;
}
.reply-author {
  font-size: 12px;
  color: #666;
}
.reply-content {
  margin: 5px 0;
}
.reply-time {
  font-size: 12px;
  color: #999;
  text-align: right;
}
.reply-input .el-input {
  width: 100%;
}
</style>