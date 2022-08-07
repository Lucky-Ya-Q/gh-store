<template>
  <n-config-provider :theme="isDark ? darkTheme : lightTheme">
    <n-message-provider>
      <gh-layout></gh-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import GhLayout from '@/views/gh-layout'
import { darkTheme, lightTheme } from 'naive-ui'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const isDark = computed(() => store.state.isDark)
</script>

<style lang="scss">

</style>
