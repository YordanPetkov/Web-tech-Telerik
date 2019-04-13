$(document).ready(function(){
	var flag = true;
	$(".btn").on({
		click : function(){
			var $this = $(this);
			$(".content").toggleClass("hidden");
			if($this.html() === "Hide") {
				$this.html("Show");
				
			}
			else {
				$this.html("Hide");
				if(flag){
					$(".content").css("background-color", "purple");
					flag = false;
				}
				else {
					$(".content").css("background-color", "red");
					flag = true;
				}
				
			}
		}
	});
	
	$(".content").on({
		mouseenter : function(){
			$(this).css("background-color", "green");
		},
		
		mouseout : function() {
			$(this).css("background-color", "");
		}
	});
	
	
	$(".tb-username").on({
		input : function() {
			var $this = $(this);
			$(".result").html($this.val());
		}
	});
	
	
});