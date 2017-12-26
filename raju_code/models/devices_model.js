module.exports = function(request, response, start_date, end_date){
	var users_data_model = require('../schemas/users_schema.js');
	console.log('in devices_model.js');
	if(start_date == undefined && end_date == undefined)
	{
		var devices_model = require('../schemas/devices_schema.js');
		devices_model.find({owner_id : request.cookies._id}, {imei : 1, _id : 0, member_name : 1},  function(error, result){
			if(error)
			{
				console.log("some internal error occurred while fetching the imei's of devices that belong to the owner ", error);
				response.status(500);
				response.send("Some internal error occurred...\n Please go back and try again later. ");
			}
			else
			{
				var imeis = [];
				for(var i in result)
				{
					imeis.push(result[i].imei);
				}
				console.log('result is ', result);
				console.log('imeis array is ', imeis);

				var devices_data_model = require('../schemas/device_data_schema.js');
				devices_data_model.find({imei : {$in : imeis}}, function(err, res)
				{
					if(err)
					{
						console.log("some internal error occurred while fetching required devices ", err);
						response.status(500);
						response.send("Some internal error occurred...\n Please go back and try again later. ");
					}
					else
					{
						console.log('success');
						response.status(200);
						console.log('res is ', res);
						//response.send(res);
						console.log('group is ', request.cookies.my_groups);
						if(request.cookies.my_groups == undefined)
						{
						    response.render('../views/devices.pug', {groups : [], pic : request.cookies.profile_pic_url, user_name : request.cookies.user_name, data : res, devices : result});
						}
						else
						{
							response.render('../views/devices.pug', {groups : JSON.parse(request.cookies.my_groups).groups, pic : request.cookies.profile_pic_url, user_name : request.cookies.user_name, data : res, devices : result});
						}
					}
				});
			}
		});
	}
};
