/**
 * 文章点赞访问量统计类
 */
const mongoose = require('mongoose')
const ArticleLikeModel = mongoose.model('ArticleLike')
import {exportError} from '../../utils/validate'
import {ajax} from '../../utils'
import modelHelper from '../../modelsHelper/modelHelper'

const helper = new modelHelper(ArticleLikeModel)
class ArticleLike {
  constructor () {

  }

  /**
   * 实现点赞功能
   * @param  {[type]}  ctx [description]
   * @return {Promise}     [description]
   */
  async add (ctx) {
    ctx.checkBody('title').notEmpty('不能没有标题'),
    ctx.checkBody('url').notEmpty('不能没有地址')
    if (ctx.errors) {
      ctx.body = ajax(4000, exportError(ctx.errors))
      return true
    }
    let {title, url} = ctx.request.body
    let {field} = ctx.params
    let result = await helper.findByWhere({url: url}, null, true)
    let res, data = {}
    if (result) {
      // 更新
      data[field] = result[field] + 1
      res = await helper.update({url: url}, data)
    } else {
      // 添加
      data = {
        title: title,
        url: url
      }
      data[field] = 1
      let articleData = new ArticleLikeModel(data)
      res = await helper.create(articleData)
    }

    if (res) ctx.body = ajax(2000, '操作成功', res)
    else ctx.body = ajax(4000, '操作失败')
  }

  /**
   * 获取文章点赞或者访问量
   * @param  {[type]}  ctx [description]
   * @return {Promise}     [description]
   */
  async get (ctx) {
    ctx.checkQuery('url').notEmpty('查询条件不能为空')
    if (ctx.errors) {
      ctx.body = ajax(4000, exportError(ctx.errors))
      return true
    }
    let url = ctx.query.url
    let {field} = ctx.params

    let result = await helper.findByWhere({url: url}, null, true)

    if (result) {
      let data = {}
      if (field) {
        data[field] = result[field]
      } else {
        data['like'] = result.like
        data['viewCount'] = result.viewCount
      }
      ctx.body = ajax(2000, '查询成功', data)
    } else {
      ctx.body = ajax(4000, '该文章还没有加入统计哦')
    }
  }
}

module.exports = () => {
  return new ArticleLike()
}
