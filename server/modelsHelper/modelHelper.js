
class modelHelper {
  constructor (model) {
    this.model = model
  }
  /**
   * 根据条件查找
   * @param  {[type]}  where         [description]
   * @param  {[type]}  field         [description]
   * @param  {Boolean} [isOne=false] [description]
   * @return {[type]}                [description]
   */
  findByWhere (where, field, isOne = false) {
    if (isOne) {
      return new Promise((resolve, reject) => {
        this.model.findOne(where, field, (err, user) => {
          if (err) reject(err)
          else resolve(user)
        })
      })
    } else {
      let query = this.model.find({})
      return new Promise((resolve, reject) => {
        query.exec((err, data) => {
          if (err) reject(err)
          else resolve(data)
        })
      })
    }
  }
  /**
   * 增加
   * @param  {[type]} model [description]
   * @return {[type]}       [description]
   */
  async create (model) {
    model = await model.save()
    return model
  }

  /**
   * 更新
   * @param  {[type]}  condition [description]
   * @param  {[type]}  data      [description]
   * @return {Promise}           [description]
   */
  async update (condition, data) {
    return new Promise((resolve, reject) => {
      this.model.update(condition, data, (err) => {
        if (err) reject(err)
        else resolve(true)
      })
    })
  }

  /**
   * 删除
   * @param  {[type]}  where [description]
   * @return {Promise}       [description]
   */
  async delete (where) {
    var flag = false
    console.log('flag==========>' + flag)
    return new Promise((resolve, reject) => {
      this.model.remove(where, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  }
}

export default modelHelper
