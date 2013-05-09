/**
 * View logic for featured title page.
 */

"use strict";

var featuredTitleView = (function() {
	var $carousel = $(".mdmc-featured-title.mdmc-carousel"),
		$orbit = $carousel.children("ul[data-orbit]");
	
	var FeaturedTitleView = function() {
		if($carousel.length > 0) {
			$carousel.foundation("orbit", function(response) {
				if(response.errors.length === 0) {
					if($orbit.length <= 0) {
						console.log("FeaturedTitleView: Cannot find ul[data-orbit]!");
					}
				}
				else {
					console.log("FeaturedTitleView: Failed to initialize orbit!");
				}
			});
		}
		else {
			console.log("FeaturedTitleView: Cannot find .mdmc-featured-title.mdmc-carousel!");
		}
	}
	
	FeaturedTitleView.prototype.init = function() {
		$orbit.on("click", "li.active>div, li.active>div>img", function(e) {
			Foundation.libs.orbit._stop_timer($orbit);
			
			e.stopPropagation();
			e.stopImmediatePropagation();
			
			if(e.type === "click") {
				if(e.currentTarget.nodeName === "IMG") {
					var catentryid = $(e.target).parents("li").attr("data-catentryid");
					console.log(e.type + ": " + catentryid);
				}
			}
		});
	}
	
	return new FeaturedTitleView();
})();
