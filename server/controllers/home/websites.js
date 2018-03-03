/**
 * websites controller
 */
const mongoose = require('mongoose')
import {exportError} from '../../utils/validate'
import {ajax} from '../../utils'
import {findByWhere} from '../../modelsHelper/website'
const Websites = mongoose.model('Websites')
class websites {
  constructor () {

  }

  /**
   * add website
   * @param {[context]}   ctx  [koa context]
   * @param {Function} next [description]
   */
  async add (ctx, next) {
    ctx.checkBody('title').notEmpty('标题不能为空')
    ctx.checkBody('siteUrl').notEmpty('网址不能为空')
    ctx.checkBody('userId').notEmpty('所属用户不能为空')
    ctx.checkBody('websiteType').notEmpty('没有选择网站类型')
    if (ctx.errors) {
      ctx.body = ajax(4000, exportError(ctx.errors))
      return
    }
    let {title, description, siteUrl, userId, websiteType} = ctx.request.body

    let websiteRes = await findByWhere({siteUrl: siteUrl}, null, true)
    if (websiteRes) {
      ctx.body = ajax(4000, '网站已经存在')
      return
    }

    let websites = new Websites({
      title: title,
      description: description || '',
      siteUrl: siteUrl,
      userId: userId,
      websiteType: websiteType
    })

    let res = helper.create(websites)

    if (res) ctx.body = ajax(2000, '保存成功', res)
    else ctx.body = ajax(4000, '保存失败')
  }

  /**
   * update website
   * @param  {[context]}   ctx  [koa context]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  update (ctx, next) {
    let data = ctx.request.body
    let where = ctx.params

    if (!where) ctx.body = ajax(4000, '没有条件')

    let res = helper.update(where, data)

    if (res) ctx.body = ajax(2000, '更新成功')
    else ctx.body = ajax(4000, '更新失败')
  }

  /**
   * fetch website
   * @param  {[context]}   ctx  [koa context]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  fetch (ctx, next) {
    let id = ctx.params.id

    if (!id) ctx.body = ajax(4000, '缺少条件')

    let res = helper.findByWhere({id: id}, null, true)

    if (res) ctx.body = ajax(2000, '查询成功', res)
    else ctx.body = ajax(4000, '查询失败')
  }

  /**
   * delete website
   * @param  {[context]}   ctx  [koa context]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  delete (ctx, next) {
    let id = ctx.params.id

    if (!id) ctx.body = ajax(4000, '缺少条件')

    let res = helper.delete({id: id})

    if (res) ctx.body = ajax(2000, '删除成功')
    else ctx.body = ajax(4000, '删除失败')
  }
}

module.exports = () => {
  return new websites()
}
