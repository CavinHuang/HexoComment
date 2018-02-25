/**
 * 用户管理
 */
const xss = require('xss');
const mongoose = require('mongoose');
const uuid = require('uuid');
const User = mongoose.model('User');
const UserHelper = require('../../modelsHelper/user');
const util = require('../../utils');
const md5 = require('md5');
class user {
  constructor() {

  }

  /**
   * 注册新用户
   * @return {[type]} [description]
   */
  async add (ctx, next) {
    let {phone, email, password, password_confirm, nickname, avatar} = ctx.request.body
    if(!phone || phone == '' || !email || email == '' || !password || password == '') {
      ctx.body = util.ajax(4000, 'params not empty')
      return;
    }

    if(password != password_confirm) {
      ctx.body = util.ajax(4000, '两次密码不一致');
      return;
    }

    let userRes = await UserHelper.findByPhoneNumber({phoneNumber: phone})

    console.log(userRes);

    if(userRes) {
      ctx.body = util.ajax(4000, '电话号码已经存在！')
      return;
    }

    let userData = new User({
      nickname: nickname ? nickname : '',
      avatar: avatar ? avatar : 'https://avatars3.githubusercontent.com/u/24950299?s=40&v=4',
      phoneNumber: md5('sujinw'+md5(xss(phone))),
      accessToken: uuid.v4(),
      verified: true,
      email: email,
      password: password
    })

    let result = await UserHelper.addUser(userData)

    if(result) {
      ctx.body = util.ajax(2000, 'success', result)
      return;
    }else{
      ctx.body = util.ajax(4000, '添加失败');
      return;
    }

  }

  /**
   * 更新用户信息
   * @return {[type]} [description]
   */
  update(){}

  /**
   * 删除用户
   * @return {[type]} [description]
   */
  delete(){}

  /**
   * 获取用户信息
   * @return {[type]} [description]
   */
  async fetch(ctx, next){
    console.log(ctx.params);

  }
}

module.exports = () => {
	return new user()
};
