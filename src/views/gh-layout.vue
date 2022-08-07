<template>
  <n-layout position="absolute" style="min-width: 650px">
    <n-layout-header style="height: 64px" bordered>
      <gh-header></gh-header>
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px" has-sider>
      <n-layout-sider bordered
                      collapse-mode="width"
                      :width="style.width"
                      :collapsed-width="style.collapsedWidth"
                      :collapsed="config.collapsed"
                      show-trigger="bar"
                      @collapse="setCollapsed(true)"
                      @expand="setCollapsed(false)">
        <n-menu
          :collapsed="config.collapsed"
          :collapsed-width="style.collapsedWidth"
          :options="menuOptions"
          :value="currentRoute.name"
        />
      </n-layout-sider>
      <n-layout content-style="padding: 24px" :native-scrollbar="false">
        <router-view></router-view>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script setup>
import { computed, h, reactive } from 'vue'
import { NIcon } from 'naive-ui'
import { CloudUploadOutline, HomeOutline, ImagesOutline } from '@vicons/ionicons5'
import GhHeader from '@/views/gh-header'
import { RouterLink, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const style = reactive({
  width: 240,
  collapsedWidth: 64
})
const currentRoute = useRoute()

function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const store = useStore()
const config = computed(() => store.state.config)

function setCollapsed (collapsed) {
  store.commit('setCollapsed', collapsed)
}

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/index'
        },
        { default: () => '首页' }
      ),
    key: 'index',
    icon: renderIcon(HomeOutline)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/upload-img'
        },
        { default: () => '上传图片' }
      ),
    key: 'uploadImg',
    icon: renderIcon(CloudUploadOutline)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/image-mgr'
        },
        { default: () => '图片管理' }
      ),
    key: 'imageMgr',
    icon: renderIcon(ImagesOutline)
  }
]
</script>

<style scoped lang="scss">

</style>
