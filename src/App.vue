<template>
  <n-config-provider :theme="config.isDark ? darkTheme : lightTheme">
    <n-dialog-provider>
      <n-message-provider>
        <router-view></router-view>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup>
import { darkTheme, lightTheme } from 'naive-ui'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const config = computed(() => store.state.config)
</script>

<style lang="scss">

</style>
