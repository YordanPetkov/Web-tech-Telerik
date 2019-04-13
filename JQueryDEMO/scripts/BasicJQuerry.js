$(document).ready(function() {
	var $items = $(".list-item");
	$items.on({
		mouseenter : function() {
			$items.first().hide();
		},
		mouseleave : function() {
			$items.first().show();
		},
		click : function(){
			$items.first().remove();
		}
	});
	
	var $buttons = $(".list .list-item .btn");
	
	var $firstButton = $button.first();
	var $parent = $firstButton.parent();
	
	var $parents = $firstButton.parents(".list");
	
	
});


