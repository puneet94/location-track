module.exports = function(){
	return {
		edit_profile_get : function(request, response){
			console.log('in profile_model.js edit_profile_get');
			var users_data_model = require('../schemas/users_schema.js');
			users_data_model.findOne({_id : request.cookies._id}, { _id : 0 , password : 0, groups: 0, __v : 0, profile_pic_url : 0 }, function(error, result){
				if(error)
				{
					console.log('Some error occurred while fetching the data of the owner ', error);
					// response.status(500);
					// response.send('Some error occurred while fetching the data of the owner... \nPlease try again later');
					response.render('edit_profile.pug', { message : 'Some error occurred while fetching the data of the owner.Please try again later'});
				}
				else
				{
					console.log('result is ');
					// response.send(JSON.stringify(result));
					response.render('edit_profile.pug', { data : result});
				}
			});
		},

		edit_profile_post : function(data, request, response){
			console.log('in profile_model.js edit_profile_post');
			console.log("in profile model");
			console.log(data);
			var users_data_model = require('../schemas/users_schema.js');
			users_data_model.find({user_name : data.user_name}, function(error, result){
				if(error)
				{
					console.log('Some error occurred while updating the profile', error);
					// response.status(500);
					// response.send('Some error occurred while updating the profile...\nPlease go back and try again later.');
					response.render('edit_profile.pug', { message : 'Some error occurred while updating the profile.Please go back and try again later.'});
				}
				else
				{
					console.log(result);
					var updateObject = {};
					if(data.user_name){
						updateObject.user_name = data.user_name;
					}
					if(data.mobile){
						updateObject.mobile = data.mobile;
					}
					if(data.profile_pic_url){
						updateObject.profile_pic_url = data.profile_pic_url;
					}
					
						users_data_model.update({_id : request.cookies._id}, updateObject, function(err, res){
							if(err)
							{
								console.log('Some error occurred while updating the profile', error);
								// response.status(500);
								// response.send('Some error occurred while updating the profile...\nPlease go back and try again later.');
								response.render('edit_profile.pug', { message : 'Some error occurred while updating the profile.Please go back and try again later.'});

							}
							else
							{
								console.log('successfully updated the profile');
								response.status(200);
								response.redirect('/profile');
							}
						});
					}
				
			});
		}
	};
};
