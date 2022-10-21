import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    // 路由的懒加载 , 当前页面中 渲染了哪一个数组 vue1就加载哪一个路由对应的组件
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: 'home', // 重定向 , 页面加载时显示的路径网页
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'que',
        name: 'que',
        component: () => import('@/views/que')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]

  }

]

const router = new VueRouter({
  routes
})

export default router
