const jwt = require('jsonwebtoken')
import { ajaxReturn } from '../util'
import config from '../config'
import jwtDecode from 'jwt-decode'

import { fetchUser, updateUser } from '../models/users'

// 检查token是否过期
module.exports = async (ctx, next) => {
  // let notCheckToken = config.notCheckToken
  // for(let i=0,l=notCheckToken.length; i < l; i++){
  //     if(ctx.request.url == notCheckToken[i]) {
  //       await next();
  //     }
  // }
  if (!/^\/api/.test(ctx.url)) {
    await next()
  }

  const authorization = ctx.get('Authorization')
  if (!authorization || authorization === '') {
    ctx.throw(401, JSON.stringify(ajaxReturn(401, 'no token detected in http header Authorization', '验证不通过')))
  }

  const token = authorization.split(' ')[ 1 ]
  console.log(token)
  let nowDate = Date.parse(new Date()) / 1000 // 当前时间戳

  let jwt_object = jwtDecode(token)
  let userResult = await fetchUser({ username: jwt_object.user_id })
  let userTokenAt = userResult.token_at
  if (nowDate - userTokenAt > 7200) {
    ctx.throw(401, JSON.stringify(ajaxReturn(401, 'token error', '验证不通过')))
  } else {
    updateUser({ token_at: nowDate }, { fields: [ 'token_at' ], where: { username: jwt_object.user_id } })
  }
  let tokenContent
  try {
    tokenContent = await jwt.verify(token, 'sinner77') // 如果token过期或验证失败，将抛出错误
  } catch (err) {
    console.log(err)
    ctx.throw(401, JSON.stringify(ajaxReturn(401, 'token error', '验证不通过')))
  }
  await next()
}
