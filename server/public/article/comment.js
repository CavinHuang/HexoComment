/**
 * 评论组件
 */
class comment {
	/**
	 * 构造函数
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	constructor( options ) {
		var defaults = {}
		this.options = extend( {}, defaults, options )

		this.warrp = this.options.warrp instanceof Object ? this.options.warrp : getEle( this.options.warrp )[ 0 ]
		this.commentList = this.options.data
		this.listWarrp = this.createListWarrp()
		this.ajaxCtrl = this.options.ajaxCtrl
		this.init();
	}
	/**
	 * 初始化
	 * @return {[type]} [description]
	 */
	init() {
		this.warrp.appendChild( parseDom( this.createTextarea() )[ 0 ] )
		this.addCommentToList()
		this.bindReply()
		this.bindSubSubmit()
	}

	/**
	 * 追加元素到列表
	 * @return {[type]} [description]
	 */
	preppendItem( item ) {
		var htmlStr = this.createItem( item )
		var itemEle = parseDom( htmlStr )[ 0 ]

		this.listWarrp.insertBefore( itemEle, this.listWarrp.children[ 0 ] );
		this.bindReply()
	}

	/**
	 * 创建列表包裹元素
	 * @return {[type]} [description]
	 */
	createListWarrp() {
		if ( this.listWarrp ) return

		let div = document.createElement( 'div' )
		div.className = 'comment-show'

		return div
	}
	/**
	 * 创建输入框
	 * @return {[type]} [description]
	 */
	createTextarea() {
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
	createItem( item ) {
		let childs = item.child || []
		let subHtmlStr = ''
		for ( var i = 0; i < childs.length; i++ ) {
			var _d = childs[ i ]
			subHtmlStr += this.createSubItem( _d, item )
		}
		//subHtmlStr += this.createSubItem(item.child, item)

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
                    <a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left" data-replay="true" data-id="${item.id}">回复(${item.replyCount})</a>
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
	addCommentToList() {
		let htmlStr = '',
			doms = []
		let listData = this.commentList || []
		if ( listData.length > 0 ) {
			for ( var i = 0; i < listData.length; i++ ) {
				var _d = listData[ i ]
				htmlStr = this.createItem( _d )
				doms.push( parseDom( htmlStr )[ 0 ] )
			}
		} else {
			htmlStr = '<div>暂时还没有评论！</div>'
			doms.push( parseDom( htmlStr )[ 0 ] )
		}
		for ( var i = 0; i < doms.length; i++ ) {
			let _d = doms[ i ]
			this.listWarrp.appendChild( _d )
		}
		this.warrp.appendChild( this.listWarrp )
	}

	/**
	 * 创建回复时的输入框
	 * @return {[type]} [description]
	 */
	createSubCommentInp( str, pid ) {
		var fhHtml = `<div class="hf-con pull-left">
      <textarea class="content comment-input hf-input" placeholder="">${str}</textarea>
      <a href="javascript:;" class="hf-pl" data-pid="${pid}">评论</a>
    </div>`;

		return fhHtml

	}

	/**
	 * 创建回复的Item
	 * @return {[type]} [description]
	 */
	createSubItem( subItem, item ) {
		var subHtmlStr = this.createSubItemChild( subItem, item )
		var html = subHtmlStr
		return html
	}

	/**
	 * 递归创建
	 * @param  {[type]} item [description]
	 * @return {[type]}      [description]
	 */
	createSubItemChild( subItem, item, isSub = false ) {
		let subHtmlStr = ''
		let childs = subItem.child || []
		if ( !isSub ) subHtmlStr += this.createSubItemHtmlStr( subItem, item )
		for ( var i = 0; i < childs.length; i++ ) {
			var _d = childs[ i ]
			subHtmlStr += this.createSubItemHtmlStr( _d, subItem )
			if ( _d.child.length > 0 ) {
				subHtmlStr += this.createSubItemChild( _d, subItem, true )
			}
		}
		return subHtmlStr
	}

	/**
	 * 创建回复Itme html string
	 * @param  {[type]} subItem [description]
	 * @param  {[type]} item    [description]
	 * @return {[type]}         [description]
	 */
	createSubItemHtmlStr( subItem, item ) {
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
        <a href="javascript:;" class="date-dz-pl pl-hf pull-left hf-con-block" data-replay="true" data-id="${subItem.id}">回复(${subItem.replyCount})</a>
        <span class="pull-left date-dz-line">|</span>
        <a href="javascript:;" class="date-dz-z pull-left"><i class="date-dz-z-click-red"></i>赞 (<i class="z-num">${subItem.like}</i>)</a>
      </div>
      </div>
    </div>`
		return htmlStr
	}

	/**
	 * 执行提交
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	bindSubmit( callback ) {
		let btns = getEle( '.plBtn', [ this.warrp ] )
		let replayData = {}
		for ( var i = 0; i < btns.length; i++ ) {
			btns[ i ].addEventListener( 'click', function ( e ) {
				console.log( '============' );
				replayData.content = this.previousElementSibling.value
				callback && callback( replayData )
				e.preventDefault();
				e.cancelBubble = true
			}, false )
		}
	}

	/**
	 * 回复提交绑定
	 * @return {[type]} [description]
	 */
	bindSubSubmit() {
		let data = {}
		let _this = this
		this.listWarrp.addEventListener( 'click', function ( e ) {
			var target = e.target
			console.log( target );
			console.log( e );
			console.log( hasClass( target, 'hf-pl' ) );
			if ( hasClass( target, 'hf-pl' ) ) {
				data.content = target.previousElementSibling.value
				data.pid = target.getAttribute( 'data-pid' )
				data.url = window.location.href
				// callback  提交当前内容到api
				_this.ajaxCtrl.addComment( data ).then( res => {
					if ( res.code == 2000 ) {
						_this.subSubmitCallback( res.data, target )
					}
				} )
				e.cancelBubble = true;
				e.preventDefault()
				return false
			} else if ( hasClass( target, 'pl-hf' ) && target.getAttribute( 'data-replay' ) ) {
				let data = {}
				if ( hasClass( target, 'hf-con-block' ) ) {
					let nicknameEle = getEle( '.comment-size-name', [ target.parentNode.parentNode.previousElementSibling ] )[ 0 ]
					data.nickname = nicknameEle.innerText
					var fhN = '回复@' + data.nickname;
					var pid = target.getAttribute( 'data-id' )
					let textareaHtml = parseDom( _this.createSubCommentInp( fhN, pid ) )[ 0 ]
					target.parentNode.parentNode.appendChild( textareaHtml )
					removeClass( target, 'hf-con-block' )
					e.cancelBubble = true;
					e.preventDefault()
					return false
				} else {
					target.parentNode.parentNode.removeChild( target.parentNode.nextElementSibling )
					addClass( target, 'hf-con-block' )
					e.cancelBubble = true;
					e.preventDefault()
					return false
				}
				return false;
			}
		}, false )
	}

	// 回调
	subSubmitCallback( subItem, target ) {
		let toNickname = getEle( '.comment-size-name', [ target.parentNode.parentNode.previousElementSibling ] )[ 0 ].innerText
		let htmlStr = this.createSubItemHtmlStr( subItem, { 'nickname': toNickname } )

		let htmlObj = parseDom( htmlStr )[ 0 ]

		let beforNode = target.parentNode.parentNode.parentNode
		insertAfter( htmlObj, beforNode )
		target.parentNode.parentNode.removeChild( target.parentNode )
	}

	/**
	 * 绑定回复按钮
	 * @return {[type]} [description]
	 */
	bindReply() {
		let replyBtns = getEle( '.pl-hf', [ this.listWarrp ] )
		let data = {}
		let _this = this
		for ( var i = 0; i < replyBtns.length; i++ ) {
			replyBtns[ i ].addEventListener( 'click', function () {
				if ( hasClass( this, 'hf-con-block' ) ) {
					let nicknameEle = getEle( '.comment-size-name', [ this.parentNode.parentNode.previousElementSibling ] )[ 0 ]
					data.nickname = nicknameEle.innerText
					var fhN = '回复@' + data.nickname;
					var pid = this.getAttribute( 'data-id' )
					let textareaHtml = parseDom( _this.createSubCommentInp( fhN, pid ) )[ 0 ]
					this.parentNode.parentNode.appendChild( textareaHtml )
					removeClass( this, 'hf-con-block' )
				} else {
					this.parentNode.parentNode.removeChild( this.parentNode.nextElementSibling )
					addClass( this, 'hf-con-block' )
				}
			}, false )
		}
	}
}
