
/**
 * 评论组件
 */
class comment {
  constructor(options) {
    var defaults = {}
    this.options = extend({}, defaults, options)

    this.warrp = this.options.warrp instanceof Object ? this.options.warrp : getEle(this.options.warrp)[0]
    this.commentList = this.options.data
    this.listWarrp = this.createListWarrp()

    this.init();
  }
  /**
   * 初始化
   * @return {[type]} [description]
   */
  init () {
    this.warrp.appendChild(parseDom(this.createTextarea())[0])

    this.addCommentToList()
  }

  /**
   * 创建列表包裹元素
   * @return {[type]} [description]
   */
  createListWarrp () {
    if(this.listWarrp) return

    let div = document.createElement('div')
    div.className = 'comment-show'

    return div
  }
  /**
   * 创建输入框
   * @return {[type]} [description]
   */
  createTextarea () {
    var htmlStr = `<div class="reviewArea clearfix">
        <textarea class="content comment-input" placeholder="Please enter a comment&hellip;"></textarea>
        <a href="javascript:;" class="plBtn">评论</a>
      </div>`

    return htmlStr
  }

  /**
   * 创建评论Item
   * @return {[type]} [description]
   */
  createItem (item) {
    let childs = item.child || []
    let subHtmlStr = ''
    for (var i = 0; i < childs.length; i++) {
      var _d = childs[i]
      subHtmlStr += this.createSubItem(_d, item)
    }


    var htmlStr = `<div class="comment-show-con clearfix">
        <div class="comment-show-con-img pull-left"><img src="images/header-img-comment_03.png" alt=""></div>
        <div class="comment-show-con-list pull-left clearfix">
            <div class="pl-text clearfix">
                <a href="#" class="comment-size-name">${item.nickname} : </a>
                <span class="my-pl-con">&nbsp;${item.content}</span>
            </div>
            <div class="date-dz">
                <span class="date-dz-left pull-left comment-time">${getNowDateFormat(new Date(item.meta.createAt))}</span>
                <div class="date-dz-right pull-right comment-pl-block">
                    <a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left">回复(${item.replyCount})</a>
                    <span class="pull-left date-dz-line">|</span>
                    <a href="javascript:;" class="date-dz-z pull-left"><i class="date-dz-z-click-red"></i>赞 (<i class="z-num">${item.like}</i>)</a>
                </div>
            </div>
            <div class="hf-list-con">
              ${subHtmlStr}
            </div>
        </div>
    </div>`

    return htmlStr
  }

  /**
   * 添加Itme到列表中
   */
  addCommentToList () {
    let htmlStr = ''
    let listData = this.commentList || []
    if(listData.length > 0) {
      for (var i = 0; i < listData.length; i++) {
        var _d = listData[i]
        htmlStr += this.createItem(_d)
      }
    } else {
      htmlStr = '<div>暂时还没有评论！</div>'
    }
    let doms = parseDom(htmlStr)

    for (var i = 0; i < doms.length; i++) {
      let _d = doms[i]
      this.listWarrp.appendChild(_d)
    }
    this.warrp.appendChild(this.listWarrp)
  }

  /**
   * 创建回复时的输入框
   * @return {[type]} [description]
   */
  createSubCommentInp (subItem) {

  }

  /**
   * 创建回复的Item
   * @return {[type]} [description]
   */
  createSubItem (subItem, item) {
    var htmlStr = `<div class="all-pl-con">
    <div class="pl-text hfpl-text clearfix">
      <a href="#" class="comment-size-name">${subItem.nickname} : </a>
      <span class="my-pl-con">回复
        <a href="#" class="atName">@${item.nickname} </a> :  ${subItem.content}
      </span>
    </div>
    <div class="date-dz">
      <span class="date-dz-left pull-left comment-time">${getNowDateFormat(new Date(subItem.meta.createAt))}</span>
      <div class="date-dz-right pull-right comment-pl-block">
        <a href="javascript:;" class="date-dz-pl pl-hf pull-left hf-con-block">回复(${subItem.replyCount})</a>
        <span class="pull-left date-dz-line">|</span>
        <a href="javascript:;" class="date-dz-z pull-left"><i class="date-dz-z-click-red"></i>赞 (<i class="z-num">${subItem.like}</i>)</a>
      </div>
      </div>
    </div>`

    return htmlStr
  }

  bindSubmit(callback){
    let btns = getEle('.plBtn', [this.warrp])
    let replayData = {}
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function (e) {
        replayData.content = this.previousElementSibling.value
        callback&&callback(replayData)
      }, false)
    }
  }

}
