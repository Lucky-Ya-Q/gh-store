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
    // 暗黑模式
    isDark: false
  },
  getters: {},
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setIsDark (state, isDark) {
      state.isDark = isDark
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
})
