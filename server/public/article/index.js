
/**
 * 文章操作类
 */
class articleUitl {
  constructor () {
    this.url = 'http://127.0.0.1:3000/api'
  }

  /**
   * 增加文章点赞或者访问量
   */
  add (field, callback) {
    fly.post(this.url + '/article/' + field, {
      title: '测试文章',
      url: 'http://blog.zukmb.cn'
    }).then((res) => {
      callback && callback(res.data)
    }).catch(e => {
      callback && callback(e)
    })
  }

  /**
   * 获取文章点赞数
   * @return {[type]} [description]
   */
  get (field, callback) {
    fly.get(this.url + '/article/' + field, {
      url: 'http://blog.zukmb.cn'
    }).then((res) => {
      callback && callback(res.data)
    }).catch(e => {
      callback && callback(e)
    })
  }

  /**
   * 增加评论
   */
  addComment (data, callback) {
    fly.post(this.url + '/comment', data).then((res) => {
      callback && callback(res.data)
    }).catch(e => {
      callback && callback(e)
    })
  }

  /**
   * 获取文章评论
   * @return {[type]} [description]
   */
  getComment () {}
}
