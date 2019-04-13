
$(function() {
	
	
	$("#form-validation").hide();
	$("#form-validation").html("");
	$("#form-validation").css({
		margin: "5px 0"
		
	});
	$("form").submit(function(event){
		var isValid = true;
		$("#form-validation").html("");
		
		if($("#user").val().indexOf(" ") != -1 ){
			isValid = false;
			$("#form-validation").append("<p>There are space in username.</p>");
		}
		
		if($("#pass1").val() != $("#pass2").val() ) {
			isValid = false;
			$("#form-validation").append("<p>Passwords are different</p>");
		}
		
		if($("#email1").val() != $("#email2").val() ) {
			isValid = false;
			$("#form-validation").append("<p>Emails are different</p>");
		}
		
		if(!isValid) {
			event.preventDefault();
			$("#form-validation").prepend("<h2>There are these mistakes in form :</h2>");
			$("#form-validation").show();
			$("#form-validation").css({
				width: "300px",
				padding: "10px",
				color: "red",
				border: "5px solid red",
				background: "yellow"
				});
		}
	});
});

