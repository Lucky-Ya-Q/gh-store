<template>
  gh-login
</template>

<script setup>
import { Octokit } from '@octokit/core'
import { createOAuthUserClientAuth } from 'octokit-auth-oauth-user-client'

const octokit = new Octokit({
  authStrategy: createOAuthUserClientAuth,
  auth: {
    clientId: 'd18fe7df0f5527d36cd8',
    serviceOrigin: 'http://127.0.0.1:3000',
    servicePathPrefix: '/api/github/oauth/callback'
  }
})

const auth = await octokit.auth()
if (!auth) {
  await octokit.auth({ type: 'signIn' })
} else {
  console.log(await octokit.request('GET /user'))
}
</script>

<style scoped lang="scss">

</style>
