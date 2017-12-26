module.exports = function(data){
	console.log('in main_notification_model.js');
	var devices_notification_model = require('../schemas/device_notification_schema.js');
	devices_notification_model.create(data, function(error, result){
		if(error)
		{
			console.log('some error occurred while saving the data received fromt the tcpserver', error);
			
		}
		else
		{

			console.log('successfully saved the data that is received from the tcpserver', result);
			console.log(result);
		}
	});
};
