import { createRouter, createWebHashHistory } from 'vue-router'
import GhLayout from '@/views/gh-layout'
import GhIndex from '@/views/gh-index'
import GhUploadImg from '@/views/gh-upload-img'
import GhImageMgr from '@/views/gh-image-mgr'
import GhUserInfo from '@/views/gh-user-info'
import GhSetting from '@/views/gh-setting'
import { computed } from 'vue'
import store from '@/store'

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
      },
      {
        path: 'setting',
        name: 'setting',
        component: GhSetting
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const user = computed(() => store.state.user)
const currentRepo = computed(() => store.state.currentRepo)
const whiteList = ['/index', '/setting']
router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1) {
    // 在免登录白名单
    next()
  } else {
    if (user.value) {
      if (currentRepo.value) {
        next()
      } else {
        // 没有选择仓库
        window.$message.info('请选择图片仓库')
      }
    } else {
      // 没有登录
      window.$message.info('请先登录并且选择图片仓库')
    }
  }
})
export default router
