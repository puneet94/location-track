module.exports = function(app){
	app.get('/device_notification', function(request, response){
		
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			var device_notification_model = require('../models/device_notification_model.js');
			device_notification_model(request, response);
		}
	});
};