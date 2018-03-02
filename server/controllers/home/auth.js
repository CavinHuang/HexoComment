/**
 * 认证
 */
// const UserHelper = require('../../modelsHelper/user');
import { findByWhere, addUser, updateUser } from '../../modelsHelper/user'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { ajax } from '../../utils'
import { secret } from '../../config'
import xss from 'xss'
import User from '../../models/user'
const Hashids = require('hashids')
const hashids = new Hashids('sujinw@qq.com', 8)
const uuid = require('uuid')

class auth {
  constructor () {

  }
  /**
	 * 获取token
	 * @return {Promise} [description]
	 */
  async login (ctx, next) {
    let { body } = ctx.request
    let { username, password } = body
    if (!username || username == '' || !password || password == '') {
      ctx.body = ajax(4000, 'username or password not empty but get ' + body)
    }

    const user = await findByWhere({ phoneNumber: username })
    console.log(user)
    if (!user || user.length == 0) {
      ctx.status = 401
      ctx.body = ajax(4000, '用户名错误')
      return
    }
    // 匹配密码是否相等
    if (await bcrypt.compare(password, user[ 0 ].password)) {
      let expireTime = Math.floor(Date.now() / 1000) + (60 * 60)
      let userInfo = user[0]
      let meta = userInfo.meta
      meta['tokenAt'] = Date.now()
      await updateUser({phoneNumber: username}, {
        meta: meta
      })
      let token = jsonwebtoken.sign({
        data: userInfo,
        // 设置 token 过期时间
        exp: expireTime // 60 seconds * 60 minutes = 1 hour
      }, secret)
      userInfo['lifeTime'] = expireTime
      ctx.status = 200
      ctx.body = ajax(2000, '登录成功', {
        user: userInfo,
        // 生成 token 返回给客户端
        token: token,
        lifeTime: expireTime
      })
    } else {
      ctx.status = 401
      ctx.body = ajax(4000, '密码错误')
    }
  }

  /**
	 * 注册
	 * @param  {[type]}   ctx  [description]
	 * @param  {Function} next [description]
	 * @return {Promise}       [description]
	 */
  async register (ctx, next) {
    let { phone, email, password, password_confirm, nickname, avatar } = ctx.request.body
    if (!phone || phone == '' || !email || email == '' || !password || password == '') {
      ctx.body = ajax(4000, 'params not empty')
      return
    }

    if (password != password_confirm) {
      ctx.body = ajax(4000, '两次密码不一致')
      return
    }
    let userRes = await findByWhere({ phoneNumber: xss(phone) })

    if (userRes && userRes.length > 0) {
      ctx.body = ajax(4000, '电话号码已经存在！')
      return
    }
    password = await bcrypt.hash(xss(password), 5)
    let userData = new User({
      id: hashids.encode(xss(phone)),
      nickname: nickname ? xss(nickname) : '',
      avatar: avatar ? xss(avatar) : 'https://avatars3.githubusercontent.com/u/24950299?s=40&v=4',
      phoneNumber: xss(phone),
      accessToken: uuid.v4(),
      verified: true,
      email: xss(email),
      password: password
    })

    let result = await addUser(userData)

    if (result) {
      ctx.body = ajax(2000, 'success', result)
    } else {
      ctx.body = ajax(4000, '添加失败')
    }
  }
}
module.exports = () => {
  return new auth()
}
