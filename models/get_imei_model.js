module.exports = function(request, response,groupname){
	console.log('in get_imei_model.js');
			// console.log('imeis array is ', imeis);
	var devices_model = require('../schemas/devices_schema.js');
	devices_model.find({$and:[{owner_id : request.cookies._id}, {group_name : groupname}]}, function(err, res)
				{
					if(err)
					{
						console.log("some internal error occurred while fetching required imeis ", err);
						response.status(500);
						response.send("Some internal error occurred...\n Please go back and try again later. ");
					}
					else
					{
						console.log('success');
						console.log(res);
						console.log(res.length);
						response.status(200);
						response.send(res);
					}
				});
	};