const koa = require( 'koa' );
const serverConf = require( './config/server' )
const router = require( './routers' )
const middlewares = require( './middlewares' );

const app = new koa();

// 加载middlewares
middlewares( app )
// 注册router
router( app )

/*
 * 启动server
 */
if ( !module.parent ) {
	app.listen( serverConf.port );
	logger.info( 'listening on port %s, the env is %s', serverConf.port, serverConf.env );
	logger.debug( 'You can debug your app with http://127.0.0.1:%s', serverConf.port );
}