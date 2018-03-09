
/**
 * 文章操作类
 */
class articleUitl {
  constructor() {
    this.url = "http://127.0.0.1:3000/api"
  }

  /**
   * 增加count
   */
  addCount () {

  }

  /**
   * 获取本文的访问量
   * @return {[type]} [description]
   */
  getCount () {}

  /**
   * 增加文章电赞
   */
  addLike() {
    fly.post(this.url + '/articleLike', {
      title: '测试文章',
      url: 'http://blog.zukmb.cn'
    }).then((res) => {
      console.log(res);
    }).catch(e => {
      console.log(e);
    })
  }

  /**
   * 获取文章点赞数
   * @return {[type]} [description]
   */
  getLike(){}

  /**
   * 增加评论
   */
  addComment() {}

  /**
   * 获取文章评论
   * @return {[type]} [description]
   */
  getComment(){}
}
