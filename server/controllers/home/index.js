/**
 * home 控制器
 */
class home {
	constructor() {

	}
	async index( ctx, next ) {
		ctx.body = {
			code: 200,
			data: {
				title: '/aaa'
			},
			msg: "success"
		}
	}
}

module.exports = () => {
	return new home()
};