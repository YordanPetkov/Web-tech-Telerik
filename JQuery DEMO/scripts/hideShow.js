$(document).ready(function() {
	$("#root");
	$("div");
	$("div h1");
	
	$(".btn").on({
		click : function () {
			var $heading = $("h1");
			if($heading.hasClass("hidden"))$heading.removeClass("hidden");
			else $heading.addClass("hidden");
		},
		mouseenter : function () {
			var $heading = $("h1");
			$heading.css({
				backgroundColor : "yellow"
			}
			);
		},
		mouseleave : function () {
			var $heading = $("h1");
			$heading.css({
				backgroundColor : "white"
			}
			);
		}
		
		
		
	});
	
	
	
	$(".btna").on({
		click : function() {
			var $this = $(this);
			var $node = $this.prev();
			
			while($node.length){
				if($node.hasClass("hidden")){
					$node.removeClass("hidden");
					$this.text("hide");
				}
				else {
					$node.addClass("hidden");
					$this.text("show");
				}
				$node = $node.prev();
			}
			
			$node = $this.next();
			
			while($node.length){
				if($node.hasClass("hidden")){
					$node.removeClass("hidden");
					$this.text("hide");
				}
				else {
					$node.addClass("hidden");
					$this.text("show");
				}
				$node = $node.next();
			}
		}
	});
});


