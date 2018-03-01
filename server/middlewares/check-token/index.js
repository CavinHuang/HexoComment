const jwt = require('jsonwebtoken')
import { ajax } from '../../utils'
import {notCheckToken} from '../../config'
import jwtDecode from 'jwt-decode'
import { findByWhere, updateUser } from '../../modelsHelper/user'


// 检查token是否过期
module.exports = async (ctx, next) => {
  console.log(ctx.request.url);
  for(let i=0,l=notCheckToken.length; i < l; i++){
      if(ctx.request.url == notCheckToken[i]) {
        await next();
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
  console.log(token)
  let nowDate = Date.parse(new Date()) / 1000 // 当前时间戳

  let jwt_object = jwtDecode(token)
  console.log(jwt_object);
  let userResult = jwt_object
  console.log(userResult.meta);
  let userTokenAt = userResult.data.meta.tokenAt
  if (nowDate - userTokenAt > 7200) {
    ctx.throw(401, JSON.stringify(ajax(401, 'token error', '验证不通过')))
  } else {

  }
  let tokenContent
  try {
    tokenContent = await jwt.verify(token, 'Bearer') // 如果token过期或验证失败，将抛出错误
  } catch (err) {
    console.log(err)
    ctx.throw(401, JSON.stringify(ajax(401, 'token error', '验证不通过')))
  }
  await next()
}
