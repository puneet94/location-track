var mongoose = require('mongoose');
module.exports = function(){
	return {
		edit_device_get : function(imei, request, response){
			console.log('imei is ',imei);
			var devices_data_model = require('../schemas/devices_schema.js');
			var users_data_model = require('../schemas/users_schema.js');
			var fence_model = require('../schemas/fence_schema.js');
			var async = require('async');
			async.parallel({
					groups : function(callback){
						users_data_model.findOne({_id : request.cookies._id},{groups : 1}, callback);
					},
					device : function(callback){
						devices_data_model.findOne({imei : imei}, callback);
					},
					fence: function(callback){
						
						fence_model.find({user : request.cookies._id},callback);
					}
				}, function(error, result){
						if(error)
						{
							console.log('some error occurred while editing the device ', error);
							response.status(500);
							response.send('Some Internal error occurred ...\nPlease go back and try again later.')
						}
						else
						{
							
							console.log(result.fence);
							response.status(200);
							response.render('../views/editdevice.pug', {groups : result.groups.groups, device :result.device,fence:result.fence});
						}
					});
		},

		edit_device_post : function(data, request, response){
			var devices_data_model = require('../schemas/devices_schema.js');
			devices_data_model.update({imei : data.imei}, {fence: data.fence,member_name : data.member_name, group_name : data.group_name, dob : data.dob, age : data.age, contact_number : data.contact_number, emergency_contact_number : data.emergency_contact_number, additional_details : data.additional_details}, function(error, result){
				if(error)
				{
					console.log('some error occurred while updating the device ', error);
					response.status(500);
					response.send('Some error occurred while updating the device...\nPlease go back and try again.');
				}
				else
				{
					console.log('successfully updated the device');
					response.status(200);
					response.redirect('/groups/'+data.group_name);
				}
			});
		}
	}
};
