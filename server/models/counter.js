/**
 * 自增记录
 * @type {[type]}
 */
var Schema, counterSchema, mongoose;

mongoose = require( 'mongoose' );

Schema = mongoose.Schema;

counterSchema = new Schema( {
	_id: {
		type: String,
		rquired: true,
		// index: {
		//   unique: true
		// }
	},
	count: {
		type: Number,
		require: true
	}
} );

counterSchema.statics.incrementCounter = function ( schemaName, callback ) {
	return this.collection.findAndModify( {
		_id: schemaName
	}, [], {
		$inc: {
			count: 1
		}
	}, {
		"new": true,
		upsert: true
	}, function ( err, result ) {
		if ( err ) {
			return callback( err );
		}
		return callback( null, result.count );
	} );
};

var couter = mongoose.model( 'Counter', counterSchema );
module.exports = couter
