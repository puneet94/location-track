module.exports = function(request, response){
            var users_data_model = require('../schemas/users_schema.js');
            var fence_model = require('../schemas/fence_schema.js');
			console.log('in add_device_model.js get_group_name()');
			users_data_model.findOne({_id : request.cookies._id}, function(error, result)
				{
					if(error)
					{
						console.log('some error occurred while fetching the names of the groups ',error);
						response.status(200);
						
					}
					else
					{
                        console.log(request.body.fenceArray[0]);
                        var data = {
                            fenceArray: JSON.stringify(request.body.fenceArray),
                            fenceName:  request.body.fenceName,
                            user: result._id
                        };
                        
                        fence_model.create(data, function(err, output){
							if(err)
							{
								console.log('some error occurred while creating a fence ',err);

                                
                                response.status(200);
							}
							else
							{
								response.status(200);
								console.log(output);
                                response.json("got all data");
							}
						});
                        
						
						
					}
				});
		
};