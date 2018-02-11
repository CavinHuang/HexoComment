const Path = require( "path" );
const fs = require( 'fs' );
module.exports = function ( opts ) {
	let {
		app,
		rules = []
	} = opts
	if ( !app ) {
		throw new Error( "the app params is necessary!" )
	}
	const appKeys = Object.keys( app )
	rules.forEach( ( item ) => {
		let {
			path,
			name
		} = item
		if ( appKeys.includes( name ) ) {
			throw new Error( `the name of ${name} already exists!` )
		}
		let content = {};
		fs.readdirSync( path )
			.forEach( dirName => {
				content[ dirName ] = {}
				let subPath = path + '/' + dirName;
				let stat = fs.lstatSync( subPath )
				if ( stat.isDirectory() ) {
					fs.readdirSync( subPath )
						.forEach( fileName => {
							let extname = Path.extname( fileName );
							if ( extname === '.js' ) {
								let subName = Path.basename( fileName, extname );
								content[ dirName ] = require( Path.join( subPath, fileName ) )();
							}
						} )
				} else {
					let extname = Path.extname( dirName );
					if ( extname === '.js' ) {
						let name = Path.basename( dirName, extname );
						content[ dirName ] = require( Path.join( path, dirName ) );
					}
				}
			} );
		app[ name ] = content
	} )
}