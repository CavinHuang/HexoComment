/**
 * website model 操作助手函数
 */

import mongoose from 'mongoose'

const Websites = mongoose.model('Websites')

/**
 * 根据条件查询结果
 * @param  {[type]}  where         [description]
 * @param  {[type]}  field         [description]
 * @param  {Boolean} [isOne=false] [description]
 * @return {[type]}                [description]
 */
export const findByWhere = (where, field, isOne = false) => {
  if (isOne) {
    return new Promise((resolve, reject) => {
      Websites.findOne(where, field, (err, user) => {
        if (err) reject(err)
        else resolve(user)
      })
    })
  } else {
    let query = Websites.find()
    return new Promise((resolve, reject) => {
      query.exec((err, users) => {
        if (err) reject(err)
        else resolve(users)
      })
    })
  }
}

/**
 * 增加
 * @param {[type]} website [description]
 */
export const add = async (website) => {
  website = await website.save()
  return user
}

/**
 * 更新website
 * @param  {Object}  condition [条件]
 * @param  {[type]}  data      [更新的数据]
 * @return {Promise}           [description]
 */
exports.updateUser = async (condition, data) => {
  return new Promise((resolve, reject) => {
    Websites.update(condition, data, (err) => {
      if (err) reject(err)
      else resolve(true)
    })
  })
}

/**
 * 删除用户
 * @param  {[type]} options.phoneNumber [description]
 * @return {[type]}                     [description]
 */
exports.deleteUser = async (where) => {
  var flag = false
  console.log('flag==========>' + flag)
  return new Promise((resolve, reject) => {
    Websites.remove(where, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}
