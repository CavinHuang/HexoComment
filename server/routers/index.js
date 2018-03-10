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
  router.get('/website', home.websites.fetch)
  router.post('/website', home.websites.add)
  router.put('/website/:id', home.websites.update)
  router.delete('/website/:id', home.websites.delete)

  // websites type
  router.get('/website_type/:id', home.websitesType.fetch)
  router.get('/website_type', home.websitesType.fetch)
  router.post('/website_type', home.websitesType.add)
  router.put('/website_type/:id', home.websitesType.update)
  router.delete('/website_type/:id', home.websitesType.delete)

  // utile router
  router.post('/upload', app.controllers.util.upload)

  // 外部调用api
  router.post('/article/:field', home.articleLike.add)
  router.get('/article/:field', home.articleLike.get)
  router.get('/article', home.articleLike.get)

  // 外部调用评论
  router.post('/comment', home.webComment.create)
  router.get('/comment', home.webComment.fetch)

  app.use(router.routes())
    .use(router.allowedMethods())
}
