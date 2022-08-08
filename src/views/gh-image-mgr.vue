<template>
  <n-breadcrumb style="padding-bottom: 24px">
    <n-breadcrumb-item v-for="(path,index) of paths" :key="index" @click="paths.splice(index+1,paths.length-index+1)">
      <n-icon :component="FolderOutline"/>
      {{ path === '' ? '根目录' : path }}
    </n-breadcrumb-item>
  </n-breadcrumb>
  <n-image-group>
    <n-spin :show="show">
      <n-space>
        <template v-for="(file,index) of files" :key="index">
          <div class="dir" v-if="file.type==='dir'" @click="tz(file.name)">
            <n-icon size="120" style="width: 100%">
              <folder-outline/>
            </n-icon>
            <div style="text-align: center">{{ file.name }}</div>
          </div>
          <div class="img" v-else>
            <n-image width="150" height="120" :src="file.download_url" object-fit="contain"/>
            <div style="text-align: center">{{ file.name }}</div>
          </div>
        </template>
      </n-space>
    </n-spin>
  </n-image-group>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
import { FolderOutline } from '@vicons/ionicons5'

const store = useStore()
const paths = ref([''])
const files = ref()
const show = ref(false)

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
  show.value = true
  octokit.value.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: user.value.login,
    repo: currentRepo.value,
    path: paths.join('/')
  }).then((data) => {
    files.value = data.data
  }).finally(() => {
    show.value = false
  })
}

function tz (name) {
  paths.value.push(name)
}

</script>

<style scoped lang="scss">
.dir,
.img {
  width: 150px;
  height: 170px;
  padding: 10px;
  border: solid 1px rgb(128, 128, 128);
  border-radius: 8px;
}

.dir {
  //谁做过渡给谁加
  transition: all .3s;
  cursor: pointer;

  &:hover {
    background-color: rgba(128, 128, 128, 0.2);
  }
}
</style>
