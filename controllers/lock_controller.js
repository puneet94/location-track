module.exports = function(app){
    
        app.get('/lock', function(request, response){
            console.log('in lock_controller.js for /lock get method');
            var cookies = request.cookies;
            response.clearCookie('_id');
			response.clearCookie('email');
			response.clearCookie('my_groups');
			response.clearCookie('user_name');
			response.clearCookie('profile_pic_url');
            
            if(cookies.lock_profile_pic_url == null || cookies.lock_user_name == "")
            {
                response.status(200);
                response.render('../views/login.pug');			
            }
            else
            {
                response.render('lock');
            }
        });
    


        app.post('/lock', function(request, response){
            var basic_models = require('../models/basic_models.js')();
            var data = {};
            data.user_name = request.body.username;
            data.password = request.body.password;
            console.log('in lock_controller.js for /lock post method');
            console.log(data);
            basic_models.login_check(data, request, response);
        });
    
    
    };