// Preload Images
img1 = new Image(16, 16);  
img1.src="images/spinner.gif";

img2 = new Image(220, 19);  
img2.src="images/ajax-loader.gif";

// When DOM is ready
jQuery(document).ready(function(){

// Launch MODAL BOX if the Login Link is clicked
jQuery("#login_link").click(function(){
	jQuery('#login_form').modal();
});

// When the form is submitted
jQuery("#status > form").submit(function(){  

// Hide 'Submit' Button
jQuery('#submit').hide();

// Show Gif Spinning Rotator
jQuery('#ajax_loading').show();

// 'this' refers to the current submitted form  
var str = jQuery(this).serialize();  

// -- Start AJAX Call --

jQuery.ajax({  
    type: "POST",
    url: "authenticate/do-login.php",  // Send the login info to this page
    data: str,  
    success: function(msg){  
   
jQuery("#status").ajaxComplete(function(event, request, settings){  
 
 // Show 'Submit' Button
jQuery('#submit').show();

// Hide Gif Spinning Rotator
jQuery('#ajax_loading').hide();  

 if(msg == 'OK') // LOGIN OK?
 {  
 var login_response = '<div id="logged_in">' +
	 '<div style="width: 350px; float: left; margin-left: 70px;">' + 
	 '<div style="width: 40px; float: left;">' +
	 '<img style="margin: 10px 0px 10px 0px;" align="absmiddle" src="images/ajax-loader.gif">' +
	 '</div>' +
	 '<div style="margin: 10px 0px 0px 10px; float: right; width: 300px;">'+ 
	 "You are successfully logged in! <br /> Please wait while you're redirected...</div></div>";  

jQuery('a.modalCloseImg').hide();  

jQuery('#simplemodal-container').css("width","500px");
jQuery('#simplemodal-container').css("height","120px");
 
 jQuery(this).html(login_response); // Refers to 'status'

// After 3 seconds redirect the 
setTimeout('go_to_private_page()', 1000); 
 }  
 else // ERROR?
 {  
 var login_response = msg;
 jQuery('#login_response').html(login_response);
 }  
      
 });  
   
 }  
   
  });  
  
// -- End AJAX Call --

return false;

}); // end submit event

});

function go_to_private_page()
{
//window.location = 'private.php'; // Members Area
window.location = 'forms.php'+window.location.search; // Members Area
}