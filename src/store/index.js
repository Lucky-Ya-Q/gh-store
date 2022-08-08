import { createStore } from 'vuex'
import { Octokit } from '@octokit/core'
import { createOAuthUserClientAuth } from 'octokit-auth-oauth-user-client'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    // GitHub SDK
    octokit: new Octokit({
      authStrategy: createOAuthUserClientAuth,
      auth: {
        clientId: 'd18fe7df0f5527d36cd8',
        serviceOrigin: 'https://oauth-app-seven.vercel.app',
        servicePathPrefix: '/api/github/oauth'
      }
    }),
    // GitHub 用户信息
    user: null,
    // GitHub 仓库列表
    repos: null,
    // 当前选中的仓库
    currentRepo: null,
    // 每个仓库的当前目录
    currentDir: {
      'Lucky-Ya-Q': ['']
    },
    config: {
      // 暗黑模式
      isDark: false,
      // 菜单是否折叠，值在菜单为垂直时有用
      collapsed: false
    },
    setting: {
      cdnProvider: ''
    }
  },
  getters: {},
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setRepos (state, repos) {
      state.repos = repos
    },
    setCurrentRepo (state, currentRepo) {
      state.currentRepo = currentRepo
    },
    setIsDark (state, isDark) {
      state.config.isDark = isDark
    },
    setCollapsed (state, collapsed) {
      state.config.collapsed = collapsed
    },
    setCurrentDir (state, currentDir) {
      state.config.currentDir[currentDir.key] = [currentDir.value]
    },
    logout (state) {
      state.user = null
      state.repos = null
      state.currentRepo = null
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
})
