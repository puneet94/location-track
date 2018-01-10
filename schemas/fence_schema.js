var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var con = mongoose.createConnection('mongodb://miitrace:miitrace@ds129966.mlab.com:29966/miitrace');
//var con = mongoose.createConnection('mongodb://localhost:27017/new_miitrace_db');
var fence_schema = new Schema({
	fenceArray: {
		type: String,
		required: true
	},
	fenceName: {
		type: String,
		required: true
	},
    date :{
        type : String,
	 	trim : true
	},


	user: {type: String},
    time: { type: Date, default: Date.now }
}); 

con.on('error',function(error){
	console.log("error occurred while connecting to the database "+error);
});

con.once('open',function(){
	console.log("connected to the database successfully !");
});

var fence_model = con.model('fence', fence_schema);
module.exports = fence_model;