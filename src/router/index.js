import { createRouter, createWebHashHistory } from 'vue-router'
import GhLayout from '@/views/gh-layout'
import GhIndex from '@/views/gh-index'
import GhUploadImg from '@/views/gh-upload-img'
import GhImageMgr from '@/views/gh-image-mgr'
import GhUserInfo from '@/views/gh-user-info'

// 路由name必须和导航key对应
const routes = [
  {
    path: '/',
    redirect: '/index',
    component: GhLayout,
    children: [
      {
        path: 'index',
        name: 'index',
        component: GhIndex
      },
      {
        path: 'upload-img',
        name: 'uploadImg',
        component: GhUploadImg
      },
      {
        path: 'image-mgr',
        name: 'imageMgr',
        component: GhImageMgr
      },
      {
        path: 'user-info',
        name: 'userInfo',
        component: GhUserInfo
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
