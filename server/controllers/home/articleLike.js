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
  constructor() {

  }

  /**
   * 实现点赞功能
   * @param  {[type]}  ctx [description]
   * @return {Promise}     [description]
   */
  async addLike (ctx) {

    ctx.checkBody('title').notEmpty('不能没有标题'),
    ctx.checkBody('url').notEmpty('不能没有地址')
    if (ctx.errors) {
      ctx.body = ajax(4000, exportError(ctx.errors))
      return true
    }
    let {title, url} = ctx.request.body

    let result = await helper.findByWhere({url: url}, null, true)

    let res
    if (result) {
      // 更新
      res = helper.update({url: url}, {like: result.like + 1})
    }else{
      // 添加
      let articleData = new ArticleLikeModel({
        title: title,
        url: url,
        like: 1
      })
      res = helper.create(articleData)
    }

    console.log(res);
    if(res) ctx.body = ajax(2000, '操作成功')
    else ctx.body = ajax(4000, '操作失败')
  }

  /**
   * 实现阅读量统计
   * @param  {[type]}  ctx [description]
   * @return {Promise}     [description]
   */
  async viewCount (ctx) {}


}

module.exports = () => {
  return new ArticleLike()
}
