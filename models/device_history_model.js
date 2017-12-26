module.exports = function(request, response, deviceid,start_date, end_date, group_name)
{
	console.log('start_date is ', start_date);
	console.log('end_date is ', end_date);
	console.log('group_name is ', group_name);
	var devices_model = require('../schemas/devices_schema.js');
	var moment = require('moment');
	moment().format();
	if(start_date == undefined && end_date == undefined && group_name == undefined)
	{
		console.log('first');
		return devices_model.find({owner_id : request.cookies._id}, {imei : 1, _id : 0},  function(error, result)
		{
			if(error)
			{
				console.log("some internal error occurred while fetching the imei's of devices that belong to the owner ", error);
				response.status(500);
				return response.send("Some internal error occurred...\n Please go back and try again later. ");
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

				console.log(start_date, end_date);
				devices_data_model.find({imei : {$in : imeis}}, function(error, result)
				{
					if(error)
					{
						console.log('some internal error occurred while fetching the logs ', error);
						response.status(500);
						return response.send('Some internal error occurred.s.\nPlease go back and try again later.');
					}
					else
					{
						console.log('successfully fetched the logs ', result);
						response.status(200);
						// response.send('success');
						console.log(JSON.parse(request.cookies.my_groups).groups);
						return response.render('history.pug', { groups : JSON.parse(request.cookies.my_groups).groups, username : request.cookies.user_name, pic : request.cookies.profile_pic_url, data : result });
					}
				});
			}
		});
	}
    else
    {

    }
	if(start_date != "" && end_date != "" && group_name == "")
	{
		console.log('second');
		return devices_model.find({owner_id : request.cookies._id}, {imei : 1, _id : 0},  function(error, result)
		{
			if(error)
			{
				console.log("some internal error occurred while fetching the imei's of devices that belong to the owner ", error);
				response.status(500);
				return response.send("Some internal error occurred...\n Please go back and try again later. ");
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
				start_date=moment(start_date).format('DD/MM/YYYY');
            	end_date=moment(end_date).format('DD/MM/YYYY');
				console.log(start_date, end_date);
				devices_data_model.find({imei : {$in : imeis}, date : {$gte : start_date, $lte : end_date}}, function(error, result)
				{
					if(error)
					{
						console.log('some internal error occurred while fetching the logs ', error);
						response.status(500);
						return response.send('Some internal error occurred...\nPlease go back and try again later.');
					}
					else
					{
						// console.log('successfully fetched the logs ', result);
						response.status(200);
						// response.send('success');
						console.log(JSON.parse(request.cookies.my_groups));
						console.log('length is ', result.length);
						if(result.length !=0)
						{
							return response.render('history.pug', { groups : JSON.parse(request.cookies.my_groups).groups, username : request.cookies.user_name, pic : request.cookies.profile_pic_url, data : result });
						}
						else
						{
							return response.render('history.pug', { groups : JSON.parse(request.cookies.my_groups).groups, username : request.cookies.user_name, pic : request.cookies.profile_pic_url,data:[], alertmessage:"No data is available for devices in the specified time span" });
						}
					}
				});
			}
		});
	}
	if(start_date == undefined && end_date == undefined && group_name != "")
	{
		console.log('third');
		return devices_model.find({owner_id : request.cookies._id, group_name : group_name}, {imei : 1, _id : 0},  function(error, result)
		{
			if(error)
			{
				console.log("some internal error occurred while fetching the imei's of devices that belong to the owner ", error);
				response.status(500);
				return response.send("Some internal error occurred...\n Please go back and try again later. ");
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

				console.log(start_date, end_date);
				devices_data_model.find({imei : {$in : imeis}}, function(error, result)
				{
					if(error)
					{
						console.log('some internal error occurred while fetching the logs ', error);
						response.status(500);
						return response.send('Some internal error occurred...\nPlease go back and try again later.');
					}
					else
					{
						//console.log('successfully fetched the logs ', result);
						response.status(200);
						// response.send('success');
						console.log(JSON.parse(request.cookies.my_groups).groups);
						return response.render('history.pug', { groups : JSON.parse(request.cookies.my_groups).groups, username : request.cookies.user_name, pic : request.cookies.profile_pic_url, data : result });
					}
				});
			}
		});
	}

	if(start_date != "" && end_date != "" && group_name != "")
	{
		console.log('fourth');
		return devices_model.find({owner_id : request.cookies._id, group_name : group_name}, {imei : 1, _id : 0},  function(error, result)
		{
			if(error)
			{
				console.log("some internal error occurred while fetching the imei's of devices that belong to the owner ", error);
				response.status(500);
				return response.send("Some internal error occurred...\n Please go back and try again later. ");
			}
			else
			{
				if(deviceid!="")
				{
					console.log('fifth');
					var devices_data_model=require('../schemas/device_data_schema.js');
					start_date=moment(start_date).format('DD/MM/YYYY');
          		  	end_date=moment(end_date).format('DD/MM/YYYY');
					console.log(start_date, end_date);
					devices_data_model.find({imei : deviceid, date : {$gte : start_date, $lte : end_date}}, function(error, result)
					{
						if(error)
						{
							console.log('some internal error occurred while fetching the logs ', error);
							response.status(500);
							return response.send('Some internal error occurred...\nPlease go back and try again later.');
						}
						else
						{
							// console.log('successfully fetched the logs ', result);
							response.status(200);
							// response.send('success');
							console.log(JSON.parse(request.cookies.my_groups));
							console.log('length is ', result.length);
							if(result.length !=0)
							{
								return response.render('history.pug', { groups : JSON.parse(request.cookies.my_groups).groups, username : request.cookies.user_name, pic : request.cookies.profile_pic_url, data : result });
							}
							else
							{
								console.log('inside else kanaka');
								return response.render('history.pug', { groups : JSON.parse(request.cookies.my_groups).groups, username : request.cookies.user_name, pic : request.cookies.profile_pic_url,data:[], alertmessage:"No data is available for devices in the specified time span" });
							}
						}
					});
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
					start_date=moment(start_date).format('DD/MM/YYYY');
            		end_date=moment(end_date).format('DD/MM/YYYY');
					console.log(start_date, end_date);
					devices_data_model.find({imei : {$in : imeis}, date : {$gte : start_date, $lte : end_date}}, function(error, result)
					{
						if(error)
						{
							console.log('some internal error occurred while fetching the logs ', error);
							response.status(500);
							return response.send('Some internal error occurred...\nPlease go back and try again later.');
						}
						else
						{
							// console.log('successfully fetched the logs ', result);
							response.status(200);
							// response.send('success');
							console.log(JSON.parse(request.cookies.my_groups));
							console.log('length is ', result.length);
							if(result.length !=0)
							{
								return response.render('history.pug', { groups : JSON.parse(request.cookies.my_groups).groups, username : request.cookies.user_name, pic : request.cookies.profile_pic_url, data : result });
							}
							else
							{
								console.log('inside else kanaka');
								return response.render('history.pug', { groups : JSON.parse(request.cookies.my_groups).groups, username : request.cookies.user_name, pic : request.cookies.profile_pic_url,data:[], alertmessage:"No data is available for devices in the specified time span" });
							}
						}
					});
				}
			}
		});
	}
};
