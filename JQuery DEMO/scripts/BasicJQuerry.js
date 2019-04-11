$(document).ready(function() {
	var $items = $(".list-item");
	$items.on({
		mouseenter : function() {
			$items.first().hide();
		},
		mouseleave : function() {
			$items.first().show();
		}
	})
});


