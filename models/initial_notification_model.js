module.exports = function(request, response){
	var devices_model = require('../schemas/devices_schema.js');
	devices_model.find({owner_id : request.cookies._id}, {imei : 1, _id : 0, member_name : 1,device_status:1}, function(error, result){
		if(error)
		{
			console.log("some internal error occurred while fetching the imei's of devices that belong to the owner ", error);
			response.status(500);
			response.send("Some internal error occurred...\n Please go back and try again later. ");
		}
		else
		{

            var initialNotificationObject = {
                fall: 0,
                SOS: 0,
                battery_alarm: 0,
                offline: 0,
                online: 0
            }
            var imeis = [];
            var queryObj = {};
            queryObj['user_verified'] =null
			for(var i in result)
			{
                console.log("device status");
                console.log(result[i]);
                console.log(result[i]['member_name'],result[i]['device_status']);
                if(result[i]['device_status']==0){
                    initialNotificationObject['offline']+=1;
                }else{
                    initialNotificationObject['online']+=1;
                }
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
                            
							if(res[k]['fall']==1){
								initialNotificationObject['fall']+=1;
                            }
                            if(res[k]['battery_alarm']==1){
								initialNotificationObject['battery_alarm']+=1;
                            }
                            if(res[k]['SOS']==1){
								initialNotificationObject['SOS']+=1;
							}
							
						}
						response.status(200);
						
						response.send(JSON.stringify(initialNotificationObject));
					}
				});
		}
	});
};