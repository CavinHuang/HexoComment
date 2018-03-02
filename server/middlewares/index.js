const path = require('path')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
const cors = require('koa-cors')
const helmet = require('koa-helmet')
const jwt = require('koa-jwt')
const routerRule = require('./router-rule')
const logger = require('./logger')
const miSend = require('./send')
import {secret} from '../config'
import errorHandel from './error'
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
    path: [/\/login/, /register/]
  }))

  app.use(helmet())
  app.use(cors())
  app.use(bodyParser())
  app.use(miSend())
  logger(app)
  app.use(require('./check-token'))
}
