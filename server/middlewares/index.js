const path = require('path')
// const bodyParser = require('koa-bodyparser')
const koabody = require('koa-body')
const nunjucks = require('koa-nunjucks-2')
const cors = require('koa-cors')
const helmet = require('koa-helmet')
const jwt = require('koa-jwt')
const routerRule = require('./router-rule')
const logger = require('./logger')
const miSend = require('./send')
const koaValidate = require('koa-validate')
const staticCache = require('koa-static-cache')
const koaStatic = require('koa-static')
import {secret, upload} from '../config'
import errorHandel from './error'
function serve (prefix, filePath) {
  return staticCache(path.resolve(__dirname, filePath), {
    prefix: prefix,
    gzip: true,
    dynamic: true,
    maxAge: 60 * 60 * 24 * 30
  })
}
module.exports = (app) => {
  app.use(errorHandel)
  routerRule({
    app,
    rules: [
      {
        path: path.join(__dirname, '../controllers'),
        name: 'controllers'
      }
      // {
      // 	path: path.join( __dirname, '../service' ),
      // 	name: 'service'
      // }
    ]
  })

  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'),
    nunjucksConfig: {
      trimBlocks: true
    }
  }))

  app.use(jwt({
    secret
  }).unless({
    path: [/\/api\/login/, /\/api\/register/, /\/upload/]
  }))

  app.use(helmet())
  app.use(serve('/public', './public'))
  app.use(serve('/upload', path.resolve(__dirname, 'config', upload.dir)))
  app.use(cors({credentials: true, maxAge: 2592000}))
  app.use(koaStatic(path.resolve(__dirname, '../public')))
  // app.use(bodyParser())
  app.use(miSend())
  logger(app)
  koaValidate(app)
  app.use(require('./check-token'))
  app.use(koabody({ multipart: true }))
}
