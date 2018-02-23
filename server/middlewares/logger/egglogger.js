/**
 * Module dependencies.
 */

var utils = require( 'utility' );
var Logger = require( 'egg-logger' )
	.Logger;
var FileTransport = require( 'egg-logger' )
	.FileTransport;
var ConsoleTransport = require( 'egg-logger' )
	.ConsoleTransport;

var config = require( '../../config/server.js' );

var logger = new Logger();

/*
 * 格式化函数
 */
function fileFormatter( meta ) {
	return meta.date + ' ' + meta.level + ' ' + meta.pid + ' ' + meta.message;
}

/*
 * level 高于INFO的log将记录在info.YYYYMMDD.log 文件中
 */
logger.set( 'file.info', new FileTransport( {
	file: 'logs/info.' + utils.YYYYMMDD() + '.log',
	level: 'INFO',
	formatter: fileFormatter,
} ) );

/*
 * level 高于ERROR的log将记录在error.YYYYMMDD.log 文件中
 */
logger.set( 'file.error', new FileTransport( {
	file: 'logs/error.' + utils.YYYYMMDD() + '.log',
	level: 'ERROR',
	formatter: fileFormatter,
} ) );

/*
 * debug 环境下，打印所有log到控制台
 * production 环境下，打印 level >= INFO 的log到控制台
 */
logger.set( 'console', new ConsoleTransport( {
	level: config.debug ? 'ALL' : 'INFO',
} ) );

/*
 * 将 logger 实例添加到全局作用域中
 */
module.exports = function () {
	global.logger = logger;
};