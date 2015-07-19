define(['testModule'], function(data) {
	'use strict';

	var el, scope;
	var compiler;

	var createCarousel = function(contents, scope) {
		var el = angular.element(
			'<section banno-carousel>' + contents + '</section banno-carousel>'
		);
		compiler(el)(scope);
		scope.$apply();
		return el;
	};

	var stripAngularAdditions = function(htmlStr) {
		return htmlStr.replace(/\s*class="ng-scope"/g, '');
	};

	beforeEach(module('banno.carousel'));

	beforeEach(inject(function(_$compile_) {
		compiler = _$compile_;
	}));

	describe('construction', function() {

		var contents = '<p>test</p>';

		beforeEach(inject(function($rootScope) {
			scope = $rootScope.$new();
			el = createCarousel(contents, scope);
		}));

		it('should be replaced with a div', function() {
			expect(el[0].tagName).toBe('DIV');
		});

		it('should contain the given contents', function() {
			expect(stripAngularAdditions(el[0].innerHTML)).toBe(contents);
		});

		it('should start with a slide index of 0', function() {
			expect(el.scope().currentSlide).toBe(0);
		});

		it('should start with an empty slide collection', function() {
			expect(el.scope().numSlides).toBe(0);
			expect(el.scope().slides).toEqual(jasmine.any(Object));
		});

	});

});
