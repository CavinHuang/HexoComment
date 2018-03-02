/**
 * router middleware
 * @type {[type]}
 */
const Router = require('koa-router')

const router = new Router({
  prefix: '/api'
})

module.exports = (app) => {
  let home = app.controllers.home
  router.get('/a', home.index.index)

  // 用户相关
  // router.post('/user', home.user.add)
  router.delete('/user', home.user.delete)
  router.put('/user/:id', home.user.update)
  router.get('/user/:id', home.user.fetch)
  router.get('/user', home.user.fetch)

  // auth token
  router.post('/login', home.auth.login)
  router.post('/register', home.auth.register)
  // router.get('/refreshToken', home.auth.refreshToken)

  // websites
  router.get('/website/:id', home.websites.fetch)
  router.post('/website', home.websites.add)
  router.put('/website/:id', home.websites.update)
  router.delete('/website/:id', home.websites.delete)

  app.use(router.routes())
    .use(router.allowedMethods())
}
