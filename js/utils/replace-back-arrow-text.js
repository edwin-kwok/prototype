// jquery plugin to remove default the arrow in the back button created by 
// zurb foundation topbar plugin

(function($) {
	$.fn.replaceBackArrowText = function(buttonText) {	
		return this.each(function() {
			$(this).html(buttonText);
		});
	};	
})(jQuery);
