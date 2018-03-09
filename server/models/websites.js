'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Counter = mongoose.model('Counter')
/**
 * 定义一个模式(相当于传统意义的表结构)
 * 每个模式映射mongoDB的一个集合，
 * 它定义（只是定义，不是实现）这个集合里面文档的结构，就是定义这个文档有什么字段，字段类型是什么，字段默认值是什么等。
 * 除了定义结构外，还定义文档的实例方法，静态模型方法，复合索引，中间件等
 * @type {mongoose}
 */
var WebsitesSchema = new Schema({
  title: String,
  id: {
    type: Number,
    default: 0
  },
  description: String,
  siteUrl: {
    type: String,
    unique: true
  },
  userId: String,
  websiteType: Number,
  meta: {
    createAt: {
      type: Date,
      dafault: Date.now()
    },
    updateAt: {
      type: Date,
      dafault: Date.now()
    }
  }
})

// Defines a pre hook for the document.
WebsitesSchema.pre('save', function (next) {
  if (this.isNew) {
    let website = this
    // 自增
    return Counter.incrementCounter('websites', function (err, res) {
      if (err) {
        return next(err)
      }
      website.id = res
      website.meta.createAt = website.meta.updateAt = Date.now()
      next()
    })
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

/**
 * 定义模型User
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数User 数据库中的集合名称, 不存在会创建.
var Websites = mongoose.model('Websites', WebsitesSchema)

module.exports = Websites

/**
 * nodejs中文社区这篇帖子对mongoose的用法总结的不错：https://cnodejs.org/topic/548e54d157fd3ae46b233502
 */
