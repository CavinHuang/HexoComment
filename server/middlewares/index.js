const path = require( 'path' );
const bodyParser = require( 'koa-bodyparser' )
const nunjucks = require( 'koa-nunjucks-2' );


const routerRule = require( './router-rule' );
const logger = require( './logger' )
const miSend = require( './send' )
module.exports = ( app ) => {
	routerRule( {
		app,
		rules: [
			{
				path: path.join( __dirname, '../controllers' ),
				name: 'controllers'
      },
			// {
			// 	path: path.join( __dirname, '../service' ),
			// 	name: 'service'
      // }
    ]
	} )

	app.use( nunjucks( {
		ext: 'html',
		path: path.join( __dirname, '../views' ),
		nunjucksConfig: {
			trimBlocks: true
		}
	} ) );

	app.use( bodyParser() )
	app.use( miSend() )
	logger( app )
};