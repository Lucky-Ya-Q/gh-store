<template>
  <n-breadcrumb style="padding-bottom: 24px">
    <n-breadcrumb-item v-for="(path,index) of paths" :key="index" @click="paths.splice(index+1,paths.length-index+1)">
      <n-icon :component="FolderOutline"/>
      {{ path === '' ? '根目录' : path }}
    </n-breadcrumb-item>
  </n-breadcrumb>
  <div class="folder">
    <div v-for="(item,index) of folder" :key="index" @click="paths.push(item.name)">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
import { FolderOutline } from '@vicons/ionicons5'

const store = useStore()
const paths = ref([''])
const folder = ref()

const octokit = computed(() => store.state.octokit)
const user = computed(() => store.state.user)
const currentRepo = computed(() => store.state.currentRepo)
watch(currentRepo, () => {
  if (paths.value.length === 1) {
    path(paths.value)
  } else {
    paths.value.splice(1, paths.value.length - 1)
  }
})
watch(paths.value, (newValue) => {
  path(newValue)
}, { immediate: true })

function path (paths) {
  octokit.value.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: user.value.login,
    repo: currentRepo.value,
    path: paths.join('/')
  }).then((data) => {
    folder.value = data.data
  })
}

</script>

<style scoped lang="scss">

</style>
