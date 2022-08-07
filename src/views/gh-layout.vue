<template>
  <n-layout position="absolute">
    <n-layout-header style="height: 64px" bordered>
      <gh-header></gh-header>
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px" has-sider>
      <n-layout-sider bordered
                      collapse-mode="width"
                      :width="style.width"
                      :collapsed-width="style.collapsedWidth"
                      :collapsed="collapsed"
                      show-trigger="bar"
                      @collapse="collapsed = true"
                      @expand="collapsed = false">
        <n-menu
          v-model:value="activeKey"
          :collapsed="collapsed"
          :collapsed-width="style.collapsedWidth"
          :options="menuOptions"
        />
      </n-layout-sider>
      <n-layout content-style="padding: 24px" :native-scrollbar="false">
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
        <n-h2>平山道</n-h2>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script setup>
import { h, reactive, ref } from 'vue'
import { NIcon } from 'naive-ui'
import { BookOutline as BookIcon } from '@vicons/ionicons5'
import GhHeader from '@/views/gh-header'

const style = reactive({
  width: 240,
  collapsedWidth: 64
})

function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const activeKey = ref(null)
const collapsed = ref(false)

const menuOptions = [
  {
    label: '首页',
    key: 'shouye',
    icon: renderIcon(BookIcon)
  },
  {
    label: '上传图片',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  },
  {
    label: '图片管理',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon)
  }
]
</script>

<style scoped lang="scss">

</style>
