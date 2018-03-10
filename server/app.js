const koa = require('koa')
const serverConf = require('./config/server')
const router = require('./routers')
const middlewares = require('./middlewares')
const mongoose = require('mongoose')
const app = new koa()
const db = 'mongodb://localhost/test'
const path = require('path')
const fs = require('fs')

/**
 * mongoose连接数据库
 * @type {[type]}
 */
mongoose.Promise = require('bluebird')
mongoose.connect(db)

/**
 * 获取数据库表对应的js对象所在的路径
 * @type {[type]}
 */
const models_path = path.join(__dirname, './models')

/**
 * 已递归的形式，读取models文件夹下的js模型文件，并require
 * @param  {[type]} modelPath [description]
 * @return {[type]}           [description]
 */
var walk = async function (modelPath) {
  fs
    .readdirSync(modelPath)
    .forEach(async function (file) {
      var filePath = path.join(modelPath, '/' + file)
      var stat = fs.statSync(filePath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          try {
            require(filePath)
          } catch (e) {
            console.log(e)
          }
        }
      } else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
}
walk(models_path)

// console.log(mongoose.model('WebsitesType'))

// 加载middlewares
middlewares(app)
// 注册router
router(app)

/*
 * 启动server
 */
if (!module.parent) {
  app.listen(serverConf.port)
  logger.info('listening on port %s, the env is %s', serverConf.port, serverConf.env)
  logger.debug('You can debug your app with http://127.0.0.1:%s', serverConf.port)
}
