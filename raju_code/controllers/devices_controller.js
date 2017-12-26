module.exports = function(app){
	app.get('/devices', function(request,response){
		console.log('in devices_controller.js');
		var cookies = request.cookies;
		if(cookies._id == null || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			var devices_model = require('../models/devices_model.js');
			if(request.query.date == null || request.query.date == "")
			{
				console.log('cookies are ', cookies);
				devices_model(request, response);
			}
			else
			{
				var temp = require.query.date.split('-');
				var start_date = temp[0];
				var end_date = temp[1];
				console.log('start date is ', start_date);
				console.log('end date is ', end_date);
				devices_model(request, response, start_date, end_date);
			}
		}
	});
};