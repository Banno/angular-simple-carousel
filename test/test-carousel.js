define(['testModule'], function(data) {
	'use strict';

	var compiler, el, scope;

	var createCarousel = function(numSlides, scope, addNesting) {
		var i, contents = '<div banno-carousel-slides>';
		for (i = 1; i <= numSlides; i++) {
			contents += '<div>slide ' + i + '</div>';
		}
		contents += '</div>';

		var el = angular.element(
			'<section banno-carousel>' +
				(addNesting ? '<div>' : '') +
				(numSlides > 0 ? contents : '') +
				(addNesting ? '</div>' : '') +
				'</section banno-carousel>'
		);
		compiler(el)(scope);
		scope.$apply();

		return el;
	};

	beforeEach(module('banno.carousel'));

	beforeEach(inject(function($rootScope, $compile) {
		compiler = $compile;
		scope = $rootScope.$new();
	}));

	describe('basic construction (no slides)', function() {

		beforeEach(function() {
			el = createCarousel(0, scope);
		});

		it('should be replaced with a div', function() {
			expect(el[0].tagName).toBe('DIV');
		});

		it('should contain the given contents', function() {
			expect(el[0].innerHTML).toBe('');
		});

		it('should start with a slide index of 0', function() {
			expect(el.scope().currentSlide).toBe(0);
		});

		it('should start with an empty slide collection', function() {
			expect(el.scope().numSlides).toBe(0);
			expect(el.scope().slides).toEqual(jasmine.any(Object));
		});

	});

	describe('standard construction', function() {

		var count = 2;
		var slidesRegexp = /^<div banno-carousel-slides=""[^>]*>(<div[^>]*>slide \d+<\/div>)+<\/div>$/;

		beforeEach(function() {
			el = createCarousel(count, scope);
		});

		it('should contain the slides', function() {
			expect(el[0].innerHTML).toMatch(slidesRegexp);
		});

		it('should start with a slide index of 0', function() {
			expect(el.scope().currentSlide).toBe(0);
		});

		it('should start with the slides', function() {
			expect(el.scope().numSlides).toBe(count);
			expect(el.scope().slides[0]).toEqual(jasmine.any(Object));
			expect(el.scope().slides[1]).toEqual(jasmine.any(Object));
		});

	});

	describe('slides nested inside other elements', function() {

		var count = 2;
		var slidesRegexp = /^<div[^>]*><div banno-carousel-slides=""[^>]*>(<div[^>]*>slide \d+<\/div>)+<\/div><\/div>$/;

		beforeEach(function() {
			el = createCarousel(count, scope, true);
		});

		it('should contain the slides', function() {
			expect(el[0].innerHTML).toMatch(slidesRegexp);
		});

		it('should start with a slide index of 0', function() {
			expect(el.scope().currentSlide).toBe(0);
		});

		it('should start with the slides', function() {
			expect(el.scope().numSlides).toBe(count);
			expect(el.scope().slides[0]).toEqual(jasmine.any(Object));
			expect(el.scope().slides[1]).toEqual(jasmine.any(Object));
		});

	});

	describe('showSlide()', function() {

		var count = 3;
		var index = 1;

		var shouldHideSlide = function(slideIndex) {
			return function() {
				var thisSlide = el.scope().slides[slideIndex];
				expect(angular.element(thisSlide).css('display')).toBe('none');
			};
		};

		beforeEach(function() {
			el = createCarousel(count, scope);
			el.scope().showSlide(index);
		});

		it('should set the currentSlide property to the new index', function() {
			expect(el.scope().currentSlide).toBe(index);
		});

		it('should show the slide with the given index', function() {
			var currentSlide = el.scope().slides[index];
			expect(angular.element(currentSlide).css('display')).toBe('block');
		});

		for (var i = 0; i < count; i++) {
			if (i === index) { continue; }
			it('should hide the slide with index ' + i, shouldHideSlide(i));
		}

	});

	describe('prevSlide()', function() {

		var count = 3;

		beforeEach(function() {
			el = createCarousel(count, scope);
		});

		it('should rewind to the previous slide', function() {
			el.scope().showSlide(2);
			el.scope().prevSlide();
			expect(el.scope().currentSlide).toBe(1);
		});

		it('should not rewind past the previous slide', function() {
			el.scope().prevSlide();
			expect(el.scope().currentSlide).toBe(0);
		});

	});

	describe('nextSlide()', function() {

		var count = 2;

		beforeEach(function() {
			el = createCarousel(count, scope);
		});

		it('should advance to the next slide', function() {
			el.scope().nextSlide();
			expect(el.scope().currentSlide).toBe(1);
		});

		it('should not advance past the last slide', function() {
			el.scope().nextSlide();
			el.scope().nextSlide();
			expect(el.scope().currentSlide).toBe(1);
		});

	});

	describe('isFirst()', function() {

		var count = 2;

		beforeEach(function() {
			el = createCarousel(count, scope);
		});

		it('should return true when the slide is the first', function() {
			expect(el.scope().isFirst()).toBe(true);
		});

		it('should return false when the current slide is NOT the first', function() {
			el.scope().showSlide(count - 1);
			expect(el.scope().isFirst()).toBe(false);
		});

	});

	describe('isLast()', function() {

		var count = 2;

		beforeEach(function() {
			el = createCarousel(count, scope);
		});

		it('should return true when the slide is the last', function() {
			el.scope().showSlide(count - 1);
			expect(el.scope().isLast()).toBe(true);
		});

		it('should return false when the current slide is NOT the last', function() {
			expect(el.scope().isLast()).toBe(false);
		});

	});

	describe('isSlide()', function() {

		var count = 2;

		beforeEach(function() {
			el = createCarousel(count, scope);
		});

		it('should return true when the slide matches the passed index', function() {
			expect(el.scope().isSlide(0)).toBe(true);
		});

		it('should return false when the slide does not match the passed index', function() {
			expect(el.scope().isSlide(1)).toBe(false);
		});

	});

});
