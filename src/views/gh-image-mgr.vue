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
            <div style="text-align: center">
              <n-ellipsis style="max-width: 140px">
                {{ file.name }}
              </n-ellipsis>
            </div>
          </div>
          <div class="img" v-else>
            <n-image style="border-radius: 5px" width="140" height="120" :src="file.download_url" object-fit="cover"/>
            <div style="text-align: center">
              <n-ellipsis style="max-width: 140px">
                {{ file.name }}
              </n-ellipsis>
            </div>
            <n-space justify="end">
              <n-icon size="20">
                <logo-github/>
              </n-icon>
              <n-icon size="20">
                <logo-markdown/>
              </n-icon>
            </n-space>
          </div>
        </template>
      </n-space>
    </n-spin>
  </n-image-group>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
import { FolderOutline, LogoGithub, LogoMarkdown } from '@vicons/ionicons5'
import { getFileSuffix, isImage } from '@/utils/file-utils'

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
    files.value = filter(data.data)
  }).finally(() => {
    show.value = false
  })
}

function tz (name) {
  paths.value.push(name)
}

function filter (files) {
  const dirs = [] // 目录
  const imgs = [] // 图片
  files.forEach(file => {
    if (file.type === 'dir') {
      dirs.push(file)
    } else if (file.type === 'file' && isImage(getFileSuffix(file.name))) {
      imgs.push(file)
    }
  })
  return [...dirs, ...imgs]
}
</script>

<style scoped lang="scss">
.dir,
.img {
  width: 140px;
  height: 170px;
  padding: 10px;
  //border: solid 1px rgb(128, 128, 128);
  border-radius: 8px;
  //谁做过渡给谁加
  transition: all .3s;

  &:hover {
    background-color: rgba(128, 128, 128, 0.2);
  }
}

.dir {
  cursor: pointer;
}

.img {
  .n-icon {
    display: none;
    cursor: pointer;
  }

  &:hover {
    .n-icon {
      display: inline-block;
    }
  }
}
</style>
