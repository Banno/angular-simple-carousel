/*!
 * angular-simple-carousel v1.0.0
 * https://github.com/Banno/angular-simple-carousel
 * (c) 2015 Jack Henry & Associates Inc
 * License: Apache-2.0
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['angular'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('angular'));
  } else {
    root.banno = root.banno || {}; root.banno.carousel = factory(root.angular);
  }
}(this, function(angular) {
angular.module('banno.carousel', []).directive('bannoCarousel', function() {
	'use strict';
	return {
		restrict: 'A',
		template: '<div ng-transclude></div>',
		transclude: true,
		replace: true,
		link: function(scope, element, attrs) {
			var slideContainers = [];	// sets of "slides"

			scope.currentSlide  = 0;	// index of current slide
			scope.numSlides     = 0;
			scope.slides        = [];	// first set

			//  Displays or hides an element.
			var showElementIf = function(el, ifShow) {
				angular.element(el).css('display', ifShow ? 'block' : 'none');
			};

			// Displays the given slide (by index) and hides the others.
			scope.showSlide = function(showIndex) {
				scope.currentSlide = showIndex;
				angular.forEach(slideContainers, function(container) {
					angular.forEach(angular.element(container).children(), function(slide, index) {
						showElementIf(slide, index === showIndex);
					});
				});
			};

			// Displays the previous slide.
			scope.prevSlide = function() {
				if (!scope.isFirst()) {
					scope.showSlide(scope.currentSlide - 1);
				}
			};

			// Displays the next slide.
			scope.nextSlide = function() {
				if (!scope.isLast()) {
					scope.showSlide(scope.currentSlide + 1);
				}
			};

			// Checks if the current slide is the first slide.
			scope.isFirst = function() {
				return scope.currentSlide === 0;
			};

			// Checks if the current slide is the last slide.
			scope.isLast = function() {
				return scope.currentSlide === (scope.numSlides - 1);
			};

			// Checks if the current slide is the nth slide (beginning with 0).
			scope.isSlide = function(index) {
				return scope.currentSlide === index;
			};

			// Find and remember the slide containers.
			slideContainers = element[0].querySelectorAll('[banno-carousel-slides]');

			// Get the slides from the first container.
			if (slideContainers) {
				scope.slides = angular.element(slideContainers[0]).children();
				scope.numSlides = scope.slides.length;
			}

			// Start the slideshow.
			scope.showSlide(scope.currentSlide);
		}
	};
});

return "banno.carousel";
}));
