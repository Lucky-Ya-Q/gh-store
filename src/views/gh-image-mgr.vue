<template>
  <n-breadcrumb style="margin-bottom: 24px">
    <n-breadcrumb-item v-for="(path,index) of paths" :key="index" @click="spliceCurrentDir(index)">
      <n-icon :component="FolderOutline"/>
      {{ path === '' ? '根目录' : path }}
    </n-breadcrumb-item>
  </n-breadcrumb>
  <n-image-group>
    <n-spin :show="show">
      <div class="container" v-if="files.length > 0">
        <template v-for="(file,index) of files" :key="index">
          <div class="dir" v-if="file.type==='dir'" @click="pushCurrentDir(file.name)">
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
            <n-image style="border-radius: 5px" width="140" height="120"
                     :src="dispose(file)"
                     object-fit="cover"/>
            <div style="text-align: center">
              <n-ellipsis style="max-width: 140px">
                {{ file.name }}
              </n-ellipsis>
            </div>
            <n-space justify="end">
              <n-icon size="20" @click="copyUrl(file.name,dispose(file))">
                <logo-github/>
              </n-icon>
              <n-icon size="20" @click="copyUrl(file.name,dispose(file),'md')">
                <logo-markdown/>
              </n-icon>
            </n-space>
          </div>
        </template>
      </div>
      <n-empty v-else description="空文件夹" size="huge">
        <template #icon>
          <n-icon>
            <folder-open-outline/>
          </n-icon>
        </template>
      </n-empty>
    </n-spin>
  </n-image-group>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
import { FolderOpenOutline, FolderOutline, LogoGithub, LogoMarkdown } from '@vicons/ionicons5'
import { getFileSuffix, isImage } from '@/utils/file-utils'
import { useClipboard } from '@vueuse/core'
import { useMessage } from 'naive-ui'

const message = useMessage()
const { copy } = useClipboard()

function copyUrl (name, url, type) {
  if (type === 'md') {
    copy(`![${name}](${url})`).then(() => {
      message.success('复制 Markdown 格式成功！')
    }).catch(() => {
      message.error('复制失败！')
    })
  } else {
    copy(url).then(() => {
      message.success('复制 URL 格式成功！')
    }).catch(() => {
      message.error('复制失败！')
    })
  }
}

const store = useStore()
const files = ref([])
const show = ref(false)

const octokit = computed(() => store.state.octokit)
const user = computed(() => store.state.user)
const currentRepoName = computed(() => store.state.currentRepo.name)
// eslint-disable-next-line no-unused-vars
const currentRepoDefaultBranch = computed(() => store.state.currentRepo.default_branch)
const config = computed(() => store.state.config)

// 每个仓库的当前目录
const currentDir = computed(() => store.state.currentDir)

const paths = computed(() => currentDir.value[currentRepoName.value])

function dispose (file) {
  const cdnProvider = config.value.cdnProvider
  if (cdnProvider === 'jsDelivr') {
    return `https://cdn.jsdelivr.net/gh/${user.value.login}/${currentRepoName.value}/${file.path}`
  } else if (cdnProvider === 'Staticaly') {
    return `https://cdn.staticaly.com/gh/${user.value.login}/${currentRepoName.value}@${currentRepoDefaultBranch.value}/${file.path}`
  } else if (cdnProvider === 'Cloudflare') {
    return `https://git.poker/${user.value.login}/${currentRepoName.value}/blob/${currentRepoDefaultBranch.value}/${file.path}?raw=true`
  }
}

watch(paths, (newValue) => {
  if (!newValue) {
    store.commit('setCurrentDir', {
      currentRepo: currentRepoName.value,
      name: newValue = ['']
    })
  }
  getFiles(newValue)
}, {
  immediate: true,
  deep: true
})

function getFiles (paths) {
  if (!user.value || !currentRepoName.value) return
  show.value = true
  octokit.value.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: user.value.login,
    repo: currentRepoName.value,
    path: paths.join('/')
  }).then((data) => {
    files.value = filter(data.data)
  }).finally(() => {
    show.value = false
  })
}

function pushCurrentDir (name) {
  store.commit('pushCurrentDir', {
    currentRepo: currentRepoName.value,
    name
  })
}

function spliceCurrentDir (index) {
  store.commit('spliceCurrentDir', {
    currentRepo: currentRepoName.value,
    index
  })
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
.container {
  display: grid;
  justify-content: space-evenly;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-gap: 10px;
}

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
