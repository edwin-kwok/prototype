/**
 * View logic for featured title page.
 */

"use strict";

var FeaturedTitleView = (function() {
	var carousel = null,
		carouselRotating = true,

		// stop carousel rotation if it is not already paused
		stopCarousel = function() {
			var timerPaused = $(".mdmc-featured-title.mdmc-carousel .orbit-timer.paused");
			
			if(timerPaused.length === 0) {
				Foundation.libs.orbit._stop_timer(carousel);
				carouselRotating = false;
			}	
		};
	
	var FeaturedTitleView = function() {
		// call foundation library to initialize carousel
		$(".mdmc-featured-title.mdmc-carousel").foundation("orbit", function(response) {
			if(response.errors.length === 0) {
				// find orbit in container
				carousel = $(".mdmc-featured-title.mdmc-carousel ul[data-orbit]");
				
				if(carousel) {
					// stop orbit rotation if there is no data-mdmc-autoplay attribute
					if(carouselRotating && carousel.attr("data-mdmc-autoplay") === null) {
						stopCarousel();
					}
				}
				else {
					console.log("FeaturedTitleView: Failed to locate orbit!");
				}
			}
			else {
				console.log("FeaturedTitleView: Failed to initialize orbit!");
			}
		});
	}
	
	FeaturedTitleView.prototype.init = function() {
		carousel.on("click touchstart", "li.active>div, li.active>div>img", function(event) {
			if(event.type === "click") {
				if(event.currentTarget.nodeName === "IMG") {
					var catentryid = $(event.target).parents("li").attr("data-mdmc-catentryid");
					alert(catentryid);
					event.stopPropagation();
				}
			}
			
			if(event.type === "touchstart") {
				alert("touchstart");
			}
			
			if(carouselRotating) {
				stopCarousel();
			}
		});
	}
	
	return new FeaturedTitleView;
})();
