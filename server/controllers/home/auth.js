/**
 * 认证
 */
// const UserHelper = require('../../modelsHelper/user');
import {findByWhere} from '../../modelsHelper/user'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import {ajax} from '../../utils'
import {secret} from '../../config'
class auth {
  constructor() {

  }
  /**
   * 获取token
   * @return {Promise} [description]
   */
  async getToken (ctx, next) {
    let {body} = ctx.request
    let {username, password} = body

    if(!username || username == '' || !password || password == '') {
      ctx.body = ajax(4000, 'username or password not empty but get '+body)
    }

    const user = await findByWhere({ phoneNumber: username });
    if (!user || user.length == 0) {
      ctx.status = 401
      ctx.body = ajax(4000, '用户名错误')
      return;
    }
    // 匹配密码是否相等
    if (await bcrypt.compare(password, user[0].password)) {
      let token = jsonwebtoken.sign({
        data: user,
        // 设置 token 过期时间
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
      }, secret)
      ctx.status = 200
      ctx.body = ajax(2000, '登录成功', {
        user: user,
        // 生成 token 返回给客户端
        token: token})
    } else {
      ctx.status = 401
      ctx.body = ajax(4000, '密码错误')
    }
  }

  async refreshToken() {}
}
module.exports = () => {
	return new auth()
};
