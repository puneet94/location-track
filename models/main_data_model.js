function inside(point, vs) {
	// ray-casting algorithm based on
	// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

	var x = point[0], y = point[1];

	var inside = false;
	for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
		var xi = vs[i][0], yi = vs[i][1];
		var xj = vs[j][0], yj = vs[j][1];

		var intersect = ((yi > y) != (yj > y))
			&& (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
		if (intersect) inside = !inside;
	}

	return inside;
};


module.exports = function(data, request, response){
	var devices_data_model = require('../schemas/device_data_schema.js');
	var devices_model = require('../schemas/device_schema.js');
	var fence_model = require('../schemas/fence_schema.js');
	devices_model.findOne({imei: data.imei}, function (err, device) {
		if(err){

		}
		if(device){
			fence_model.findById(device.fence,function(err,fence){
				if(err){

				}
				if(fence){
					var polygon = JSON.parse(fence.fenceArray);
					if(inside([ data.latitude, data.longitude ], polygon)){
						data.geofence = 1;
					}else{
						data.geofence = 0;
					}
				}



				
				devices_data_model.create(data, function(error, result){
					if(error)
					{
						console.log('some error occurred while saving the data received fromt the tcpserver', error);
						response.status(500).send(error, result);
					}
					else
					{
						console.log('successfully saved the data that is received from the tcpserver', result);
						response.status(200).send(result);
					}
				});


			});
		}
	});
	
	
};
