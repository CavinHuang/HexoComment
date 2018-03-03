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

    })
  }

  /**
   * update website
   * @param  {[context]}   ctx  [koa context]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  update (ctx, next) {}

  /**
   * fetch website
   * @param  {[context]}   ctx  [koa context]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  fetch (ctx, next) {}

  /**
   * delete website
   * @param  {[context]}   ctx  [koa context]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  delete (ctx, next) {}
}

module.exports = () => {
  return new websites()
}
