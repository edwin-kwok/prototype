/**
 * View logic for featured title page.
 */

var featuredTitleView = (function() {
	"use strict";
	
	var $topbarCtn = $(".mdmc-header>section"),
		$carouselCtn = $(".mdmc-featured-title.mdmc-carousel .mdmc-slider-container"),
		$carousel = $carouselCtn.children(".slider"),
		$sliderCtn = $(".mdmc-featured-title.mdmc-slider .mdmc-slider-container"),
		$slider = $sliderCtn.children(".slider"),
		$promos = $(".mdmc-featured-title.mdmc-promos section"),
		carouselTimer = 0,
		
		onSlideItemChange = function(args) {
			$(".selectors .item").removeClass("selected");
			$(".selectors .item:eq(" + (args.currentSlideNumber - 1) + ")").addClass("selected");
		};
	
	var FeaturedTitleView = function() {
		var carouselBullets = $carouselCtn.attr("data-bullets") || false;
		
		carouselTimer = parseInt($carouselCtn.attr("data-timer") || 0);

		if(!carouselBullets) {
			// need to hide .selectors-block and adjust carousel and selector block scaling
		}
		
		if($topbarCtn.length > 0) {
			$topbarCtn.foundation("topbar", function(response) {
				if(response.errors.length !== 0) {
					console.log("FeaturedTitleView: Failed to initialize topbar!");
				}
			});
		}
		else {
			console.log("FeaturedTitleView: Cannot find $topbarCtn!");
		}
	}
	
	FeaturedTitleView.prototype.init = function() {
		$carouselCtn.iosSlider({
			snapToChildren: true,
			desktopClickDrag: true,
			navSlideSelector: $(".selectors .item"),
			onSlideChange: onSlideItemChange,
			infiniteSlider: carouselTimer > 0,
			autoSlide: carouselTimer > 0,
			autoSlideTimer: (carouselTimer > 0)? carouselTimer: 0
		});
		
		$sliderCtn.iosSlider({
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
