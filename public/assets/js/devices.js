(function(){
    
$(document).ready(function(){
    initialData();
    $(".quick-access-button-wrapper").on('click',function(){
        
        
        var notification = $(this).data('getnotif');
        $('#modalNotificationContent').empty();
        $('#myNotificationModal').modal('show');
        var table = $('<table></table>').addClass('table');
        
        var arrayStrings = ['imei','date','member','battery_level','latitude','longitude'];
        var row = $('<tr></tr>').addClass('bar');
        for(var k =0;k<arrayStrings.length;k++){
        
            var column = $('<td></td>');
            column.text(arrayStrings[k]);
            
            row.append(column);
            
            table.append(row);
        }
        $.ajax({
            type:"GET",
            url:"/device_notification?notification="+notification,
            datatype:"json",
            success:function(result)
            {
                result = JSON.parse(result);
                console.log(result);
               for(var i =0;i < result.length;i++){
                var row = $('<tr></tr>').addClass('bar');
                for(var j = 0; j < arrayStrings.length; j++){
                    var column = $('<td></td>');
                
                    var key = arrayStrings[j];
                    column.text(result[i][key]);
                    console.log(key);
                
                    row.append(column);
                }
                table.append(row);
               }
            }
            });
        $('#modalNotificationContent').append(table);
    });
});
function initialData(){

    $.ajax({
        type:"GET",
        url:"/initial_notification",
        datatype:"json",
        success:function(result)
        {
         
            result = JSON.parse(result);
            var keysarray = Object.keys(result);
            for(i in keysarray){
                $("."+keysarray[i].toLowerCase()+"-class").text(result[keysarray[i]]);
                console.log("."+keysarray[i].toLowerCase()+"-class",result[keysarray[i]]);
            }
            window.setTimeout(function(){
                $('.online-devices').find('.circles-text').text(result["online"]);
                $('.offline-devices').find('.circles-text').text(result["offline"]);
            },2000);
            
            console.log("device notification");
            console.log(result);
           
        }
        });
}


})();