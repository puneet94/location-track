module.exports = function(){
	return {
		edit_profile_get : function(request, response){
			console.log('in profile_model.js edit_profile_get');
			var users_data_model = require('../schemas/users_schema.js');
			users_data_model.findOne({_id : request.cookies._id}, { _id : 0 , password : 0, groups: 0, __v : 0, profile_pic_url : 0 }, function(error, result){
				if(error)
				{
					console.log('Some error occurred while fetching the data of the owner ', error);
					response.status(500);
					response.send('Some error occurred while fetching the data of the owner... \nPlease try again later');
				}
				else
				{
					console.log('result is ');
					response.send(JSON.stringify(result));
				}
			});
		},

		edit_profile_post : function(data, request, response){
			console.log('in profile_model.js edit_profile_post');
			var users_data_model = require('../schemas/users_schema.js');
			users_data_model.find({user_name : data.user_name}, function(error, result){
				if(error)
				{
					console.log('Some error occurred while updating the profile', error);
					response.status(500);
					response.send('Some error occurred while updating the profile...\nPlease go back and try again later.');
				}
				else
				{
					if(result.length != 0)
					{
						console.log('username is already taken');
						response.status(200);
						// response.render('../views/abc.pug', { message : data.user_name+' is already taken. Please try with another name!'});
						response.send(JSON.stringify({ message : data.user_name+' is already taken. Please try with another name!'}));
					}
					else
					{
						users_data_model.update({_id : request.cookies._id}, {user_name : data.user_name, mobile : data.mobile}, function(err, res){
							if(err)
							{
								console.log('Some error occurred while updating the profile', error);
								response.status(500);
								response.send('Some error occurred while updating the profile...\nPlease go back and try again later.');
							}
							else
							{
								console.log('successfully updated the profile');
								response.status(200);
								response.redirect('/edit_profile');
							}
						});
					}
				}
			});
		}
	};
};