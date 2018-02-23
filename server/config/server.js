/**
 * 服务配置
 * @type {[type]}
 */
var path = require( 'path' );

var version = require( '../package.json' )
	.version;
var root = path.dirname( __dirname );

var config = {
	env: process.env.NODE_ENV || 'production',
	version: version,
	port: 3000,
	bindingHost: '127.0.0.1',
	debug: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test',
	logdir: path.join( root, 'logs' ),
	staticDir: path.join( root, 'static' ),
	viewDir: path.join( root, 'view' ),
	enableCompress: false
};

module.exports = config;