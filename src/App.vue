<template>
  <n-config-provider :theme="isDark ? darkTheme : lightTheme">
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
const isDark = computed(() => store.state.isDark)
</script>

<style lang="scss">

</style>
