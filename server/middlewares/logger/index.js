const onerror = require( 'koa-onerror' );
const Logger = require( './egglogger.js' );
const config = require( '../../config/server.js' );
const koaLogger = require( 'koa-logger' )

module.exports = function ( app ) {

	// 重写koa默认的 app.context.onerror 函数，重写后功能稍微强大点
	onerror( app );

	// 向全局注册logger方法
	Logger();

	// 集中错误日志处理
	app.on( 'error', function ( err, ctx ) {
		logger.error( err );
	} );

	// koa log
	app.use( koaLogger() )
};