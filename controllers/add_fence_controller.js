module.exports = function(app){
    
        app.get('/addfence', function(request, response){
            console.log('in add_fence_controller.js /addfence get');
            var cookies = request.cookies;
            if(cookies._id == undefined || cookies._id == "")
            {
                response.status(403);
                response.redirect('/');
            }
            else
            {
                response.status(200);
                response.render('../views/addfence.pug');
            }
        });
    


        app.post('/addfence', function(request, response){
            var add_fence_model = require('../models/add_fence_model.js');
            console.log('in add_fence_controller.js /addfence post');
            add_fence_model( request, response);
        });
};