module.exports = function(app,upload){
	app.get('/edit_profile', function(request, response){
		console.log('in profile_controller.js  /edit_profile get');
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			var profile_model = require('../models/profile_model.js')();
			profile_model.edit_profile_get(request, response);
		}
	});

	app.post('/edit_profile', upload.single('profile_pic'),function(request, response){
		
		
		var cookies = request.cookies;
		if(cookies._id == undefined || cookies._id == "")
		{
			response.status(403);
			response.redirect('/');
		}
		else
		{
			var profile_model = require('../models/profile_model.js')();
			var data = {};
			data.user_name = request.body.user_name;
			data.mobile = request.body.mobile;
			if(request.file){
				var url = '/uploads/'+request.file.filename;
				data.profile_pic_url = url;
			}
			
			profile_model.edit_profile_post(data, request, response);
		}
	});
};