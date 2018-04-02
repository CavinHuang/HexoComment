/**
 * 文章操作类
 */
//添加请求拦截器

class articleUitl {
	constructor() {
		this.url = 'http://127.0.0.1:3000/api'
		this.fly = new Fly()
		this.fly.interceptors.request.use( ( request ) => {
			request.baseURL = 'http://127.0.0.1:3000/api'
			return request;
		} )

		//添加响应拦截器，响应拦截器会在then/catch处理之前执行
		this.fly.interceptors.response.use(
			( response ) => {
				//只将请求结果的data字段返回
				return response.data
			},
			( err ) => {
				//发生网络错误后会走到这里
				return Promise.resolve( err )
			}
		)
	}

	/**
	 * 增加文章点赞或者访问量
	 */
	add( field ) {
		return this.fly.post( '/article/' + field, {
			title: '测试文章',
			url: 'http://blog.zukmb.cn'
		} )
	}

	/**
	 * 获取文章点赞数
	 * @return {[type]} [description]
	 */
	get( field, callback ) {
		return this.fly.get( '/article/' + field, {
			url: 'http://blog.zukmb.cn'
		} )
	}

	/**
	 * 增加评论
	 */
	addComment( data ) {
		return this.fly.post( '/comment', data )
	}

	/**
	 * 获取文章评论
	 * @return {[type]} [description]
	 */
	getComment( callback ) {
		return this.fly.get( this.url + '/comment', { url: window.location.href } )
	}
}
