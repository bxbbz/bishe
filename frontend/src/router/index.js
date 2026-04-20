import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue' // 新增
import Student from '../views/Student.vue'
import SchoolMentor from '../views/SchoolMentor.vue'
import EnterpriseMentor from '../views/EnterpriseMentor.vue'
import Admin from '../views/Admin.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register }, // 新增注册路由
  { path: '/student', component: Student },
  { path: '/school', component: SchoolMentor },
  { path: '/enterprise', component: EnterpriseMentor },
  { path: '/admin', component: Admin },
]

export default createRouter({
  history: createWebHistory(),
  routes
})