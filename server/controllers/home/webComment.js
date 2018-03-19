/**
 * websites controller
 */
import {exportError} from '../../utils/validate'
import {ajax, random} from '../../utils'
import modelHelper from '../../modelsHelper/modelHelper'
const mongoose = require('mongoose')
const WebComment = mongoose.model('WebComment')
const helper = new modelHelper(WebComment)
/**
 * 返回评论树
 * @param {[type]} data      [description]
 * @param {Number} [pid=0]   [description]
 * @param {Number} [level=1] [description]
 */
let setCommentTree = (data, pid, level) => {
  let result = []
  let _data = JSON.parse(JSON.stringify(data))
  for (var i = 0; i < _data.length; i++) {
    let _d = _data[i]
    let tmp = {}
    if(_d.pid  == pid) {
      _d.level = level
      _d.child = setCommentTree(data, _d.id, level + 1)
      tmp = _d
      result.push(tmp)
    }
  }
  return result
}
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

  /**
   * 获取评论
   * @param  {[type]} ctx [description]
   * @return {[type]}     [description]
   */
  async fetch (ctx) {
    let url = ctx.query.url

    let result = await helper.findByWhere({url: decodeURIComponent(url)}, null, false, {id: -1})
    console.log(result);
    if(result) {
      let data = setCommentTree(result, 0, 1)
      ctx.body = ajax(2000, '查询成功', data)
    }else{
      ctx.body = ajax(4000, '查询失败')
    }
  }
}

module.exports = () => {
  return new webComment()
}
