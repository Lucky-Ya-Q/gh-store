<template>
  <div v-if="user">
    <button>{{ user.name }}</button>
    <button @click="logout">退出登录</button>
  </div>
  <button v-else @click="login">登录</button>
</template>

<script setup>
import { Octokit } from '@octokit/core'
import { createOAuthUserClientAuth } from 'octokit-auth-oauth-user-client'
import { ref } from 'vue'

const octokit = new Octokit({
  authStrategy: createOAuthUserClientAuth,
  auth: {
    clientId: 'd18fe7df0f5527d36cd8',
    serviceOrigin: 'https://oauth-app-seven.vercel.app',
    servicePathPrefix: '/api/github/oauth'
  }
})

const user = ref()
octokit.auth().then(auth => {
  if (!auth) return
  octokit.request('GET /user').then(data => {
    console.log(data.data)
    user.value = data.data
  })
})

function login () {
  octokit.auth({ type: 'signIn' })
}

function logout () {
  octokit.auth({
    type: 'deleteToken',
    offline: true
  }).then(() => {
    user.value = undefined
  })
}
</script>

<style scoped lang="scss">

</style>
