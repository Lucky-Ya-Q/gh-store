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
      'Lucky-Ya-Q': [''] // currentRepo: paths
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
    setConfig (state, config) {
      for (const key in config) {
        state.config[key] = config[key]
      }
    },
    initCurrentDir (state, currentRepo) {
      if (!state.currentDir[currentRepo]) {
        state.currentDir[currentRepo] = ['']
      }
    },
    pushCurrentDir (state, currentDir) {
      state.currentDir[currentDir.currentRepo].push(currentDir.name)
    },
    spliceCurrentDir (state, currentDir) {
      const paths = state.currentDir[currentDir.currentRepo]
      paths.splice(currentDir.index + 1, paths.length - currentDir.index + 1)
    },
    logout (state) {
      state.user = null
      state.repos = null
      state.currentRepo = null
    },
    clear (state) {
      state.currentDir = {}
    },
    reset (state) {
      state.config = {
        isDark: false,
        collapsed: false
      }
      state.setting = {
        cdnProvider: ''
      }
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
})
