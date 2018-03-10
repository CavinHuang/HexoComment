/**
 * websites controller
 */
import {exportError} from '../../utils/validate'
import {ajax, random} from '../../utils'
import modelHelper from '../../modelsHelper/modelHelper'
const mongoose = require('mongoose')
const WebComment = mongoose.model('WebComment')
const helper = new modelHelper(WebComment)
class webComment {
  constructor () { }

  async create (ctx) {
    ctx.checkBody('content').notEmpty('提交的内容为空')
    ctx.checkBody('url').notEmpty('网址不能为空')

    if (ctx.errors) {
      ctx.body = ajax(4000, exportError(ctx.errors))
      return true
    }

    // 设置默认值
    let data = ctx.request.body

    if (!data.nickname || data.nickname == '') {
      data['nickname'] = '游客' + random(random(1, 1000), random(1000, 10000))
    }
    if (!data.avatar || data.avatar == '') {
      data['avatar'] = 'http://127.0.0.1:3000/upload/avatar.jpg'
    }

    let commentData = new WebComment(data)

    let result = await helper.create(commentData)

    if (result) {
      ctx.body = ajax(2000, '评论成功', result)
    } else {
      ctx.body = ajax(4000, '评论失败')
    }
  }

  fetch (ctx) {}
}

module.exports = () => {
  return new webComment()
}
