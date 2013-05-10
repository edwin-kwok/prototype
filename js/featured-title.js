/**
 * View logic for featured title page.
 */

"use strict";

var featuredTitleView = (function() {
	var $carousel = $(".mdmc-featured-title.mdmc-carousel"),
		$orbit = $carousel.children("ul[data-orbit]"),
		setSliderHeight = function() {
			var imageWidth = $(".mdmc-featured-title.mdmc-slider section .mdmc-slider-container .slider .item img").width(),
				ratio = 242 / 304;
			
			$(".mdmc-featured-title.mdmc-slider section").css("height", + (imageWidth / ratio) + "px");
			$(".mdmc-featured-title.mdmc-slider section .mdmc-slider-container").css("height", + (imageWidth / ratio) + "px");
			$(".mdmc-featured-title.mdmc-slider section .mdmc-slider-container .slider").css("height", + (imageWidth / ratio) + "px");
			$(".mdmc-featured-title.mdmc-slider section .mdmc-slider-container .slider .item img").css("height", + (imageWidth / ratio) + "px");
		},
		delay = (function(){
			var timer = 0;
			
			return function(callback, ms) {
				clearTimeout(timer);
				timer = setTimeout(callback, ms);
			}
		})();
	
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
		setSliderHeight();
		
		$(window).resize(function() {
			delay(setSliderHeight, 50);
		});
		
		$orbit.on("click", "li.active>div, li.active>div>img", function(e) {
			Foundation.libs.orbit._stop_timer($orbit);
			
			e.stopPropagation();
			//e.stopImmediatePropagation();
			
			if(e.type === "click") {
				if(e.currentTarget.nodeName === "IMG") {
					var catentryid = $(e.target).parents("li").attr("data-catentryid");
					alert(e.type + ": " + catentryid);
				}
			}
		});
		
		$(".mdmc-featured-title.mdmc-slider .mdmc-slider-container").iosSlider({
			snapToChildren: true,
			desktopClickDrag: true,
		});
	}
	
	return new FeaturedTitleView();
})();
