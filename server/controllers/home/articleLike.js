/**
 * 文章点赞访问量统计类
 */

class ArticleLike {
  constructor() {

  }

  /**
   * 实现点赞功能
   * @param  {[type]}  ctx [description]
   * @return {Promise}     [description]
   */
  async like (ctx) {}

  /**
   * 实现阅读量统计
   * @param  {[type]}  ctx [description]
   * @return {Promise}     [description]
   */
  async viewCount (ctx) {}

  
}

module.exports = () => {
  return new ArticleLike()
}
