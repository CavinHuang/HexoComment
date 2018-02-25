/**
 * router middleware
 * @type {[type]}
 */
const router = require( 'koa-router' )()

module.exports = ( app ) => {
	let home = app.controllers.home
	console.log(home.user.fetchUser);
	console.log(home.index.index);
	router.get( '/a', home.index.index )

	// 用户相关
	router.post('/user', home.user.add)
	router.delete('/user', home.user.delete)
	router.put('/user', home.user.update)
	router.get('/user/:id', home.user.fetch)

	app.use( router.routes() )
		.use( router.allowedMethods() )
}
