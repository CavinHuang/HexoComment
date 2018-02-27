/**
 * 用户管理
 */
const xss = require('xss');
const mongoose = require('mongoose');
const uuid = require('uuid');
const User = mongoose.model('User');
const UserHelper = require('../../modelsHelper/user');
const util = require('../../utils');
const bcrypt = require('bcrypt');
const Hashids = require('hashids');
const hashids = new Hashids('sujinw@qq.com', 8);
class user {
  constructor() {

  }
  /**
   * 更新用户信息
   * @return {[type]} [description]
   */
  async update(ctx, next){
    let data = ctx.request.body

    let where = ctx.params

    let res = await UserHelper.updateUser(where, data)

    if(res) ctx.body = util.ajax(2000, '更新成功')
    else ctx.body = util.ajax(4000, '更新失败')
  }

  /**
   * 删除用户
   * @return {[type]} [description]
   */
  async delete(ctx, next){
    let res = await UserHelper.deleteUser({email: 'sujinw@qq.com'})

    if(res) ctx.body = util.ajax(2000, '删除成功')
    else ctx.body = util.ajax(4000, '删除失败')
  }

  /**
   * 获取用户信息
   * @return {[type]} [description]
   */
  async fetch(ctx, next){
    let userInfo = {}
    if(ctx.params.hasOwnProperty('id')) {
      // 单个人
      userInfo = await UserHelper.findByWhere({id: ctx.params.id})
    }else {
      // 所有人
      userInfo = await UserHelper.findAllUsers()
    }

    ctx.body = util.ajax(2000, '查询成功', userInfo)
  }
}

module.exports = () => {
	return new user()
};
