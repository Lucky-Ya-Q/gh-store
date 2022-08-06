const {
  OAuthApp,
  createNodeMiddleware
} = require('@octokit/oauth-app')

const app = new OAuthApp({
  clientType: 'oauth-app',
  clientId: 'd18fe7df0f5527d36cd8',
  clientSecret: '13f5a94b3e453ddd948ff1e32645ce3b16015560'
})

app.on('token', async ({ octokit }) => {
  const { data } = await octokit.request('GET /user')
  console.log(`Token retrieved for ${data.login}`)
})

require('http').createServer(createNodeMiddleware(app)).listen(3000)
// can now receive user authorization callbacks at /api/github/oauth/callback
// See all endpoints at https://github.com/octokit/oauth-app.js#middlewares
