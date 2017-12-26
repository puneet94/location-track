module.exports = function(app){
	app.get('/get_imei', function(request, response){
		console.log("*********************************");
		console.log('in get_imei_controller.js');
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			var get_imei_model = require('../models/get_imei_model.js');
			var groupname=request.query.gname;
			get_imei_model(request, response,groupname);
		}
	});
};