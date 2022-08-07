<template>
  <div class="gh-header">
    <div class="logo">
      <n-icon size="40">
        <logo-github/>
      </n-icon>
      <h2>gh-store</h2>
    </div>
    <div class="button">
      <n-space>
        <n-button @click="toggleTheme" quaternary>
          {{ isDark ? '浅色' : '深色' }}
        </n-button>
        <n-dropdown v-if="user" trigger="hover" :options="options" @select="handleSelect">
          <n-tag :bordered="false" size="large" checkable>
            {{ user.name }}
            <template #avatar>
              <n-avatar :src="user.avatar_url"/>
            </template>
          </n-tag>
        </n-dropdown>
        <n-button v-else @click="login" quaternary :disabled="loginButton.disabled">
          {{ loginButton.text }}
        </n-button>
      </n-space>
    </div>
  </div>
</template>

<script setup>
import { LogoGithub } from '@vicons/ionicons5'
import { computed, reactive } from 'vue'
import { useDialog, useMessage } from 'naive-ui'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const message = useMessage()
const router = useRouter()

const octokit = computed(() => store.state.octokit)
const user = computed(() => store.state.user)
const isDark = computed(() => store.state.isDark)

function toggleTheme () {
  store.commit('setIsDark', !isDark.value)
}

const loginButton = reactive({
  text: '登录',
  disabled: true
})
octokit.value.auth().then(auth => {
  if (auth) {
    loginButton.text = '登录中'
    octokit.value.request('GET /user').then(data => {
      store.commit('setUser', data.data)
    }).catch((e) => {
      message.error(e.message)
      logout()
    }).finally(() => {
      loginButton.text = '登录'
      loginButton.disabled = false
    })
  } else {
    loginButton.disabled = false
  }
})

function login () {
  loginButton.disabled = true
  octokit.value.auth({ type: 'signIn' })
}

const dialog = useDialog()

function handleSelect (key) {
  switch (key) {
    case 'userInfo':
      router.push('/user-info')
      // message.info(String(key))
      // octokit.value.request('GET /user/repos', {}).then((data) => {
      //   console.log(data)
      // })
      break
    case 'logout':
      dialog.warning({
        title: '警告',
        content: '确定退出登录吗？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          logout('退出成功')
        }
      })
      break
  }
}

const options = reactive([
  {
    label: '个人中心',
    key: 'userInfo'
  },
  {
    label: '退出登录',
    key: 'logout'
  }
])

function logout (msg) {
  octokit.value.auth({
    type: 'deleteToken',
    offline: true
  }).then(() => {
    store.commit('setUser', null)
    router.push('/index')
    if (msg) {
      message.success(msg)
    }
  })
}
</script>

<style scoped lang="scss">
.gh-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .logo {
    width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
