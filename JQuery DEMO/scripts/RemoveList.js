$(document).ready(function(){
	$(".X").on({
		click : function(){
			$(this).parent("li").remove();
		}
	});
	
	
});