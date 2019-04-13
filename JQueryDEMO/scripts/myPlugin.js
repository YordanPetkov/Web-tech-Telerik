$.fn.alertMe = function() {
	alert("ALERT");
	$(this)
	.on("click", function() {
		alert("gosho");
	})
	.css("color","red");
};

var $elementH1 = $("#myText");
$elementH1.alertMe();



