var moment = require('moment');
function printResult(result,device){

    return function(err,res){
        if(err){
            
            console.log("error in finding stuff");
            console.log("***************");
            console.log(err);
        }
        
        if(res && res.created_on){
            
            /*console.log("the difference-"+res.imei+" "+result[res.imei]+"-"+res.created_on);
            console.log( result[res.imei]+"---"+moment().diff(res.created_on,'minutes') );*/
            var timeDiff = moment().diff(moment(res.created_on),'minutes');
            if(timeDiff>30){
                device['device_status'] = 0;
                
            }else{
                device['device_status'] = 1;
            }
            device.save(function(err){
                if(err){
                    console.log(err);
                }else{
                    
                }
            });
        }
    }
    
}

module.exports = function(){
    
    
	var devices_model = require('../schemas/devices_schema.js');
	devices_model.find({}, {imei : 1, member_name : 1}, function(error, result){
		if(error)
		{
			console.log("some internal error occurred while fetching the imei's of devices that belong to the owner ", error);
			
		}
		else
		{
            var imeis = [];
            var imesisHash = {

            };
			for(var i in result)
			{
                imeis.push(result[i].imei);
                
                imesisHash[result[i].imei] = result[i].member_name;
            }	
            	
            for( k in result){
                var devices_data_model = require('../schemas/device_data_schema.js');
                
                devices_data_model.findOne({imei: result[k]['imei']}, {imei: 1,created_on:1}, { sort: { 'created_on' : -1 } }, printResult(imesisHash,result[k]));
            }
            

		}
	});
};