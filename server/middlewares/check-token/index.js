const jwt = require('jsonwebtoken')
import { ajax } from '../../utils'
import {notCheckToken, secret} from '../../config'
import jwtDecode from 'jwt-decode'
import { updateUser } from '../../modelsHelper/user'
const mongoose = require('mongoose')

// 检查token是否过期,保证一直使用，一直刷新不会过期
module.exports = async (ctx, next) => {
  console.log(ctx.request.url)
  for (let i = 0, l = notCheckToken.length; i < l; i++) {
    if (ctx.request.url == notCheckToken[i]) {
      await next()
      return
    }
  }
  if (!/^\/api/.test(ctx.url)) {
    await next()
  }

  const authorization = ctx.get('Authorization')
  if (!authorization || authorization === '') {
    ctx.throw(401, JSON.stringify(ajaxReturn(401, 'no token detected in http header Authorization', '验证不通过')))
  }

  const token = authorization.split(' ')[ 1 ]
  let nowDate = Date.parse(new Date()) / 1000 // 当前时间戳

  let jwt_object = jwtDecode(token)
  let userResult = jwt_object
  let userTokenAt = userResult.data.meta.tokenAt
  if (nowDate - userTokenAt > 7200) {
    ctx.throw(401, JSON.stringify(ajax(401, 'token error', '验证不通过')))
  } else {
    let meta = userResult.data.meta
    meta['tokenAt'] = Date.now()
    updateUser({phoneNumber: userResult.data.phoneNumber}, {
      meta: meta
    })
  }
  let tokenContent
  try {
    tokenContent = await jwt.verify(token, secret) // 如果token过期或验证失败，将抛出错误
  } catch (err) {
    ctx.throw(401, JSON.stringify(ajax(401, 'token error', '验证不通过')))
  }
  await next()
}
