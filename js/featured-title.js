/**
 * View logic for featured title page.
 * 
 * The following plugin is used to display the 2.5 sliders on the page:
 * http://iosscripts.com/iosslider/
 * 
 * To reduce weight of application, we no longer use the orbit plugin supplied by Zurb Foundation.
 * 
 */

var featuredTitleView = (function() {
	"use strict";
	
	var $topbarContainer = $(".mdmc-header>section"),
		$carouselContainer = $(".mdmc-featured-title.mdmc-carousel .mdmc-slider-container"),
		$carousel = $carouselContainer.children(".slider"),
		$sliderContainer = $(".mdmc-featured-title.mdmc-slider .mdmc-slider-container"),
		$slider = $sliderContainer.children(".slider"),
		$promos = $(".mdmc-featured-title.mdmc-promos section"),
		carouselTimer = parseInt($carouselContainer.attr("data-timer") || 0),
		
		onSlideItemChange = function(args) {
			$(".selectors .item").removeClass("selected");
			$(".selectors .item:eq(" + (args.currentSlideNumber - 1) + ")").addClass("selected");
		};
	
	var FeaturedTitleView = function() {
		var displayBullets = $carouselContainer.attr("data-bullets") || "false";
		
		if(displayBullets === "false") {
			$carouselContainer.children(".selectors-block").hide();
			$carouselContainer.parent().css("padding", "0 0 45% 0");
		}
		
		if($topbarContainer.length > 0) {
			$topbarContainer.foundation("topbar", function(response) {
				if(response.errors.length !== 0) {
					console.log("FeaturedTitleView: Failed to initialize topbar!");
				}
			});
		}
		else {
			console.log("FeaturedTitleView: Cannot find $topbarContainer!");
		}
	}
	
	FeaturedTitleView.prototype.init = function() {
		$carouselContainer.iosSlider({
			snapToChildren: true,
			desktopClickDrag: true,
			navSlideSelector: $(".selectors .item"),
			onSlideChange: onSlideItemChange,
			infiniteSlider: carouselTimer > 0,
			autoSlide: carouselTimer > 0,
			autoSlideTimer: (carouselTimer > 0)? carouselTimer: 0
		});
		
		$sliderContainer.iosSlider({
			snapToChildren: true,
			desktopClickDrag: true,
		});

		$carousel.add($slider).add($promos).on("click", "div, div>img", function(e) {
			e.stopPropagation();
			
			if(e.type === "click") {
				if(e.currentTarget.nodeName === "IMG") {
					var catentryid = $(e.target).parents("div.item").attr("data-catentryid");
					alert(e.type + ": " + catentryid);
				}
			}
		});
	}
	
	return new FeaturedTitleView();
})();
