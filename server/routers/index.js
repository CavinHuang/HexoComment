/**
 * router middleware
 * @type {[type]}
 */
const router = require( 'koa-router' )()

module.exports = ( app ) => {
	router.get( '/', app.controllers.home.index )
	app.use( router.routes() )
		.use( router.allowedMethods() )
}