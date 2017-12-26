module.exports = function(app){
	app.get('/history', function(request, response){
		console.log('in device_history_controller.js');
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			console.log('inside else');
			var device_history_model = require('../models/device_history_model.js');
			if(request.query.date == undefined)
			{
				console.log('inside if');
				device_history_model(request, response);
			}
			else
			{
				if(request.query.group == undefined)
				{
					var date = request.query.date;
            		var a=[];
            		a=date.split(' - ');
            		var startdate = a[0];
            		var enddate = a[1];
            		console.log(startdate,enddate);
            		device_history_model(request, response, startdate, enddate);
				}
				else
				{
					var deviceid=request.query.device;
					var date = request.query.date;
            		var a=[];
            		a=date.split(' - ');
            		var startdate = a[0];
            		var enddate = a[1];
            		console.log(startdate,enddate);
            		var group_name = request.query.group;
            		console.log('group_name receviced from client is ', group_name);
            		device_history_model(request, response, deviceid,startdate, enddate, group_name);	
				}
			}
		}
	});
};