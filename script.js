$(function(){
    
    chrome.tabs.getSelected(null, function(tab){
        $("#url").val(tab.url).select().focus();
    });
    
    $("#form").submit(function(){
       urlShorten();
       return false; 
    });
});




function urlShorten(){
    jQuery.support.cors = true;
    
    var baseURL = "yon.ir/";
    var url = $('#url').val();
    url = encodeURIComponent(url);
    var wish = $('#wish').val();
    var dataString = 'url='+url+'&wish='+wish;
    $("#loader").css('display', 'inline-block');
    
    $.ajax({
       type : "POST",
       url : "http://api.yon.ir/",
       data : dataString,
       dataType : 'json',                   
       cache : false,
       success : function(responseValue){
           if(responseValue.status){
               $("#url").val('');
               $("#wish").val('');
               
               $("#url").val("http://" + baseURL + responseValue.output);
               $("#url").select();
               
               showSuccess("لینک شما با موفقیت کوتاه شد!");                                        
                                      
           }                                                    
           else{                            
               showError(responseValue.output);
               $("#url").focus();
           }    
           
           $("#loader").css('display', 'none');    
       },
       error : function(){
           showError("خطا");
           $("#url").focus();
       }
    });
             
}

function showError(data){
    $("#error").text(data);
    $("#error").css("color", "red");
}

function showSuccess(data){
    $("#error").text(data);
    $("#error").css("color", "green");        
}