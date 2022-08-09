<template>
  <n-card title="系统设置">
    <n-space>
      <n-button type="primary" @click="clear">清除缓存</n-button>
      <n-button type="primary" @click="reset">重置配置</n-button>
    </n-space>
  </n-card>
</template>

<script setup>
import { useStore } from 'vuex'
import { useMessage } from 'naive-ui'

const store = useStore()
const message = useMessage()
function clear () {
  store.commit('clear')
  message.success('清除缓存成功')
}
function reset () {
  store.commit('reset')
  message.success('已重置')
}
</script>

<style scoped lang="scss">

</style>
