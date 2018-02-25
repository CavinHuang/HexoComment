'use strict'

var mongoose =  require('mongoose')
var User = mongoose.model('User')

/**
 * 通过电话号码查询
 * @param  {[type]} options.phoneNumber [description]
 * @return {[type]}                     [description]
 */
exports.findByWhere = async (where, field) => {
	var query = User.find(where, field)
	return new Promise((resolve, reject) => {
		query.exec((err, user) => {
			if(err) {
				reject(err)
			}else {
				resolve(user)
			}
		})
	})

	// console.log('res====>' + res)
	// return res;
}

/**
 * 查找所用用户
 * @return {[type]} [description]
 */
exports.findAllUsers = async () => {
	var query = User.find({});
	var res = []
	return new Promise((resolve, reject) => {
		query.exec(function(err, users) {
			if(err) {
				reject(err)
			}else {
				resolve(users)
			}
		})
	})
}

/**
 * 增加用户
 * @param  {[User]} user [mongoose.model('User')]
 * @return {[type]}      [description]
 */
exports.addUser = async (user) => {
	user = await user.save()
	return user
}

/**
 * 更新用户
 * @param  {Object}  condition [条件]
 * @param  {[type]}  data      [更新的数据]
 * @return {Promise}           [description]
 */
exports.updateUser = async (condition, data) => {
	return new Promise((resolve, reject) => {
		User.update(condition, data, (err) => {
			if(err) reject(err)
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
	console.log('flag==========>'+flag)
	return new Promise((resolve, reject) => {
		User.remove(where, function(err) {
			if(err) {
				reject(err)
			}else{
				resolve(true)
			}
		})
	})
}
