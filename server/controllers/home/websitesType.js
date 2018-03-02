/**
 * websitesType controller
 */
const mongoose = require('mongoose')
const WebsitesType = mongoose.model('WebsitesType')
import {exportError} from '../../utils/validate'
import {ajax} from '../../utils'
import modelHelper from '../../modelsHelper/modelHelper'
const helper = new modelHelper(WebsitesType)
class websitesType {
  constructor () {

  }
  /**
   * add website type
   * @param  {[type]}   ctx  [description]
   * @param  {Function} next [description]
   * @return {Promise}       [description]
   */
  async add (ctx, next) {
    ctx.checkBody('name').notEmpty('名字不能为空')

    if (ctx.errors) {
      ctx.body = ajax(4000, exportError(ctx.errors))
      return true
    }
    let {name, description} = ctx.request.body
    let result = await helper.findByWhere({name: name}, null, true)

    if (result) {
      ctx.body = ajax(4000, '分类已经存在')
      return true
    }

    let websitesTypeData = new WebsitesType({
      name: name,
      description: description || ''
    })
    let res = await helper.create(websitesTypeData)

    if (res) {
      ctx.body = ajax(2000, '添加成功', res)
    } else {
      ctx.body = ajax(4000, '添加失败')
    }
  }

  /**
   * update website type
   * @param  {[type]}   ctx  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  update (ctx, next) {
    let data = ctx.request.body
  }

  fetch (ctx, next) {}

  delete (ctx, next) {}
}

module.exports = () => {
  return new websitesType()
}
