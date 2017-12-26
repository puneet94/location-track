module.exports = function(request, response){
	var devices_model = require('../schemas/devices_schema.js');
	devices_model.find({owner_id : request.cookies._id}, {imei : 1, _id : 0, member_name : 1}, function(error, result){
		if(error)
		{
			console.log("some internal error occurred while fetching the imei's of devices that belong to the owner ", error);
			response.status(500);
			response.send("Some internal error occurred...\n Please go back and try again later. ");
		}
		else
		{
            var queryString = request.query.notification;
			var queryObj = {};
			var queryObjString = "";

            if(queryString=="falls"){
				queryObj['fall']= 1
				queryObjString  = "fall";
                
            }
            else if(queryString=="sos"){
				queryObj['SOS']= 1
				queryObjString  = "SOS";
                
			}
			else if(queryString=="lowbattery"){
				queryObj['battery_alarm']= 1
				queryObjString  = "battery_alarm";
                
			}
			queryObj['user_verified'] =null;//{ $or: [{ $eq: 0 },{ $eq: '0' },{ $eq: null} ] };

			var imeis = [];
			for(var i in result)
			{
				imeis.push(result[i].imei);
            }			
			var devices_data_model = require('../schemas/device_data_schema.js');
			devices_data_model.find({$and : [{imei : {$in : imeis}},queryObj  ]}).sort({created_milli:-1}).exec(function(err, res)
				{
					if(err)
					{
						console.log("some internal error occurred while fetching required devices ", err);
						response.status(500);
						response.send("Some internal error occurred...\n Please go back and try again later. ");
					}
					else
					{
						
						var res_json = JSON.parse(JSON.stringify(res));
						for(k in res){
							if(res[k][queryObjString]==1){
								res[k]['user_verified'] = 1;
								if(!res[k]['created_milli']){
									var d = new Date();
									res[k]['created_milli'] = d.getTime();
								}
								res[k].save(function(err){
									if(err){
										console.log("***********");
										console.log(err);
										console.log("error in saving check");
										
									}else{
										console.log("saved item");
									}
								})
							}
							
						}
					    for(i in res_json)
						{
							for(j in result)
							{
								if(res_json[i].imei == result[j].imei)
								{
									var obj1 = res_json[i];
									obj1['member'] = result[j]["member_name"].toString();
									break;
								}
							}
						}
						response.status(200);
						
						response.send(JSON.stringify(res_json));
					}
				});
		}
	});
};