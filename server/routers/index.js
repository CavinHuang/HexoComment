/**
 * router middleware
 * @type {[type]}
 */
const router = require( 'koa-router' )()

module.exports = ( app ) => {
	let home = app.controllers.home
	router.get( '/a', home.index.index )

	// 用户相关
	router.post('/user', home.user.add)
	router.delete('/user', home.user.delete)
	router.put('/user/:id', home.user.update)
	router.get('/user/:id', home.user.fetch)
	router.get('/user', home.user.fetch)

	// auth token
	router.post('/gettoken', home.auth.getToken)
	//router.get('/refreshToken', home.auth.refreshToken)

	app.use( router.routes() )
		.use( router.allowedMethods() )
}
