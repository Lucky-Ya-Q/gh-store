<template>
  <n-card title="系统设置">
    <n-space>
      <n-button type="primary" @click="clear">清除缓存</n-button>
      <n-button type="primary" @click="reset">重置配置</n-button>
    </n-space>
  </n-card>
  <n-card title="CDN提供商">
    <n-space vertical>
      <n-select style="width: 200px"
                :value="config.cdnProvider"
                :options="cdnProviders"
                @update:value="handleUpdateValue"/>
    </n-space>
  </n-card>
</template>

<script setup>
import { useStore } from 'vuex'
import { useMessage } from 'naive-ui'
import { computed, reactive } from 'vue'

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

const config = computed(() => store.state.config)

const cdnProviders = reactive([
  {
    label: 'jsDelivr',
    value: 'jsDelivr'
  },
  {
    label: 'Staticaly（推荐）',
    value: 'Staticaly'
  },
  {
    label: 'Cloudflare',
    value: 'Cloudflare'
  }
])

function handleUpdateValue (value) {
  store.commit('setConfig', {
    cdnProvider: value
  })
}
</script>

<style scoped lang="scss">
.n-card {
  margin-bottom: 24px;
}
</style>
