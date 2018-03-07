/**
 * 用户管理
 */
const xss = require('xss')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const UserHelper = require('../../modelsHelper/user')
const util = require('../../utils')
const bcrypt = require('bcrypt')
class user {
  constructor () {

  }
  /**
	 * 更新用户信息
	 * @return {[type]} [description]
	 */
  async update (ctx, next) {
    if (ctx.errors) {
      ctx.body = ajax(4000, exportError(ctx.errors))
      return
    }
    let data = ctx.request.body

    let where = ctx.params

    if (data.password != data.password_confirm) {
      ctx.body = util.ajax(4000, '两次密码不一致')
    }

    if (data.password && data.password != '') {
      data.password = await bcrypt.hash(xss(data.password), 5)
    } else {
      delete data.password
    }

    let res = await UserHelper.updateUser(where, data)

    if (res) ctx.body = util.ajax(2000, '更新成功')
    else ctx.body = util.ajax(4000, '更新失败')
  }

  /**
	 * 删除用户
	 * @return {[type]} [description]
	 */
  async delete (ctx, next) {
    let res = await UserHelper.deleteUser({ email: 'sujinw@qq.com' })

    if (res) ctx.body = util.ajax(2000, '删除成功')
    else ctx.body = util.ajax(4000, '删除失败')
  }

  /**
	 * 获取用户信息
	 * @return {[type]} [description]
	 */
  async fetch (ctx, next) {
    let userInfo = {}
    if (ctx.params.hasOwnProperty('id')) {
      // 单个人
      userInfo = await UserHelper.findByWhere({ id: ctx.params.id })
    } else {
      // 所有人
      userInfo = await UserHelper.findAllUsers()
    }

    ctx.body = util.ajax(2000, '查询成功', userInfo)
  }
}

module.exports = () => {
  return new user()
}
